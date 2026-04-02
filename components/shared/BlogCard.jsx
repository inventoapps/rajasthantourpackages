import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export default function BlogCard({ blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <Card className="overflow-hidden card-hover group cursor-pointer h-full border-0 shadow-md">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={blog.image_url}
            alt={blog.image_alt || blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <Badge className="absolute top-3 left-3 bg-white/90 text-stone-700 border-0 capitalize">
            {blog.category?.replace('-', ' ')}
          </Badge>
        </div>
        <CardContent className="p-5">
          <p className="text-xs text-stone-400 mb-2">
            {new Date(blog.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            {blog.author ? ` · ${blog.author}` : ''}
          </p>
          <h3 className="font-bold text-stone-900 group-hover:text-amber-700 transition-colors mb-2 line-clamp-2">{blog.title}</h3>
          <p className="text-sm text-stone-500 line-clamp-3 mb-3">{blog.excerpt}</p>
          <span className="text-amber-600 text-sm font-medium flex items-center gap-1">
            Read More <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
