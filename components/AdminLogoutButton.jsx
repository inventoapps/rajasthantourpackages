'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function AdminLogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <Button variant="outline" size="sm" onClick={onLogout} className="w-full">
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
}
