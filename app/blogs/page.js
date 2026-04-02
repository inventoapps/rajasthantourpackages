import BlogsPageClient from '@/components/pages/BlogsPageClient';
import { getBlogs } from '@/lib/public-content';
import { toAbsoluteUrl } from '@/lib/site-url';
import PublicHeader from '@/components/shared/PublicHeader';
import { buildMetadata, buildBreadcrumbSchema, buildItemListSchema } from '@/lib/seo-governance';

export const revalidate = 300;

export const metadata = buildMetadata({
  title: 'Rajasthan Travel Blog',
  description:
    'Read Rajasthan travel guides, itinerary tips, destination ideas, and local insights from our experts.',
  canonical: '/blogs',
});

export default async function BlogsPage() {
  const blogs = await getBlogs({ published: true, limit: 20 });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: toAbsoluteUrl('/') },
    { name: 'Blog', url: toAbsoluteUrl('/blogs') },
  ]);

  const itemListSchema = buildItemListSchema(
    'Rajasthan Travel Blog',
    blogs.map((blog) => ({ name: blog.title, url: toAbsoluteUrl(`/blogs/${blog.slug}`) }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <PublicHeader />
      <BlogsPageClient blogs={blogs} />
    </>
  );
}
