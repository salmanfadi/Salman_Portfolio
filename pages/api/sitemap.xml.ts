import { NextApiRequest, NextApiResponse } from "next";
import { getAllPosts } from "utils/api";
import slugify from "utils/slugify";

export const config = {
  runtime: 'nodejs',
};

function generateSiteMap(data: { slugs: string[]; tags: string[]; categories: string[] }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${process.env.NEXT_PUBLIC_URL}/</loc>
    </url>
    <url>
      <loc>${process.env.NEXT_PUBLIC_URL}/blog</loc>
    </url>
    <url>
      <loc>${process.env.NEXT_PUBLIC_URL}/blog/categories</loc>
    </url>
    <url>
      <loc>${process.env.NEXT_PUBLIC_URL}/blog/tags</loc>
    </url>
    ${data.categories
      .map((category) => {
        return `
    <url>
      <loc>${process.env.NEXT_PUBLIC_URL}/blog/categories/${category}</loc>
    </url>
    `;
      })
      .join("")}
    ${data.tags
      .map((tag) => {
        return `
    <url>
      <loc>${process.env.NEXT_PUBLIC_URL}/blog/tags/${tag}</loc>
    </url>
    `;
      })
      .join("")}
    ${data.slugs
      .map((slug) => {
        return `
    <url>
      <loc>${process.env.NEXT_PUBLIC_URL}/blog/posts/${slug}</loc>
    </url>
    `;
      })
      .join("")}
  </urlset>`;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllPosts(["slug", "tags", "category"]);

  // Generate unique categories and store it in array
  const categories = posts
    .map((post) => slugify(post.category as string))
    .filter((x, i, a) => a.indexOf(x) == i);

  // Generate unique tags and store it in array
  let tags: string[] = [];
  for (let post of posts) {
    if (post.tags) tags.push(...(post.tags as string[]));
  }
  tags = tags.filter((x, i, a) => a.indexOf(x) == i);

  // Generate encoded slugs and store it in array
  const slugs = posts.map((post) =>
    encodeURIComponent((post.slug as string).trim())
  );

  const data = { slugs, tags, categories };

  // Generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
} 