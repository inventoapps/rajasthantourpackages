'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Save, RefreshCw, AlertCircle, Upload, ImageIcon, Trash2, Globe,
  CheckCircle, Eye, ExternalLink, Phone, Mail, MapPin, Clock
} from 'lucide-react';

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState({
    site_name: 'Rajasthan Tours',
    logo_url: '',
    logo_alt: 'Rajasthan Tours Logo',
    logo_width: 160,
    logo_height: 50,
    favicon_url: '',
    favicon_alt: 'Rajasthan Tours Favicon',
    og_default_image_url: '',
    og_default_image_alt: 'Rajasthan Tour Packages',
    business_phone: '+91 98765 43210',
    business_email: 'info@rajasthantours.com',
    business_address: '123 MI Road, Jaipur, Rajasthan 302001, India',
    business_hours: 'Mon-Sat: 9AM - 7PM',
    google_maps_embed_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);

  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);
  const ogInputRef = useRef(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/site-settings');
      if (res.ok) {
        const data = await res.json();
        if (!data.error) setSettings(data);
      }
    } catch (e) {
      console.error('Error loading settings:', e);
    }
    setLoading(false);
  };

  const saveSettings = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && !data.error) {
        setSuccess('Site settings saved successfully! Changes will reflect across the website.');
        setSettings(data);
      } else {
        setError(data.error || 'Failed to save settings');
      }
    } catch (e) {
      setError('Error saving settings: ' + e.message);
    }
    setSaving(false);
  };

  const uploadImage = async (file, folder, setUploading, urlField, seoName) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      if (seoName) formData.append('seoName', seoName);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success && data.url) {
        setSettings(prev => ({ ...prev, [urlField]: data.url }));
        setSuccess(`Image uploaded successfully!`);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (e) {
      setError('Upload error: ' + e.message);
    }
    setUploading(false);
  };

  const clearImage = (urlField) => {
    setSettings(prev => ({ ...prev, [urlField]: '' }));
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Website Settings</h1>
          <p className="text-muted-foreground">Manage your site logo, favicon, and default branding</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchSettings} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={saveSettings} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
          <p className="text-green-800 text-sm">{success}</p>
        </div>
      )}

      {/* Site Name */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" />General</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="site_name">Site Name</Label>
            <Input
              id="site_name"
              value={settings.site_name}
              onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
              placeholder="Rajasthan Tours"
            />
            <p className="text-xs text-muted-foreground mt-1">Used in browser tabs, search results, and the navbar</p>
          </div>
        </CardContent>
      </Card>

      {/* Business Contact Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Phone className="w-5 h-5" />Business Contact Details</CardTitle>
          <p className="text-sm text-muted-foreground">These details appear across the website — footer, contact page, package pages, blog sidebar, and structured data.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business_phone" className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />Phone Number</Label>
              <Input
                id="business_phone"
                value={settings.business_phone}
                onChange={(e) => setSettings({ ...settings, business_phone: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <Label htmlFor="business_email" className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />Email Address</Label>
              <Input
                id="business_email"
                type="email"
                value={settings.business_email}
                onChange={(e) => setSettings({ ...settings, business_email: e.target.value })}
                placeholder="info@rajasthantours.com"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="business_address" className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />Office Address</Label>
            <Input
              id="business_address"
              value={settings.business_address}
              onChange={(e) => setSettings({ ...settings, business_address: e.target.value })}
              placeholder="123 MI Road, Jaipur, Rajasthan 302001, India"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business_hours" className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />Business Hours</Label>
              <Input
                id="business_hours"
                value={settings.business_hours}
                onChange={(e) => setSettings({ ...settings, business_hours: e.target.value })}
                placeholder="Mon-Sat: 9AM - 7PM"
              />
            </div>
            <div>
              <Label htmlFor="google_maps_embed_url" className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />Google Maps Embed URL</Label>
              <Input
                id="google_maps_embed_url"
                value={settings.google_maps_embed_url}
                onChange={(e) => setSettings({ ...settings, google_maps_embed_url: e.target.value })}
                placeholder="https://www.google.com/maps/embed?pb=..."
              />
              <p className="text-xs text-muted-foreground mt-1">Paste the embed URL from Google Maps (used on the Contact page)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ImageIcon className="w-5 h-5" />Site Logo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-amber-300 transition-colors">
            {settings.logo_url ? (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center bg-gray-50 rounded-lg p-4">
                  <Image
                    src={settings.logo_url}
                    alt={settings.logo_alt || 'Logo preview'}
                    width={settings.logo_width || 160}
                    height={settings.logo_height || 50}
                    className="max-h-16 w-auto object-contain"
                    unoptimized
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logoInputRef.current?.click()}
                    disabled={uploadingLogo}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    {uploadingLogo ? 'Uploading...' : 'Replace'}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => clearImage('logo_url')}>
                    <Trash2 className="w-4 h-4 mr-1" />Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="cursor-pointer py-4"
                onClick={() => logoInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">
                  {uploadingLogo ? 'Uploading...' : 'Click to upload logo'}
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, SVG, or WebP recommended • Max 2MB</p>
              </div>
            )}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file, 'branding', setUploadingLogo, 'logo_url', (settings.site_name || 'site') + '-logo');
                e.target.value = '';
              }}
            />
          </div>

          {/* Logo fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Label htmlFor="logo_alt">Logo Alt Text</Label>
              <Input
                id="logo_alt"
                value={settings.logo_alt}
                onChange={(e) => setSettings({ ...settings, logo_alt: e.target.value })}
                placeholder="Rajasthan Tours Logo"
              />
              <p className="text-xs text-muted-foreground mt-1">For SEO & accessibility</p>
            </div>
            <div>
              <Label htmlFor="logo_width">Width (px)</Label>
              <Input
                id="logo_width"
                type="number"
                value={settings.logo_width}
                onChange={(e) => setSettings({ ...settings, logo_width: parseInt(e.target.value) || 160 })}
                placeholder="160"
              />
            </div>
            <div>
              <Label htmlFor="logo_height">Height (px)</Label>
              <Input
                id="logo_height"
                type="number"
                value={settings.logo_height}
                onChange={(e) => setSettings({ ...settings, logo_height: parseInt(e.target.value) || 50 })}
                placeholder="50"
              />
            </div>
          </div>

          {/* URL fallback */}
          <div>
            <Label htmlFor="logo_url">Or enter Logo URL directly</Label>
            <Input
              id="logo_url"
              value={settings.logo_url}
              onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
              placeholder="https://example.com/logo.png"
            />
          </div>
        </CardContent>
      </Card>

      {/* Favicon Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>
            Favicon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-amber-300 transition-colors">
            {settings.favicon_url ? (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center bg-gray-50 rounded-lg p-4">
                  <Image
                    src={settings.favicon_url}
                    alt={settings.favicon_alt || 'Favicon preview'}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-xs text-muted-foreground">This icon appears in browser tabs, bookmarks, and mobile home screens</p>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => faviconInputRef.current?.click()}
                    disabled={uploadingFavicon}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    {uploadingFavicon ? 'Uploading...' : 'Replace'}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => clearImage('favicon_url')}>
                    <Trash2 className="w-4 h-4 mr-1" />Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="cursor-pointer py-4"
                onClick={() => faviconInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">
                  {uploadingFavicon ? 'Uploading...' : 'Click to upload favicon'}
                </p>
                <p className="text-xs text-gray-400 mt-1">ICO, PNG, or SVG • 32×32 or 180×180 recommended</p>
              </div>
            )}
            <input
              ref={faviconInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file, 'branding', setUploadingFavicon, 'favicon_url', (settings.site_name || 'site') + '-favicon');
                e.target.value = '';
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="favicon_alt">Favicon Alt Text</Label>
              <Input
                id="favicon_alt"
                value={settings.favicon_alt}
                onChange={(e) => setSettings({ ...settings, favicon_alt: e.target.value })}
                placeholder="Rajasthan Tours"
              />
            </div>
            <div>
              <Label htmlFor="favicon_url">Or enter Favicon URL directly</Label>
              <Input
                id="favicon_url"
                value={settings.favicon_url}
                onChange={(e) => setSettings({ ...settings, favicon_url: e.target.value })}
                placeholder="https://example.com/favicon.ico"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Default OG Image */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ExternalLink className="w-5 h-5" />Default Social Share Image (OG Image)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This image is used when your pages are shared on Facebook, Twitter, WhatsApp, etc.
            Recommended size: <strong>1200 × 630 px</strong>.
          </p>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-amber-300 transition-colors">
            {settings.og_default_image_url ? (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center bg-gray-50 rounded-lg p-2">
                  <Image
                    src={settings.og_default_image_url}
                    alt={settings.og_default_image_alt || 'OG image preview'}
                    width={400}
                    height={210}
                    className="rounded-lg object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => ogInputRef.current?.click()}
                    disabled={uploadingOg}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    {uploadingOg ? 'Uploading...' : 'Replace'}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => clearImage('og_default_image_url')}>
                    <Trash2 className="w-4 h-4 mr-1" />Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="cursor-pointer py-4"
                onClick={() => ogInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">
                  {uploadingOg ? 'Uploading...' : 'Click to upload OG image'}
                </p>
                <p className="text-xs text-gray-400 mt-1">1200×630px recommended • PNG or JPG</p>
              </div>
            )}
            <input
              ref={ogInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadImage(file, 'branding', setUploadingOg, 'og_default_image_url', (settings.site_name || 'site') + '-og-image');
                e.target.value = '';
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="og_default_image_alt">OG Image Alt Text</Label>
              <Input
                id="og_default_image_alt"
                value={settings.og_default_image_alt}
                onChange={(e) => setSettings({ ...settings, og_default_image_alt: e.target.value })}
                placeholder="Rajasthan Tour Packages"
              />
            </div>
            <div>
              <Label htmlFor="og_default_image_url">Or enter OG Image URL directly</Label>
              <Input
                id="og_default_image_url"
                value={settings.og_default_image_url}
                onChange={(e) => setSettings({ ...settings, og_default_image_url: e.target.value })}
                placeholder="https://example.com/og-image.jpg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Eye className="w-5 h-5" />Live Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Browser Tab Preview */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-500">Browser Tab</p>
            <div className="bg-gray-100 rounded-t-xl p-2 inline-flex items-center gap-2 max-w-sm">
              <div className="flex gap-1.5 ml-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="bg-white rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm min-w-[200px]">
                {settings.favicon_url ? (
                  <Image src={settings.favicon_url} alt="" width={16} height={16} className="w-4 h-4" unoptimized />
                ) : (
                  <span className="text-xs">🏰</span>
                )}
                <span className="truncate text-gray-700">{settings.site_name || 'Rajasthan Tours'}</span>
              </div>
            </div>
          </div>

          {/* Navbar Preview */}
          <div>
            <p className="text-sm font-medium mb-2 text-gray-500">Navbar</p>
            <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
              {settings.logo_url ? (
                <Image
                  src={settings.logo_url}
                  alt={settings.logo_alt || 'Logo'}
                  width={settings.logo_width || 160}
                  height={settings.logo_height || 50}
                  className="max-h-10 w-auto object-contain"
                  unoptimized
                />
              ) : (
                <span className="text-xl font-bold text-amber-700">
                  <span className="text-amber-500">Rajasthan</span> Tours
                </span>
              )}
              <div className="flex gap-4 text-sm text-gray-500 ml-auto">
                <span>Home</span>
                <span>Tour Packages</span>
                <span>Blogs</span>
                <span>Contact</span>
              </div>
            </div>
          </div>

          {/* Social Share Preview */}
          {settings.og_default_image_url && (
            <div>
              <p className="text-sm font-medium mb-2 text-gray-500">Social Share Preview</p>
              <div className="bg-white border rounded-xl overflow-hidden max-w-md">
                <Image
                  src={settings.og_default_image_url}
                  alt={settings.og_default_image_alt}
                  width={400}
                  height={210}
                  className="w-full h-48 object-cover"
                  unoptimized
                />
                <div className="p-3">
                  <p className="text-xs text-gray-400 uppercase">{typeof window !== 'undefined' ? window.location.hostname : 'yourdomain.com'}</p>
                  <p className="font-bold text-sm text-gray-800">{settings.site_name || 'Rajasthan Tours'}</p>
                  <p className="text-xs text-gray-500">Best Rajasthan tour packages with heritage tours, desert safaris, and more.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SQL Help */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">First-time Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            If saving fails, run this SQL in your Supabase SQL Editor or the Setup page:
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
{`CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'site',
  site_name TEXT DEFAULT 'Rajasthan Tours',
  logo_url TEXT DEFAULT '',
  logo_alt TEXT DEFAULT 'Rajasthan Tours Logo',
  logo_width INTEGER DEFAULT 160,
  logo_height INTEGER DEFAULT 50,
  favicon_url TEXT DEFAULT '',
  favicon_alt TEXT DEFAULT 'Rajasthan Tours Favicon',
  og_default_image_url TEXT DEFAULT '',
  og_default_image_alt TEXT DEFAULT 'Rajasthan Tour Packages',
  business_phone TEXT DEFAULT '+91 98765 43210',
  business_email TEXT DEFAULT 'info@rajasthantours.com',
  business_address TEXT DEFAULT '123 MI Road, Jaipur, Rajasthan 302001, India',
  business_hours TEXT DEFAULT 'Mon-Sat: 9AM - 7PM',
  google_maps_embed_url TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- If the table already exists, add the new columns:
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS business_phone TEXT DEFAULT '+91 98765 43210';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS business_email TEXT DEFAULT 'info@rajasthantours.com';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS business_address TEXT DEFAULT '123 MI Road, Jaipur, Rajasthan 302001, India';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS business_hours TEXT DEFAULT 'Mon-Sat: 9AM - 7PM';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS google_maps_embed_url TEXT DEFAULT '';

-- Disable RLS so admin can read/write
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Allow all write" ON site_settings FOR ALL USING (true);`}
          </pre>
        </CardContent>
      </Card>

      {/* Bottom save bar */}
      <div className="sticky bottom-4 flex justify-end">
        <Button onClick={saveSettings} disabled={saving} size="lg" className="shadow-lg">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>
    </div>
  );
}
