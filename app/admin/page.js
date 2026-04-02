'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, FileText, MessageSquare, Star, Eye, MapPin, CheckCircle, AlertCircle, Database, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ packages: 0, blogs: 0, enquiries: 0, reviews: 0 });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [topPackages, setTopPackages] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);
  const [extendedFields, setExtendedFields] = useState({ tour: false, blog: false });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [health, setupCheck, pkgs, blogs, enqs, revs, dests] = await Promise.all([
        fetch('/api/health').then(r => r.json()),
        fetch('/api/setup-check').then(r => r.json()),
        fetch('/api/packages').then(r => r.json()).catch(() => []),
        fetch('/api/blogs?published=false').then(r => r.json()).catch(() => []),
        fetch('/api/enquiries').then(r => r.json()).catch(() => []),
        fetch('/api/reviews').then(r => r.json()).catch(() => []),
        fetch('/api/destinations?active=false').then(r => r.json()).catch(() => []),
      ]);
      setDbStatus(health.database);
      setExtendedFields({ tour: setupCheck.hasExtendedFields, blog: setupCheck.hasBlogExtendedFields });
      setStats({ 
        packages: pkgs.length || 0, 
        blogs: blogs.length || 0, 
        enquiries: enqs.length || 0, 
        reviews: revs.length || 0,
        destinations: dests.length || 0,
        activeDestinations: (Array.isArray(dests) ? dests.filter(d => d.is_active) : []).length || 0,
        pendingEnquiries: enqs.filter(e => e.status === 'pending').length || 0,
        publishedBlogs: blogs.filter(b => b.is_published).length || 0,
        featuredPackages: pkgs.filter(p => p.is_featured).length || 0
      });
      setRecentEnquiries(enqs.slice(0, 5));
      setTopPackages(pkgs.filter(p => p.is_featured).slice(0, 3));
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const statCards = [
    { title: 'Tour Packages', value: stats.packages, sub: `${stats.featuredPackages || 0} featured`, icon: Package, color: 'bg-blue-500', href: '/admin/packages' },
    { title: 'Destinations', value: stats.destinations, sub: `${stats.activeDestinations || 0} active`, icon: MapPin, color: 'bg-teal-500', href: '/admin/destinations' },
    { title: 'Blog Posts', value: stats.blogs, sub: `${stats.publishedBlogs || 0} published`, icon: FileText, color: 'bg-green-500', href: '/admin/blogs' },
    { title: 'Enquiries', value: stats.enquiries, sub: `${stats.pendingEnquiries || 0} pending`, icon: MessageSquare, color: 'bg-amber-500', href: '/admin/enquiries' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Rajasthan Tours Admin Panel</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />Refresh
          </Button>
          <Badge className={dbStatus === 'connected' ? 'bg-green-100 text-green-700' : dbStatus === 'tables_missing' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}>
            <Database className="w-3 h-3 mr-1" />{dbStatus || 'checking...'}
          </Badge>
        </div>
      </div>

      {/* Alerts */}
      {dbStatus === 'tables_missing' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-800">Database tables not found!</p>
            <p className="text-sm text-yellow-700 mt-1">Go to <Link href="/admin/setup" className="underline font-medium">Setup</Link> to create tables and seed data.</p>
          </div>
        </div>
      )}

      {dbStatus === 'connected' && (!extendedFields.tour || !extendedFields.blog) && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-800">Extended columns missing</p>
            <p className="text-sm text-blue-700 mt-1">
              {!extendedFields.tour && 'Tour packages missing: price_table, hotels, faqs. '}
              {!extendedFields.blog && 'Blogs missing: image_alt, title_alt, faqs. '}
              <Link href="/admin/setup" className="underline font-medium">Run ALTER SQL in Setup</Link>
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link key={i} href={c.href}>
              <Card className="hover:shadow-lg transition-all cursor-pointer border-l-4" style={{ borderLeftColor: c.color.replace('bg-', '') }}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{c.title}</p>
                      <p className="text-3xl font-bold mt-1">{loading ? '-' : c.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
                    </div>
                    <div className={`${c.color} p-3 rounded-xl text-white`}><Icon className="w-6 h-6" /></div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Enquiries */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Enquiries</CardTitle>
            <Link href="/admin/enquiries"><Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </CardHeader>
          <CardContent>
            {recentEnquiries.length === 0 ? (
              <p className="text-muted-foreground text-sm py-4 text-center">No enquiries yet</p>
            ) : (
              <div className="space-y-3">
                {recentEnquiries.map(enq => (
                  <div key={enq.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                        {enq.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{enq.name}</p>
                        <p className="text-xs text-muted-foreground">{enq.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={enq.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}>
                        {enq.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions & Featured Packages */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/packages" className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2"><Package className="w-4 h-4 text-blue-600" /><span className="font-medium text-blue-700 text-sm">Add Tour Package</span></div>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </Link>
              <Link href="/admin/destinations" className="flex items-center justify-between p-3 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-teal-600" /><span className="font-medium text-teal-700 text-sm">Manage Destinations</span></div>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </Link>
              <Link href="/admin/blogs" className="flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-green-600" /><span className="font-medium text-green-700 text-sm">Write Blog Post</span></div>
                <ArrowRight className="w-4 h-4 text-green-400" />
              </Link>
              <Link href="/admin/homepage" className="flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-purple-600" /><span className="font-medium text-purple-700 text-sm">Homepage Settings</span></div>
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </Link>
              <Link href="/admin/site-settings" className="flex items-center justify-between p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-orange-600" /><span className="font-medium text-orange-700 text-sm">Site Settings (Logo & Favicon)</span></div>
                <ArrowRight className="w-4 h-4 text-orange-400" />
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-lg">Featured Packages</CardTitle></CardHeader>
            <CardContent>
              {topPackages.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">No featured packages</p>
              ) : (
                <div className="space-y-3">
                  {topPackages.map(pkg => (
                    <div key={pkg.id} className="flex items-center gap-3">
                      <Image src={pkg.image_url} alt={pkg.title} width={48} height={48} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{pkg.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{pkg.location}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-amber-600">₹{(pkg.discounted_price || pkg.price)?.toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-lg">View Live Site</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <a href="/" target="_blank" className="flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                <span className="font-medium text-amber-700 text-sm">Homepage</span>
                <Eye className="w-4 h-4 text-amber-500" />
              </a>
              <a href="/tour-packages" target="_blank" className="flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                <span className="font-medium text-amber-700 text-sm">Tour Packages</span>
                <Eye className="w-4 h-4 text-amber-500" />
              </a>
              <a href="/destinations" target="_blank" className="flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                <span className="font-medium text-amber-700 text-sm">Destinations</span>
                <Eye className="w-4 h-4 text-amber-500" />
              </a>
              <a href="/blogs" target="_blank" className="flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                <span className="font-medium text-amber-700 text-sm">Blog</span>
                <Eye className="w-4 h-4 text-amber-500" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
