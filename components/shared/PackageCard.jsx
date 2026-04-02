'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, ArrowRight } from 'lucide-react';

export default function PackageCard({ pkg, onEnquire }) {
  return (
    <Card className="overflow-hidden card-hover group cursor-pointer h-full border-0 shadow-md">
      <Link href={`/tour-packages/${pkg.slug}`} data-testid={`package-card-${pkg.slug}`}>
        <div className="relative h-52 overflow-hidden">
          <Image src={pkg.image_url} alt={pkg.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {pkg.is_featured && <Badge className="absolute top-3 left-3 bg-amber-500 text-white border-0 shadow">Featured</Badge>}
          <Badge className="absolute top-3 right-3 max-w-[70%] truncate bg-white/90 text-stone-800 border-0 shadow">{pkg.duration}</Badge>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="text-sm font-semibold text-white">{pkg.rating}</span>
            <span className="text-xs text-white/70">({pkg.reviews_count})</span>
          </div>
        </div>
        <CardContent className="p-4 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1 min-w-0"><MapPin className="w-3 h-3 shrink-0" /><span className="truncate">{pkg.location}</span></div>
          <h3 className="font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors line-clamp-1">{pkg.title}</h3>
          <p className="text-sm text-stone-500 line-clamp-2 mb-3">{pkg.short_description}</p>
          <div className="flex items-center justify-between">
            <div>
              {pkg.discounted_price && <span className="text-xs text-stone-400 line-through mr-1.5">Rs {pkg.price?.toLocaleString('en-IN')}</span>}
              <span className="text-lg font-bold text-amber-700">Rs {(pkg.discounted_price || pkg.price)?.toLocaleString('en-IN')}</span>
              <span className="text-xs text-stone-400"> /person</span>
            </div>
            <span className="text-amber-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">View <ArrowRight className="w-3.5 h-3.5" /></span>
          </div>
        </CardContent>
      </Link>
      {onEnquire && (
        <div className="p-4 pt-0">
          <Button
            onClick={() => onEnquire(pkg)}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-full"
          >
            Enquire Now
          </Button>
        </div>
      )}
    </Card>
  );
}
