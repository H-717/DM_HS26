import { content } from '../content';

// Language-flavored `class TeachingAssistant { ... }` card for about-me.
export function buildSnippet(): string {
  const { name, course, email, session } = content;
  const officeHours = `${session.day} ${session.time} @ ${session.room}`;
  const lang = course.language.toLowerCase();

  switch (lang) {
    case 'python':
      return [
        'class TeachingAssistant:',
        '    def __init__(self):',
        `        self.name = "${name}"`,
        `        self.course = "${course.name}"`,
        `        self.semester = "${course.semester}"`,
        `        self.email = "${email}"`,
        '',
        '    def office_hours(self):',
        `        return "${officeHours}"`,
      ].join('\n');
    case 'java':
      return [
        'public class TeachingAssistant {',
        `    String name = "${name}";`,
        `    String course = "${course.name}";`,
        `    String semester = "${course.semester}";`,
        `    String email = "${email}";`,
        '',
        '    String officeHours() {',
        `        return "${officeHours}";`,
        '    }',
        '}',
      ].join('\n');
    case 'cpp':
    case 'c++':
      return [
        'class TeachingAssistant {',
        'public:',
        `    std::string name = "${name}";`,
        `    std::string course = "${course.name}";`,
        `    std::string semester = "${course.semester}";`,
        `    std::string email = "${email}";`,
        '',
        '    std::string officeHours() {',
        `        return "${officeHours}";`,
        '    }',
        '};',
      ].join('\n');
    case 'javascript':
    case 'typescript':
      return [
        'class TeachingAssistant {',
        `  name = "${name}";`,
        `  course = "${course.name}";`,
        `  semester = "${course.semester}";`,
        `  email = "${email}";`,
        '',
        '  officeHours() {',
        `    return "${officeHours}";`,
        '  }',
        '}',
      ].join('\n');
    default:
      return [
        'TeachingAssistant {',
        `  name: "${name}"`,
        `  course: "${course.name}"`,
        `  semester: "${course.semester}"`,
        `  email: "${email}"`,
        `  officeHours: "${officeHours}"`,
        '}',
      ].join('\n');
  }
}
