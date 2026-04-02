'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Save, Eye, RefreshCw, AlertCircle, Upload, ImageIcon, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then((m) => m.CKEditor),
  { ssr: false }
);

const editorConfig = {
  toolbar: {
    items: [
      'heading', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'link', 'bulletedList', 'numberedList', '|',
      'outdent', 'indent', '|',
      'insertTable', '|',
      'alignment', 'undo', 'redo'
    ],
    shouldNotGroupWhenFull: true,
  },
  link: {
    defaultProtocol: 'https://',
    addTargetToExternalLinks: true,
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
  },
};

function SeoEditor({ value, onChange, placeholder, minHeight = '360px' }) {
  const [EditorClass, setEditorClass] = useState(null);

  useEffect(() => {
    let mounted = true;
    import('@ckeditor/ckeditor5-build-classic').then((m) => {
      if (mounted) setEditorClass(() => m.default);
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (!EditorClass) {
    return <div className="border rounded-md p-3 text-sm text-muted-foreground">Loading editor...</div>;
  }

  return (
    <div className="seo-editor" style={{ '--seo-editor-min-h': minHeight }}>
      <CKEditor
        editor={EditorClass}
        data={value || ''}
        config={{ ...editorConfig, placeholder }}
        onChange={(_event, editor) => onChange(editor.getData())}
      />
    </div>
  );
}

export default function HomepageAdmin() {
  const [settings, setSettings] = useState({
    hero_image_url: '',
    hero_image_alt: '',
    hero_title: '',
    hero_subtitle: '',
    hero_button_text: '',
    hero_secondary_button_text: '',
    seo_content: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingHero, setUploadingHero] = useState(false);
  const heroInputRef = useRef(null);

  const uploadImage = async (file, seoName) => {
    if (!file) return;
    setUploadingHero(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'homepage');
      fd.append('seoName', seoName || 'rajasthan-hero');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setSettings(prev => ({ ...prev, hero_image_url: data.url }));
        setSuccess('Hero image uploaded successfully!');
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (e) {
      setError('Upload error: ' + e.message);
    }
    setUploadingHero(false);
  };

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/homepage-settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      } else {
        setError('Failed to load homepage settings');
      }
    } catch (e) {
      setError('Error loading settings: ' + e.message);
    }
    setLoading(false);
  };

  const saveSettings = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/homepage-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setSuccess('Homepage settings saved successfully!');
        // Refresh to show updated data
        fetchSettings();
      } else {
        const error = await res.json();
        setError(error.message || 'Failed to save settings');
      }
    } catch (e) {
      setError('Error saving settings: ' + e.message);
    }
    setSaving(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Homepage Settings</h1>
          <p className="text-muted-foreground">Manage homepage hero section, SEO content, and metadata</p>
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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
          <div className="w-5 h-5 text-green-600 mt-0.5">✓</div>
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Hero Section Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Hero Image Upload */}
          <div>
            <Label>Hero Image</Label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-4">
              {settings.hero_image_url ? (
                <div className="space-y-3">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={settings.hero_image_url}
                      alt={settings.hero_image_alt || 'Hero image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground truncate flex-1">{settings.hero_image_url}</p>
                    <Button variant="outline" size="sm" onClick={() => heroInputRef.current?.click()} disabled={uploadingHero}>
                      <Upload className="w-4 h-4 mr-1" />{uploadingHero ? 'Uploading...' : 'Change'}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setSettings(prev => ({ ...prev, hero_image_url: '' }))}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center py-8 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => heroInputRef.current?.click()}
                >
                  <ImageIcon className="w-10 h-10 text-muted-foreground mb-2" />
                  <p className="font-medium text-sm">Click to upload hero image</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP — recommended 1600×900 or larger</p>
                  {uploadingHero && <p className="text-xs text-amber-600 mt-2">Uploading...</p>}
                </div>
              )}
              <input
                ref={heroInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadImage(file, settings.hero_image_alt || 'rajasthan-hero-image');
                  e.target.value = '';
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hero_image_alt">Hero Image Alt Text (also used for SEO filename)</Label>
              <Input
                id="hero_image_alt"
                value={settings.hero_image_alt}
                onChange={(e) => setSettings({...settings, hero_image_alt: e.target.value})}
                placeholder="Rajasthan landscape with forts and palaces"
              />
              <p className="text-xs text-muted-foreground mt-1">Set this before uploading — it becomes the SEO-friendly image filename.</p>
            </div>
            <div>
              <Label htmlFor="hero_image_url">Or enter Image URL directly</Label>
              <Input
                id="hero_image_url"
                value={settings.hero_image_url}
                onChange={(e) => setSettings({...settings, hero_image_url: e.target.value})}
                placeholder="https://example.com/hero-image.jpg"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="hero_title">Hero Title</Label>
            <Textarea
              id="hero_title"
              value={settings.hero_title}
              onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
              placeholder="Discover the Royal Rajasthan"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
            <Textarea
              id="hero_subtitle"
              value={settings.hero_subtitle}
              onChange={(e) => setSettings({...settings, hero_subtitle: e.target.value})}
              placeholder="Explore magnificent forts, shimmering lakes..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hero_button_text">Primary Button Text</Label>
              <Input
                id="hero_button_text"
                value={settings.hero_button_text}
                onChange={(e) => setSettings({...settings, hero_button_text: e.target.value})}
                placeholder="Explore Packages"
              />
            </div>
            <div>
              <Label htmlFor="hero_secondary_button_text">Secondary Button Text</Label>
              <Input
                id="hero_secondary_button_text"
                value={settings.hero_secondary_button_text}
                onChange={(e) => setSettings({...settings, hero_secondary_button_text: e.target.value})}
                placeholder="Free Consultation"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label>SEO Content (Rich Text)</Label>
            <div className="mt-2">
              <SeoEditor
                value={settings.seo_content}
                onChange={(value) => setSettings({ ...settings, seo_content: value })}
                placeholder="Enter SEO content for the homepage..."
                minHeight="360px"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This content will be displayed in the homepage SEO section. Use formatting to make it visually appealing.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Meta Data */}
      <Card>
        <CardHeader>
          <CardTitle>Meta Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input
              id="meta_title"
              value={settings.meta_title}
              onChange={(e) => setSettings({...settings, meta_title: e.target.value})}
              placeholder="Rajasthan Tours - Authentic Travel Experiences"
            />
          </div>

          <div>
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea
              id="meta_description"
              value={settings.meta_description}
              onChange={(e) => setSettings({...settings, meta_description: e.target.value})}
              placeholder="Discover the royal heritage of Rajasthan with our expertly crafted tour packages..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="meta_keywords">Meta Keywords</Label>
            <Input
              id="meta_keywords"
              value={settings.meta_keywords}
              onChange={(e) => setSettings({...settings, meta_keywords: e.target.value})}
              placeholder="Rajasthan tours, Jaipur, Udaipur, Jaisalmer, desert safari"
            />
            <p className="text-sm text-muted-foreground mt-1">Comma-separated keywords</p>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">{settings.hero_title || 'Hero Title'}</h3>
            <p className="text-gray-600 mb-4">{settings.hero_subtitle || 'Hero subtitle...'}</p>
            <div className="flex gap-3">
              <Badge variant="secondary">{settings.hero_button_text || 'Primary Button'}</Badge>
              <Badge variant="outline">{settings.hero_secondary_button_text || 'Secondary Button'}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}