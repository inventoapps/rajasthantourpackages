'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, Eye, Loader2, Calendar, X } from 'lucide-react';
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
    <div className="relative">
      <div className="seo-editor px-4" style={{ '--seo-editor-min-h': minHeight }}>
        <style>{`
          .seo-editor .ck-content ul,
          .seo-editor .ck-content ol {
            padding-left: 2em !important;
          }
          .seo-editor .ck-content a.ck-link,
          .seo-editor .ck-content a {
            color: #d97706 !important;
            background: none !important;
            font-weight: 600;
            text-decoration: underline !important;
          }
          /* Sticky toolbar: offset from top so it doesn't hide tabs */
          .seo-editor .ck.ck-editor__top .ck-sticky-panel,
          .seo-editor .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content,
          .seo-editor .ck.ck-editor__top .ck-toolbar {
            position: fixed !important;
            top: 140px !important;
            left: 0 !important;
            right: 0 !important;
            z-index: 2000 !important;
            background: #fff !important;
            opacity: 1 !important;
            transition: none !important;
            box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
            width: 100vw !important;
            margin: 0 auto !important;
          }
          .seo-editor .ck.ck-editor__top {
            background: #fff !important;
            opacity: 1 !important;
            transition: none !important;
          }
          .seo-editor .ck.ck-editor__main > .ck-editor__editable {
            padding-top: 56px !important;
          }
        `}</style>
        <CKEditor
          editor={EditorClass}
          data={value || ''}
          config={{ ...editorConfig, placeholder }}
          onChange={(_event, editor) => onChange(editor.getData())}
        />
      </div>
    </div>
  );
}

const BLOG_CATS = ['travel-guide', 'travel-tips', 'food', 'adventure', 'luxury', 'culture'];

const emptyBlog = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image_url: '',
  image_alt: '',
  title_alt: '',
  author: 'Rajasthan Tours',
  category: 'travel-guide',
  tags: '',
  faqs: [],
  is_published: false,
  meta_title: '',
  meta_description: '',
  seo_content: ''
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs?published=false');
      setBlogs(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const openNew = () => {
    setForm(emptyBlog);
    setEditId(null);
    setShowForm(true);
  };
  
  const openEdit = (blog) => {
    setForm({
      ...blog,
      tags: (blog.tags || []).join(', '),
      image_alt: blog.image_alt || '',
      title_alt: blog.title_alt || '',
      faqs: blog.faqs || []
    });
    setEditId(blog.id);
    setShowForm(true);
  };

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSave = async () => {
    setSaving(true);
    const body = {
      ...form,
      // Keep DB content column in sync since SEO content is now the single editor source.
      content: form.seo_content || '',
      slug: form.slug || generateSlug(form.title),
      tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
      faqs: form.faqs
    };
    delete body.id;
    delete body.created_at;
    try {
      const url = editId ? `/api/blogs/${editId}` : '/api/blogs';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) {
        setShowForm(false);
        fetchBlogs();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to save');
      }
    } catch (e) { alert(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } catch (e) { alert(e.message); }
  };

  // FAQs helpers
  const addFaq = () => {
    setForm(f => ({ ...f, faqs: [...f.faqs, { question: '', answer: '' }] }));
  };
  const updateFaq = (idx, field, value) => {
    setForm(f => ({ ...f, faqs: f.faqs.map((faq, i) => i === idx ? { ...faq, [field]: value } : faq) }));
  };
  const removeFaq = (idx) => {
    setForm(f => ({ ...f, faqs: f.faqs.filter((_, i) => i !== idx) }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'blogs');
      fd.append('seoName', form.title || form.image_alt || 'blog-image');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setForm(f => ({ ...f, image_url: data.url }));
    } catch (e) {
      alert(e.message);
    }
    setUploadingImage(false);
  };



  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your travel blog</p>
        </div>
        <Button onClick={openNew} className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
          <Plus className="w-4 h-4" />New Post
        </Button>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="space-y-4">
          {blogs.map(blog => (
            <Card key={blog.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Image src={blog.image_url || 'https://via.placeholder.com/80'} alt={blog.image_alt || blog.title} width={80} height={80} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold truncate">{blog.title}</h3>
                      <Badge className={blog.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                        {blog.is_published ? 'Published' : 'Draft'}
                      </Badge>
                      <Badge variant="outline" className="capitalize">{blog.category?.replace('-', ' ')}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">{blog.excerpt}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />{new Date(blog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a href={`/blogs/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button>
                    </a>
                    <Button variant="outline" size="sm" onClick={() => openEdit(blog)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(blog.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {blogs.length === 0 && <p className="text-center text-muted-foreground py-8">No blog posts found. Create one or seed the database from Setup.</p>}
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm} modal={false}>
        <DialogContent
          className="max-w-6xl w-full max-h-[90vh] overflow-visible"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Post' : 'New Blog Post'}</DialogTitle>
          </DialogHeader>

          <div className="max-h-[68vh] overflow-y-auto pr-2">
          <Tabs defaultValue="content" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="media">Media & SEO</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Content Tab */}
            <TabsContent value="content" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title *</Label>
                  <Input 
                    value={form.title} 
                    onChange={e => setForm(f => ({...f, title: e.target.value, slug: generateSlug(e.target.value)}))} 
                    className="mt-1" 
                    placeholder="Your Blog Post Title"
                  />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input 
                    value={form.slug} 
                    onChange={e => setForm(f => ({...f, slug: e.target.value}))} 
                    className="mt-1" 
                    placeholder="your-blog-post-title"
                  />
                </div>
              </div>
              <div>
                <Label>Excerpt (Short Summary)</Label>
                <Textarea 
                  value={form.excerpt} 
                  onChange={e => setForm(f => ({...f, excerpt: e.target.value}))} 
                  className="mt-1" 
                  placeholder="A brief summary of your blog post that appears in listings..."
                  rows={2}
                />
              </div>
            </TabsContent>
            
            {/* Media & SEO Tab */}
            <TabsContent value="media" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Featured Image Upload</Label>
                  <Input 
                    type="file"
                    accept="image/*"
                    onChange={e => handleImageUpload(e.target.files?.[0])}
                    className="mt-1" 
                  />
                  {uploadingImage && <p className="text-xs text-muted-foreground mt-2">Uploading image...</p>}
                  {form.image_url && (
                    <div className="mt-2">
                      <Image src={form.image_url} alt="Preview" width={640} height={128} className="h-32 rounded-lg object-cover w-full" />
                      <p className="text-xs text-muted-foreground mt-1 break-all">{form.image_url}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Image Alt Text (SEO)</Label>
                    <Input 
                      value={form.image_alt} 
                      onChange={e => setForm(f => ({...f, image_alt: e.target.value}))} 
                      className="mt-1" 
                      placeholder="Descriptive text for the image"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Describe the image for screen readers and SEO</p>
                  </div>
                  <div>
                    <Label>Title Alt Text (SEO)</Label>
                    <Input 
                      value={form.title_alt} 
                      onChange={e => setForm(f => ({...f, title_alt: e.target.value}))} 
                      className="mt-1" 
                      placeholder="Alternative title for SEO"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Alternative title used in structured data</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">SEO Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Meta Title</Label>
                    <Input 
                      value={form.meta_title} 
                      onChange={e => setForm(f => ({...f, meta_title: e.target.value}))} 
                      className="mt-1" 
                      placeholder="Page title for search engines"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{form.meta_title?.length || 0}/60 characters</p>
                  </div>
                  <div>
                    <Label>Meta Description</Label>
                    <Textarea 
                      value={form.meta_description} 
                      onChange={e => setForm(f => ({...f, meta_description: e.target.value}))} 
                      className="mt-1" 
                      placeholder="Description for search results"
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground mt-1">{form.meta_description?.length || 0}/160 characters</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Label>SEO Content (Rich Text)</Label>
                  <div className="mt-2 text-base">
                    <SeoEditor
                      value={form.seo_content}
                      onChange={(value) => setForm(f => ({ ...f, seo_content: value }))}
                      placeholder="Write detailed SEO content here with rich formatting..."
                      minHeight="360px"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Use the toolbar to format text, add links, and create engaging content that will appear on the blog page.</p>
                </div>
              </div>
            </TabsContent>
            
            {/* FAQs Tab */}
            <TabsContent value="faqs" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-lg font-semibold">Blog FAQs</Label>
                  <p className="text-sm text-muted-foreground">Add frequently asked questions related to this blog post</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addFaq}>
                  <Plus className="w-4 h-4 mr-1" />Add FAQ
                </Button>
              </div>
              {form.faqs.map((faq, idx) => (
                <Card key={idx} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded text-sm">Q{idx + 1}</span>
                      <Input 
                        placeholder="Question" 
                        value={faq.question} 
                        onChange={e => updateFaq(idx, 'question', e.target.value)} 
                        className="flex-1" 
                      />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFaq(idx)} className="text-red-500 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea 
                      placeholder="Answer..." 
                      value={faq.answer} 
                      onChange={e => updateFaq(idx, 'answer', e.target.value)} 
                      className="min-h-[60px]" 
                    />
                  </div>
                </Card>
              ))}
              {form.faqs.length === 0 && (
                <p className="text-center text-muted-foreground py-8 border rounded-lg">
                  No FAQs added. Click "Add FAQ" to add questions and answers related to this blog post.
                </p>
              )}
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Author</Label>
                  <Input 
                    value={form.author} 
                    onChange={e => setForm(f => ({...f, author: e.target.value}))} 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={v => setForm(f => ({...f, category: v}))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {BLOG_CATS.map(c => <SelectItem key={c} value={c} className="capitalize">{c.replace('-',' ')}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input 
                  value={form.tags} 
                  onChange={e => setForm(f => ({...f, tags: e.target.value}))} 
                  placeholder="Rajasthan, Travel, Tourism" 
                  className="mt-1" 
                />
                <p className="text-xs text-muted-foreground mt-1">Tags help users find related content</p>
              </div>
              <div className="border-t pt-4">
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={form.is_published} 
                    onChange={e => setForm(f => ({...f, is_published: e.target.checked}))} 
                    className="rounded w-5 h-5"
                  />
                  <div>
                    <span className="font-medium">Published</span>
                    <p className="text-sm text-muted-foreground">When checked, this post will be visible on the website</p>
                  </div>
                </label>
              </div>
            </TabsContent>
          </Tabs>
          </div>
          
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700 text-white">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {editId ? 'Update' : 'Create'} Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
