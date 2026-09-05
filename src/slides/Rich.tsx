import { Fragment, useMemo } from 'react';
import katex from 'katex';

// Splits a string into plain text, $math$, **bold** and `code` runs. Kept
// deliberately small: these four are all the weekly content files need.
const TOKEN = /(\$[^$]+\$|\*\*[^*]+\*\*|`[^`]+`)/g;

export function Rich({ text }: { text: string }) {
  const parts = useMemo(() => text.split(TOKEN).filter(Boolean), [text]);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const tex = part.slice(1, -1);
          let html: string;
          try {
            html = katex.renderToString(tex, { throwOnError: false, output: 'html' });
          } catch {
            // Bad LaTeX shouldn't blank out a slide mid-session.
            return <code key={i}>{tex}</code>;
          }
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return <code key={i}>{part.slice(1, -1)}</code>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
