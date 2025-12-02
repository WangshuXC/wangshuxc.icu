import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { friendLinkConfig } from "@/config/friendLink.config";
import { ExternalLinkIcon, GlobeIcon, HeartIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LinkPreview } from "@/components/ui/link-preview";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("friendLink");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function FriendLinkPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("friendLink");

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mx-auto max-w-6xl'>
        {/* 页面头部 */}
        <div className='mb-16 text-center'>
          <div className='mb-4 flex items-center justify-center gap-2'>
            <h1 className='font-bold text-4xl md:text-5xl'>{t("title")}</h1>
          </div>
          <p className='mx-auto max-w-2xl text-muted-foreground text-xl leading-relaxed'>
            {t("description")}
          </p>
        </div>

        {/* 友链网格 */}
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {friendLinkConfig.items.map((friendLink, index) => (
            <LinkPreview key={friendLink.url + index} url={friendLink.url}>
              <Card
                key={friendLink.url}
                className='group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1'
              >
                <CardHeader className='relative pb-2'>
                  <CardTitle className='flex items-start justify-between gap-2'>
                    <span className='font-semibold text-lg leading-tight group-hover:text-primary transition-colors'>
                      {friendLink.name}
                    </span>
                    <ExternalLinkIcon className='mt-1 h-4 w-4 text-muted-foreground/60 transition-colors group-hover:text-primary shrink-0' />
                  </CardTitle>
                  <CardDescription className='text-sm leading-relaxed line-clamp-3'>
                    {friendLink.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className='relative pt-0'>
                  <div className='mt-3 overflow-hidden'>
                    <p className='truncate text-muted-foreground text-xs font-mono'>
                      {friendLink.url.replace(/^https?:\/\//, "")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </LinkPreview>
          ))}
        </div>

        {/* 空状态 */}
        {friendLinkConfig.items.length === 0 && (
          <div className='py-20 text-center'>
            <GlobeIcon className='mx-auto mb-4 h-16 w-16 text-muted-foreground/50' />
            <h3 className='mb-2 font-semibold text-lg'>暂无友链</h3>
            <p className='text-muted-foreground'>
              还没有添加任何友链，敬请期待！
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
