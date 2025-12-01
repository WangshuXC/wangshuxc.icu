'use client';

interface Skill {
  name: string;
  color: string;
  logo: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      title: '⌨️ Programming',
      icon: '💻',
      skills: [
        { name: 'C++', color: 'blueviolet', logo: 'cplusplus' },
        { name: 'Python', color: 'blue', logo: 'python' },
        { name: 'JavaScript', color: 'green', logo: 'javascript' },
        { name: 'TypeScript', color: '007ACC', logo: 'typescript' },
        { name: 'Node.js', color: '6DA55F', logo: 'node.js' },
      ],
    },
    {
      title: '📋 Markup',
      icon: '📝',
      skills: [
        { name: 'LaTeX', color: '008080', logo: 'latex' },
        { name: 'Markdown', color: '000000', logo: 'markdown' },
      ],
    },
    {
      title: '🔬 Editors',
      icon: '⚡',
      skills: [
        { name: 'Visual Studio Code', color: '0078d7', logo: 'visual-studio-code' },
        { name: 'Cursor', color: '000000', logo: 'cursor' },
        { name: 'CodeBuddy', color: '6C4DFF', logo: 'codebuddy' },
      ],
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
              >
                <h3 className="mb-6 font-bold text-2xl text-foreground">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <a
                      key={skill.name}
                      href={`https://img.shields.io/badge/${skill.name.replace(
                        /\s+/g,
                        '%20'
                      )}-${skill.color}?style=for-the-badge&logo=${skill.logo}&logoColor=white`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block transition-transform hover:scale-105"
                    >
                      <img
                        src={`https://img.shields.io/badge/${encodeURIComponent(
                          skill.name
                        ).replace(/%20/g, '%20')}-${skill.color}?style=for-the-badge&logo=${skill.logo}&logoColor=white`}
                        alt={skill.name}
                        className="h-7"
                      />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
