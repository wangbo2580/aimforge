import type { MetadataRoute } from 'next';
import { getAllPlayerSlugs } from '@/data/pro-players';
import { getAllGuideSlugs } from '@/data/guides';

const BASE_URL = 'https://www.cs2practice.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // 静态路由
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/play`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/play/gridshot`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/play/tracking`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/play/flicking`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/pro`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/crosshairs`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/tools`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/sensitivity-converter`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/guides`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Pro Player 动态路由
  const proPlayerRoutes: MetadataRoute.Sitemap = getAllPlayerSlugs().map(slug => ({
    url: `${BASE_URL}/pro/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Guides 动态路由
  const guideRoutes: MetadataRoute.Sitemap = getAllGuideSlugs().map(slug => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...proPlayerRoutes, ...guideRoutes];
}
