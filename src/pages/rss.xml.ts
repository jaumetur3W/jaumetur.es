import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('blog', ({ data }) => !data.draft && data.lang === 'es');
  posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return rss({
    title: 'Jaume Tur — Blog Técnico de Desarrollo Web y Frontend',
    description: 'Artículos, guías y análisis práctico sobre Angular, TypeScript, CI/CD, alto rendimiento 60 FPS y accesibilidad web por Jaume Tur en Valencia.',
    site: context.site ? context.site.toString() : 'https://jaumetur.es',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.snippet,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author || 'Jaume Tur',
    })),
    customData: `<language>es</language><atom:link href="https://jaumetur.es/rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />`,
  });
}
