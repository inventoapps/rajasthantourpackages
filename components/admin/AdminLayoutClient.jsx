'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, FileText, MessageSquare, Globe, MapPin, Home, Database, ArrowLeft } from 'lucide-react';
import AdminLogoutButton from '@/components/AdminLogoutButton';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPin },
  { href: '/admin/blogs', label: 'Blogs', icon: FileText },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },
  { href: '/admin/homepage', label: 'Homepage', icon: Home },
  { href: '/admin/site-settings', label: 'Site Settings', icon: Globe },
  { href: '/admin/setup', label: 'Setup', icon: Database },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white p-4 flex flex-col z-50">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
              <ArrowLeft className="w-4 h-4" /><span className="text-sm">Back to Site</span>
            </Link>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-2xl">🏰</span>
              <div><h1 className="text-lg font-bold text-white">Admin Panel</h1><p className="text-xs text-gray-400">Rajasthan Tours</p></div>
            </div>
          </div>
          <nav className="space-y-1 flex-1">
            {NAV.map(n => {
              const Icon = n.icon;
              const active = pathname === n.href;
              return (
                <Link key={n.href} href={n.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'bg-amber-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}>
                  <Icon className="w-5 h-5" />{n.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 space-y-3">
            <AdminLogoutButton />
            <div className="text-xs text-gray-500">Rajasthan Tours Admin v1.0</div>
          </div>
        </aside>
        {/* Content */}
        <main className="ml-64 flex-1 p-6 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
