import BlogCard from '@/components/shared/BlogCard';
import PageHeader from '@/components/shared/PageHeader';

export default function BlogsPage({ blogs = [] }) {
  return (
    <div className="min-h-screen bg-stone-50" data-testid="blogs-page">
      <PageHeader
        title="Travel Blog"
        subtitle="Tips, guides, and stories from the Land of Kings"
        breadcrumbs={[{ label: 'Blog' }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(b => (
            <BlogCard key={b.id} blog={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
