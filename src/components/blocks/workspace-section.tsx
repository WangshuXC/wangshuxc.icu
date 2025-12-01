'use client';

import { useTranslations } from 'next-intl';

interface WorkspaceSpec {
  name: string;
  color: string;
  logo: string;
  descriptionKey: string;
}

interface WorkspaceSectionProps {
  heading?: string;
  description?: string;
}

export function WorkspaceSection({ heading, description }: WorkspaceSectionProps) {
  const t = useTranslations('workspace');

  const workspaceSpecs: WorkspaceSpec[] = [
    {
      name: 'AMD 9800X3D',
      color: 'ED1C24',
      logo: 'amd',
      descriptionKey: 'amd9800x3d',
    },
    {
      name: 'AMD 7900XTX',
      color: 'ED1C24',
      logo: 'amd',
      descriptionKey: 'amd7900xtx',
    },
    {
      name: 'MacMini M4',
      color: '000000',
      logo: 'apple',
      descriptionKey: 'macminiM4',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">
              {heading || t('heading')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {description || t('description')}
            </p>
          </div>

          {/* Workspace Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {workspaceSpecs.map((spec) => (
              <div
                key={spec.name}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
              >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Content */}
                <div className="relative">
                  {/* Badge */}
                  <div className="mb-4 inline-block">
                    <img
                      src={`https://img.shields.io/badge/${encodeURIComponent(
                        spec.name
                      ).replace(/%20/g, '_')}-${spec.color}?style=for-the-badge&logo=${spec.logo}&logoColor=white`}
                      alt={spec.name}
                      className="h-8 transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm transition-colors group-hover:text-foreground">
                    {t(spec.descriptionKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
