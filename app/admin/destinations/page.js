'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, Eye, Loader2, X, MapPin, GripVertical } from 'lucide-react';
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

function SeoEditor({ value, onChange, placeholder, minHeight = '320px' }) {
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

const emptyDest = {
  name: '', slug: '', tagline: '', description: '', image_url: '',
  gallery: [],
  best_time_to_visit: '', best_time_details: '',
  how_to_reach: { air: '', rail: '', road: '' },
  key_attractions: [],
  travel_tips: [],
  faqs: [],
  meta_title: '', meta_description: '',
  display_order: 0, is_active: true,
};

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyDest);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  // helper for travel_tips as text
  const [tipsText, setTipsText] = useState('');

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/destinations?active=false');
      setDestinations(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchDestinations(); }, []);

  const generateSlug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const openNew = () => {
    setForm(emptyDest);
    setTipsText('');
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (dest) => {
    setForm({
      ...dest,
      gallery: dest.gallery || [],
      how_to_reach: dest.how_to_reach || { air: '', rail: '', road: '' },
      key_attractions: dest.key_attractions || [],
      travel_tips: dest.travel_tips || [],
      faqs: dest.faqs || [],
      display_order: dest.display_order ?? 0,
    });
    setTipsText((dest.travel_tips || []).join('\n'));
    setEditId(dest.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const body = {
      ...form,
      slug: form.slug || generateSlug(form.name),
      display_order: parseInt(form.display_order) || 0,
      travel_tips: tipsText.split('\n').map(s => s.trim()).filter(Boolean),
    };
    delete body.id;
    delete body.created_at;
    delete body.updated_at;
    try {
      const url = editId ? `/api/destinations/${editId}` : '/api/destinations';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { setShowForm(false); fetchDestinations(); }
      else { const d = await res.json(); alert(d.error || 'Failed to save'); }
    } catch (e) { alert(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    try {
      await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      fetchDestinations();
    } catch (e) { alert(e.message); }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'destinations');
      fd.append('seoName', form.name || 'destination');
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setForm(f => ({ ...f, image_url: data.url }));
    } catch (e) { alert(e.message); }
    setUploadingImage(false);
  };



  // Key Attractions helpers
  const addAttraction = () => {
    setForm(f => ({ ...f, key_attractions: [...f.key_attractions, { name: '', description: '' }] }));
  };
  const updateAttraction = (idx, field, value) => {
    setForm(f => ({ ...f, key_attractions: f.key_attractions.map((a, i) => i === idx ? { ...a, [field]: value } : a) }));
  };
  const removeAttraction = (idx) => {
    setForm(f => ({ ...f, key_attractions: f.key_attractions.filter((_, i) => i !== idx) }));
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

  const [seeding, setSeeding] = useState(false);

  const seedDestinations = async () => {
    if (!confirm('This will insert all 6 static destinations into the database (skipping any that already exist). Continue?')) return;
    setSeeding(true);
    try {
      const res = await fetch('/api/seed-destinations', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = await res.json();
      if (res.ok) {
        alert(`Seeded ${data.inserted || 0} destinations into the database!`);
        fetchDestinations();
      } else {
        alert(data.error || 'Seed failed');
      }
    } catch (e) { alert(e.message); }
    setSeeding(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Destinations</h1>
          <p className="text-muted-foreground">Manage Rajasthan destination pages</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={seedDestinations} variant="outline" disabled={seeding} className="gap-2">
            {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Seed to DB
          </Button>
          <Button onClick={openNew} className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
            <Plus className="w-4 h-4" />Add Destination
          </Button>
        </div>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="space-y-4">
          {destinations.map(dest => (
            <Card key={dest.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Image src={dest.image_url || 'https://via.placeholder.com/80'} alt={dest.name} width={80} height={80} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold truncate">{dest.name}</h3>
                      <Badge variant="outline" className="text-xs">{dest.tagline}</Badge>
                      {!dest.is_active && <Badge variant="destructive" className="text-xs">Inactive</Badge>}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 flex-wrap">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />/{dest.slug}</span>
                      <span>Order: {dest.display_order}</span>
                      <span>{(dest.key_attractions || []).length} attractions</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`/destinations/${dest.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button>
                    </a>
                    <Button variant="outline" size="sm" onClick={() => openEdit(dest)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(dest.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {destinations.length === 0 && <p className="text-center text-muted-foreground py-8">No destinations found. Add one to get started.</p>}
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm} modal={false}>
        <DialogContent
          className="max-w-4xl max-h-[90vh] overflow-visible"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Destination' : 'Add New Destination'}</DialogTitle>
          </DialogHeader>

          <div className="max-h-[68vh] overflow-y-auto pr-2">
          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="attractions">Attractions</TabsTrigger>
              <TabsTrigger value="travel">Travel Info</TabsTrigger>
              <TabsTrigger value="seo">SEO & FAQs</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name *</Label>
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: generateSlug(e.target.value) }))} className="mt-1" placeholder="e.g. Jaipur" />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Tagline</Label>
                  <Input value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} className="mt-1" placeholder="e.g. The Pink City" />
                </div>
                <div>
                  <Label>Display Order</Label>
                  <Input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: e.target.value }))} className="mt-1" />
                </div>
              </div>
              <div>
                <Label>Description * (Rich Text)</Label>
                <div className="mt-1 bg-white rounded-md border">
                  <SeoEditor
                    value={form.description}
                    onChange={(value) => setForm(f => ({ ...f, description: value }))}
                    placeholder="Detailed description of the destination..."
                    minHeight="320px"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Use headings (H2, H3), bold, lists etc. for better SEO and readability.</p>
              </div>
              <div>
                <Label>Featured Image Upload</Label>
                <Input type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files?.[0])} className="mt-1" />
                {uploadingImage && <p className="text-xs text-muted-foreground mt-2">Uploading image...</p>}
                {form.image_url && (
                  <div className="mt-2">
                    <Image src={form.image_url} alt="Preview" width={512} height={128} className="h-32 rounded-lg object-cover w-full" />
                    <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} className="mt-1 text-xs" placeholder="Or paste image URL" />
                  </div>
                )}
                {!form.image_url && (
                  <Input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} className="mt-2" placeholder="Or paste image URL" />
                )}
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))} className="rounded" />
                  Active (visible on site)
                </label>
              </div>
            </TabsContent>

            {/* Attractions Tab */}
            <TabsContent value="attractions" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Key Attractions</Label>
                <Button type="button" variant="outline" size="sm" onClick={addAttraction}>
                  <Plus className="w-4 h-4 mr-1" />Add Attraction
                </Button>
              </div>
              {form.key_attractions.map((attr, idx) => (
                <Card key={idx} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded text-sm">{idx + 1}</span>
                      <Input placeholder="Attraction Name" value={attr.name} onChange={e => updateAttraction(idx, 'name', e.target.value)} className="flex-1" />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeAttraction(idx)} className="text-red-500 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea placeholder="Description of the attraction..." value={attr.description} onChange={e => updateAttraction(idx, 'description', e.target.value)} className="min-h-[60px]" />
                  </div>
                </Card>
              ))}
              {form.key_attractions.length === 0 && <p className="text-center text-muted-foreground py-4 border rounded-lg">No attractions added yet.</p>}
            </TabsContent>

            {/* Travel Info Tab */}
            <TabsContent value="travel" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Best Time to Visit</Label>
                  <Input value={form.best_time_to_visit} onChange={e => setForm(f => ({ ...f, best_time_to_visit: e.target.value }))} className="mt-1" placeholder="e.g. October to March" />
                </div>
              </div>
              <div>
                <Label>Best Time Details</Label>
                <Textarea value={form.best_time_details} onChange={e => setForm(f => ({ ...f, best_time_details: e.target.value }))} className="mt-1 min-h-[80px]" placeholder="Detailed weather & festival info..." />
              </div>
              <div className="space-y-3">
                <Label className="text-lg font-semibold">How to Reach</Label>
                <div>
                  <Label className="text-xs text-muted-foreground">By Air</Label>
                  <Textarea value={form.how_to_reach?.air || ''} onChange={e => setForm(f => ({ ...f, how_to_reach: { ...f.how_to_reach, air: e.target.value } }))} className="mt-1" placeholder="Airport details..." />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">By Rail</Label>
                  <Textarea value={form.how_to_reach?.rail || ''} onChange={e => setForm(f => ({ ...f, how_to_reach: { ...f.how_to_reach, rail: e.target.value } }))} className="mt-1" placeholder="Railway station details..." />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">By Road</Label>
                  <Textarea value={form.how_to_reach?.road || ''} onChange={e => setForm(f => ({ ...f, how_to_reach: { ...f.how_to_reach, road: e.target.value } }))} className="mt-1" placeholder="Highway / driving details..." />
                </div>
              </div>
              <div>
                <Label className="text-lg font-semibold">Travel Tips (one per line)</Label>
                <Textarea value={tipsText} onChange={e => setTipsText(e.target.value)} className="mt-1 min-h-[120px]" placeholder="Dress modestly when visiting temples.\nCarry sunscreen.\nBargain at local bazaars." />
              </div>
            </TabsContent>

            {/* SEO & FAQs Tab */}
            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Meta Title (SEO)</Label>
                  <Input value={form.meta_title} onChange={e => setForm(f => ({ ...f, meta_title: e.target.value }))} className="mt-1" placeholder="Page title for search engines" />
                </div>
                <div>
                  <Label>Meta Description (SEO)</Label>
                  <Input value={form.meta_description} onChange={e => setForm(f => ({ ...f, meta_description: e.target.value }))} className="mt-1" placeholder="Description for search engines" />
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Label className="text-lg font-semibold">FAQs</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFaq}>
                  <Plus className="w-4 h-4 mr-1" />Add FAQ
                </Button>
              </div>
              {form.faqs.map((faq, idx) => (
                <Card key={idx} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded text-sm">Q{idx + 1}</span>
                      <Input placeholder="Question" value={faq.question} onChange={e => updateFaq(idx, 'question', e.target.value)} className="flex-1" />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFaq(idx)} className="text-red-500 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea placeholder="Answer..." value={faq.answer} onChange={e => updateFaq(idx, 'answer', e.target.value)} className="min-h-[60px]" />
                  </div>
                </Card>
              ))}
              {form.faqs.length === 0 && <p className="text-center text-muted-foreground py-4 border rounded-lg">No FAQs added yet.</p>}
            </TabsContent>
          </Tabs>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700 text-white">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {editId ? 'Update' : 'Create'} Destination
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
