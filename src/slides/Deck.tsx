import type { CSSProperties, MouseEvent, TouchEvent } from 'react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import 'katex/dist/katex.min.css';
import '../styles/slides.css';
import { content } from '../content';
import { Rich } from './Rich';
import { ADMIN_EVENT, adminKey, isAdmin } from './admin';
import { studentView, unsealDeck } from './seal';
import type { Deck, Slide } from './types';

// How many extra "clicks" a slide needs before moving on — progressive reveal.
function stepsOf(slide: Slide): number {
  if (slide.kind === 'quiz') return 1;
  if (slide.kind === 'points' && slide.reveal) return slide.points.length;
  if (slide.kind === 'solution' && slide.reveal) return slide.steps.length;
  return 0;
}

export function DeckView({ deck: source, onExit }: { deck: Deck; onExit: () => void }) {
  const [i, setI] = useState(0);
  const [step, setStep] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  // Only this device may reveal notes and unreleased solutions — see
  // src/slides/admin.ts and src/slides/seal.ts.
  const [admin, setAdmin] = useState(isAdmin);
  const [printing, setPrinting] = useState(false);

  // What this viewer gets to see. Students start and stay on studentView;
  // an unlocked device swaps in the full deck once it is decrypted.
  const [deck, setDeck] = useState(() =>
    admin && !source.sealed ? source : studentView(source),
  );
  const [unsealed, setUnsealed] = useState(!source.sealed);

  useEffect(() => {
    let live = true;
    if (!admin) {
      setDeck(studentView(source));
      return;
    }
    adminKey()
      .then((key) => (key ? unsealDeck(source, key) : source))
      .catch(() => source)
      .then((d) => {
        if (!live) return;
        setDeck(d);
        setUnsealed(!d.sealed);
      });
    return () => {
      live = false;
    };
  }, [admin, source]);

  // Unlocking or locking mid-deck changes the slide count.
  const last = deck.slides.length - 1;
  useEffect(() => {
    if (i > last) {
      setI(last);
      setStep(0);
    }
  }, [i, last]);

  const slide = deck.slides[Math.min(i, last)];
  const maxStep = stepsOf(slide);

  // Shrink the type scale until the current slide fits the stage. Runs before
  // paint, so you never see the reflow. A revealed bullet can push a slide
  // over the edge, hence the dependency on `step` too.
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const section = stage?.firstElementChild as HTMLElement | undefined;
    if (!root || !stage || !section) return;

    let scale = 1;
    // Two passes: the first estimate is usually right, the second cleans up
    // the rounding introduced by text re-wrapping at the smaller size.
    for (let pass = 0; pass < 2; pass++) {
      root.style.setProperty('--fit', String(scale));
      const box = getComputedStyle(stage);
      const room =
        stage.clientHeight - parseFloat(box.paddingTop) - parseFloat(box.paddingBottom);
      const needed = section.scrollHeight;
      if (needed <= room) break;
      scale = Math.max(0.5, scale * (room / needed) * 0.98);
    }
    setFit(scale);
  }, [i, step, deck]);

  const next = useCallback(() => {
    if (step < maxStep) return setStep((s) => s + 1);
    if (i < deck.slides.length - 1) {
      setI(i + 1);
      setStep(0);
    }
  }, [step, maxStep, i, deck.slides.length]);

  useEffect(() => {
    const sync = () => setAdmin(isAdmin());
    window.addEventListener(ADMIN_EVENT, sync);
    return () => window.removeEventListener(ADMIN_EVENT, sync);
  }, []);

  // Losing admin mid-session must also put the notes away.
  useEffect(() => {
    if (!admin) setShowNotes(false);
  }, [admin]);

  const prev = useCallback(() => {
    if (step > 0) return setStep((s) => s - 1);
    if (i > 0) {
      const p = deck.slides[i - 1];
      setI(i - 1);
      setStep(stepsOf(p));
    }
  }, [step, i, deck.slides]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          setI(0);
          setStep(0);
          break;
        case 'End':
          setI(deck.slides.length - 1);
          setStep(0);
          break;
        case 'n':
          if (admin) setShowNotes((v) => !v);
          break;
        case 'p':
          // Render every slide stacked, then hand it to the browser's
          // print dialog — "Save as PDF" gives you the whole deck.
          setPrinting(true);
          break;
        case 'f':
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen().catch(() => {});
          break;
        case 'Escape':
          if (!document.fullscreenElement) onExit();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, deck.slides.length, onExit, admin]);

  // Phones have no arrow keys: swipe left/right, or tap the left third to go
  // back. Mouse clicks keep the old behaviour (anywhere = next).
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const lastPointer = useRef('mouse');
  const swiped = useRef(false);

  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    swiped.current = false;
  };

  const onTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    swiped.current = true;
    if (dx < 0) next();
    else prev();
  };

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    const width = e.currentTarget.clientWidth;
    if (lastPointer.current === 'touch' && e.clientX < width / 3) prev();
    else next();
  };

  const progress = useMemo(
    () => ((i + 1) / deck.slides.length) * 100,
    [i, deck.slides.length],
  );

  // The stacked layout has to be in the DOM before the (blocking) print
  // dialog opens, so trigger it from an effect rather than the key handler.
  useEffect(() => {
    if (!printing) return;
    const done = () => setPrinting(false);
    window.addEventListener('afterprint', done);
    const t = window.setTimeout(() => window.print(), 60);
    return () => {
      window.removeEventListener('afterprint', done);
      window.clearTimeout(t);
    };
  }, [printing]);

  if (printing) {
    return (
      <div className="deck deck-printing">
        {deck.slides.map((s, k) => (
          <div className="deck-page" key={k}>
            <SlideBody slide={s} step={stepsOf(s)} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="deck"
      onClick={onClick}
      onPointerDown={(e) => (lastPointer.current = e.pointerType)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      ref={rootRef}
      style={{ '--fit': fit } as CSSProperties}
    >
      <div className="deck-progress" style={{ width: progress + '%' }} />

      <div className="deck-stage" ref={stageRef}>
        <SlideBody slide={slide} step={step} locked={admin && !unsealed} />
      </div>

      <footer className="deck-foot">
        <span>
          {content.course.name} · Week {deck.week} — {deck.topic}
        </span>
        <span className="deck-count">
          {i + 1} / {deck.slides.length}
        </span>
      </footer>

      {admin && showNotes && slide.note ? (
        <aside className="deck-notes">
          <Rich text={slide.note} />
        </aside>
      ) : null}

      <button
        className="deck-exit"
        onClick={(e) => {
          e.stopPropagation();
          onExit();
        }}
        title="Back to the site (Esc)"
      >
        ✕
      </button>
    </div>
  );
}

function SlideBody({ slide, step, locked }: { slide: Slide; step: number; locked?: boolean }) {
  switch (slide.kind) {
    case 'title':
      return (
        <section className="s-title">
          <h1>
            <Rich text={slide.title} />
          </h1>
          {slide.subtitle ? (
            <p className="s-sub">
              <Rich text={slide.subtitle} />
            </p>
          ) : null}
          {slide.footnote ? (
            <p className="s-foot">
              <Rich text={slide.footnote} />
            </p>
          ) : null}
        </section>
      );

    case 'agenda':
      return (
        <section>
          <h2>{slide.title ?? 'Plan for today'}</h2>
          <ol className="s-agenda">
            {slide.items.map((it, k) => (
              <li key={k}>
                <Rich text={it} />
              </li>
            ))}
          </ol>
        </section>
      );

    case 'points':
      return (
        <section>
          <h2>
            <Rich text={slide.title} />
          </h2>
          {slide.lead ? (
            <p className="s-lead">
              <Rich text={slide.lead} />
            </p>
          ) : null}
          <ul className="s-points">
            {slide.points.map((p, k) => (
              <li key={k} className={slide.reveal && k > step - 1 ? 'is-hidden' : ''}>
                <Rich text={p} />
              </li>
            ))}
          </ul>
        </section>
      );

    case 'callout':
      return (
        <section>
          <div className={'s-callout tone-' + (slide.tone ?? 'info')}>
            <h3>
              <Rich text={slide.title} />
            </h3>
            {slide.body.map((b, k) => (
              <p key={k}>
                <Rich text={b} />
              </p>
            ))}
          </div>
        </section>
      );

    case 'table':
      return (
        <section>
          <h2>
            <Rich text={slide.title} />
          </h2>
          {slide.lead ? (
            <p className="s-lead">
              <Rich text={slide.lead} />
            </p>
          ) : null}
          <table className="s-table">
            <thead>
              <tr>
                {slide.headers.map((h, k) => (
                  <th key={k}>
                    <Rich text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slide.rows.map((r, k) => (
                <tr key={k} className={slide.markRows?.includes(k) ? 'is-marked' : ''}>
                  {r.map((c, j) => (
                    <td key={j}>
                      <Rich text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );

    case 'grid':
      return (
        <section>
          <h2>
            <Rich text={slide.title} />
          </h2>
          {slide.lead ? (
            <p className="s-lead">
              <Rich text={slide.lead} />
            </p>
          ) : null}
          <div
            className="s-grid"
            style={{ '--cols': slide.cells[0].length } as CSSProperties}
          >
            {slide.cells.flatMap((row, r) =>
              [...row].map((ch, c) => (
                <span
                  key={r + '-' + c}
                  className={
                    's-cell' + (ch === '.' ? ' is-hole' : ch === ' ' ? ' is-empty' : '')
                  }
                  data-piece={ch}
                >
                  {ch === '.' || ch === ' ' ? '' : ch}
                </span>
              )),
            )}
          </div>
          {slide.legend ? (
            <p className="s-legend">
              <Rich text={slide.legend} />
            </p>
          ) : null}
        </section>
      );

    case 'exercise':
      return (
        <section>
          <h2>
            <span className="s-ref">{slide.ref}</span> <Rich text={slide.title} />
          </h2>
          {slide.prompt.map((p, k) => (
            <p key={k} className="s-prompt">
              <Rich text={p} />
            </p>
          ))}
          {slide.parts ? (
            <ol className="s-parts">
              {slide.parts.map((p, k) => (
                <li key={k}>
                  <Rich text={p} />
                </li>
              ))}
            </ol>
          ) : null}
          {slide.hint ? (
            <div className="s-callout tone-info s-hint">
              <h3>Hint</h3>
              {slide.hint.map((h, k) => (
                <p key={k}>
                  <Rich text={h} />
                </p>
              ))}
            </div>
          ) : null}
        </section>
      );

    case 'solution':
      return (
        <section>
          <h2>
            <span className="s-ref">{slide.ref}</span> <Rich text={slide.title} />
          </h2>
          <ol className="s-steps">
            {slide.steps.map((s, k) => (
              <li key={k} className={slide.reveal && k > step - 1 ? 'is-hidden' : ''}>
                <Rich text={s} />
              </li>
            ))}
          </ol>
        </section>
      );

    case 'quiz':
      return (
        <section>
          <h2 className="s-quiz-q">
            <Rich text={slide.question} />
          </h2>
          <ul className="s-quiz">
            {slide.options.map((o, k) => (
              <li
                key={k}
                className={step > 0 ? (k === slide.answer ? 'is-right' : 'is-wrong') : ''}
              >
                <span className="s-quiz-key">{String.fromCharCode(65 + k)}</span>
                <Rich text={o} />
              </li>
            ))}
          </ul>
          {step > 0 && slide.explain ? (
            <p className="s-explain">
              <Rich text={slide.explain} />
            </p>
          ) : null}
        </section>
      );

    case 'sealed':
      return (
        <section className="s-title">
          <h1>{slide.refs.length ? 'Solution — ' + slide.refs.join(', ') : 'Solution'}</h1>
          <p className="s-sub">
            {locked
              ? 'This device has no key for it yet — open the ?admin= link here once more.'
              : 'Shared here after the session. Try it yourself first!'}
          </p>
        </section>
      );

    case 'end':
      return (
        <section className="s-title">
          <h1>
            <Rich text={slide.title} />
          </h1>
          <ul className="s-points s-end">
            {slide.points.map((p, k) => (
              <li key={k}>
                <Rich text={p} />
              </li>
            ))}
          </ul>
        </section>
      );
  }
}
