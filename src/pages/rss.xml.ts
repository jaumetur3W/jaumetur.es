import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

  return rss({
    title: 'Jaume Tur — Blog Tècnic de Desenvolupament Frontend',
    description: 'Articles, guies i anàlisi pràctica sobre Angular, TypeScript, CI/CD, alt rendiment 60 FPS i accessibilitat web per Jaume Tur a València.',
    site: context.site ? context.site.toString() : 'https://jaumetur.es',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.snippet,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
      author: post.data.author || 'Jaume Tur',
    })),
    customData: `<language>ca</language><atom:link href="https://jaumetur.es/rss.xml" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />`,
  });
}

