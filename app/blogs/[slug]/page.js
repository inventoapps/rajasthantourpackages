import { notFound, permanentRedirect } from 'next/navigation';
import BlogDetailPageClient from '@/components/pages/BlogDetailPageClient';
import { getBlogBySlug, getBlogs, getBlogSlugs, getSiteSettings } from '@/lib/public-content';
import { toAbsoluteUrl } from '@/lib/site-url';
import PublicHeader from '@/components/shared/PublicHeader';
import { buildMetadata, resolveSlugGovernance } from '@/lib/seo-governance';
import { IMG_OG_DEFAULT } from '@/lib/image-config';

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    const governance = await resolveSlugGovernance('blog', slug);
    if (governance?.type === 'redirect') {
      return buildMetadata({
        title: 'Blog Redirect',
        description: 'This article has moved to a new URL.',
        canonical: governance.destination,
        noIndex: true,
        type: 'article',
      });
    }
    if (governance?.type === 'gone') {
      return buildMetadata({
        title: 'Blog Removed',
        description: 'This blog article is no longer available.',
        canonical: `/blogs/${slug}`,
        noIndex: true,
        type: 'article',
      });
    }
    return buildMetadata({
      title: 'Blog Not Found',
      description: 'The requested blog article could not be found.',
      canonical: `/blogs/${slug}`,
      noIndex: true,
      type: 'article',
    });
  }

  const title = blog.meta_title || blog.title;
  const description = blog.meta_description || blog.excerpt || 'Rajasthan travel blog article.';
  const image = blog.image_url || IMG_OG_DEFAULT;
  const canonical = `/blogs/${blog.slug}`;

  return buildMetadata({
    title,
    description,
    canonical,
    image,
    type: 'article',
  });
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) {
    const governance = await resolveSlugGovernance('blog', slug);
    if (governance?.type === 'redirect' && governance.destination) {
      permanentRedirect(governance.destination);
    }
    notFound();
  }

  const allBlogs = await getBlogs({ published: true, limit: 50 });
  const [relatedBlogs, siteSettings] = await Promise.all([
    Promise.resolve(allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 4)),
    getSiteSettings(),
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.meta_description || blog.excerpt || '',
    image: blog.image_url || undefined,
    datePublished: blog.created_at || undefined,
    dateModified: blog.updated_at || blog.created_at || undefined,
    author: { '@type': 'Organization', name: blog.author || 'Rajasthan Tours' },
    publisher: {
      '@type': 'Organization',
      name: 'Rajasthan Tours',
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/favicon.ico'),
      },
    },
    mainEntityOfPage: toAbsoluteUrl(`/blogs/${blog.slug}`),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Blogs', item: toAbsoluteUrl('/blogs') },
      { '@type': 'ListItem', position: 3, name: blog.title, item: toAbsoluteUrl(`/blogs/${blog.slug}`) },
    ],
  };

  const validFaqs = Array.isArray(blog.faqs)
    ? blog.faqs.filter((faq) => faq?.question && faq?.answer)
    : [];
  const faqSchema =
    validFaqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: validFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      <PublicHeader />
      <BlogDetailPageClient blog={blog} relatedBlogs={relatedBlogs} allBlogs={allBlogs} siteSettings={siteSettings} />
    </>
  );
}
