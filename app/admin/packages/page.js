'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, Star, MapPin, Eye, Loader2, GripVertical, X } from 'lucide-react';
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

const CATEGORIES = ['heritage', 'adventure', 'luxury', 'wildlife', 'spiritual', 'premium'];

const emptyPkg = {
  title: '', slug: '', short_description: '', description: '', duration: '', price: '', discounted_price: '',
  location: '', image_url: '', category: 'heritage', rating: '4.5', reviews_count: '0', max_group_size: '15',
  is_featured: false, is_active: true, highlights: '', inclusions: '', exclusions: '',
  meta_title: '', meta_description: '',
  itinerary: [],
  price_table: [],
  hotels: [],
  tour_map_url: '',
  seo_content: '',
  faqs: []
};

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyPkg);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/packages');
      setPackages(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchPackages(); }, []);

  const openNew = () => { setForm(emptyPkg); setEditId(null); setShowForm(true); };
  
  const openEdit = (pkg) => {
    setForm({
      ...pkg,
      price: String(pkg.price || ''),
      discounted_price: String(pkg.discounted_price || ''),
      rating: String(pkg.rating || '4.5'),
      reviews_count: String(pkg.reviews_count || '0'),
      max_group_size: String(pkg.max_group_size || '15'),
      highlights: (pkg.highlights || []).join(', '),
      inclusions: (pkg.inclusions || []).join(', '),
      exclusions: (pkg.exclusions || []).join(', '),
      itinerary: pkg.itinerary || [],
      price_table: pkg.price_table || [],
      hotels: pkg.hotels || [],
      tour_map_url: pkg.tour_map_url || '',
      seo_content: pkg.seo_content || '',
      faqs: pkg.faqs || []
    });
    setEditId(pkg.id);
    setShowForm(true);
  };

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSave = async () => {
    setSaving(true);
    const body = {
      ...form,
      slug: form.slug || generateSlug(form.title),
      price: parseInt(form.price) || 0,
      discounted_price: form.discounted_price ? parseInt(form.discounted_price) : null,
      rating: parseFloat(form.rating) || 4.5,
      reviews_count: parseInt(form.reviews_count) || 0,
      max_group_size: parseInt(form.max_group_size) || 15,
      highlights: form.highlights ? form.highlights.split(',').map(s => s.trim()).filter(Boolean) : [],
      inclusions: form.inclusions ? form.inclusions.split(',').map(s => s.trim()).filter(Boolean) : [],
      exclusions: form.exclusions ? form.exclusions.split(',').map(s => s.trim()).filter(Boolean) : [],
      itinerary: form.itinerary,
      price_table: form.price_table,
      hotels: form.hotels,
      tour_map_url: form.tour_map_url,
      seo_content: form.seo_content,
      faqs: form.faqs
    };
    delete body.id;
    delete body.reviews;
    delete body.created_at;
    try {
      const url = editId ? `/api/packages/${editId}` : '/api/packages';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (res.ok) { setShowForm(false); fetchPackages(); }
      else { const d = await res.json(); alert(d.error || 'Failed to save'); }
    } catch (e) { alert(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      fetchPackages();
    } catch (e) { alert(e.message); }
  };

  // Itinerary helpers
  const addItineraryDay = () => {
    setForm(f => ({ ...f, itinerary: [...f.itinerary, { day: f.itinerary.length + 1, title: '', description: '' }] }));
  };
  const updateItinerary = (idx, field, value) => {
    setForm(f => ({ ...f, itinerary: f.itinerary.map((it, i) => i === idx ? { ...it, [field]: value } : it) }));
  };
  const removeItinerary = (idx) => {
    setForm(f => ({ ...f, itinerary: f.itinerary.filter((_, i) => i !== idx).map((it, i) => ({ ...it, day: i + 1 })) }));
  };

  // Price table helpers
  const addPriceRow = () => {
    setForm(f => ({ ...f, price_table: [...f.price_table, { type: '', single: '', double: '', triple: '', child_with_bed: '', child_without_bed: '' }] }));
  };
  const updatePriceRow = (idx, field, value) => {
    setForm(f => ({ ...f, price_table: f.price_table.map((row, i) => i === idx ? { ...row, [field]: field === 'type' ? value : (parseInt(value) || '') } : row) }));
  };
  const removePriceRow = (idx) => {
    setForm(f => ({ ...f, price_table: f.price_table.filter((_, i) => i !== idx) }));
  };

  // Hotels helpers
  const addHotel = () => {
    setForm(f => ({ ...f, hotels: [...f.hotels, { city: '', name: '', category: '', nights: '' }] }));
  };
  const updateHotel = (idx, field, value) => {
    setForm(f => ({ ...f, hotels: f.hotels.map((h, i) => i === idx ? { ...h, [field]: field === 'nights' ? (parseInt(value) || '') : value } : h) }));
  };
  const removeHotel = (idx) => {
    setForm(f => ({ ...f, hotels: f.hotels.filter((_, i) => i !== idx) }));
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
      fd.append('folder', 'packages');
      fd.append('seoName', form.title || 'tour-package');
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
          <h1 className="text-2xl font-bold">Tour Packages</h1>
          <p className="text-muted-foreground">Manage your tour packages</p>
        </div>
        <Button onClick={openNew} className="bg-amber-600 hover:bg-amber-700 text-white gap-2">
          <Plus className="w-4 h-4" />Add Package
        </Button>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="space-y-4">
          {packages.map(pkg => (
            <Card key={pkg.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Image src={pkg.image_url || 'https://via.placeholder.com/80'} alt={pkg.title} width={80} height={80} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold truncate">{pkg.title}</h3>
                      {pkg.is_featured && <Badge className="bg-amber-100 text-amber-700">Featured</Badge>}
                      <Badge variant="outline" className="capitalize">{pkg.category}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 flex-wrap">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{pkg.location}</span>
                      <span>{pkg.duration}</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{pkg.rating}</span>
                      <span className="font-bold text-amber-700">&#8377;{(pkg.discounted_price || pkg.price)?.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`/tour-packages/${pkg.slug}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm"><Eye className="w-4 h-4" /></Button>
                    </a>
                    <Button variant="outline" size="sm" onClick={() => openEdit(pkg)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(pkg.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {packages.length === 0 && <p className="text-center text-muted-foreground py-8">No packages found. Add one or seed the database from Setup.</p>}
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm} modal={false}>
        <DialogContent
          className="max-w-4xl max-h-[90vh] overflow-visible"
          onInteractOutside={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>{editId ? 'Edit Package' : 'Add New Package'}</DialogTitle>
          </DialogHeader>

          <div className="max-h-[68vh] overflow-y-auto pr-2">
          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="pricing">Pricing & Hotels</TabsTrigger>
              <TabsTrigger value="seo">SEO & Map</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>
            
            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title *</Label>
                  <Input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value, slug: generateSlug(e.target.value)}))} className="mt-1" />
                </div>
                <div>
                  <Label>Slug</Label>
                  <Input value={form.slug} onChange={e => setForm(f => ({...f, slug: e.target.value}))} className="mt-1" />
                </div>
              </div>
              <div>
                <Label>Short Description</Label>
                <Textarea value={form.short_description} onChange={e => setForm(f => ({...f, short_description: e.target.value}))} className="mt-1" />
              </div>
              <div>
                <Label>Full Description</Label>
                <Textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className="mt-1 min-h-[100px]" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Duration</Label>
                  <Input value={form.duration} onChange={e => setForm(f => ({...f, duration: e.target.value}))} placeholder="3 Days / 2 Nights" className="mt-1" />
                </div>
                <div>
                  <Label>Price (INR) *</Label>
                  <Input type="number" value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} className="mt-1" />
                </div>
                <div>
                  <Label>Discounted Price</Label>
                  <Input type="number" value={form.discounted_price} onChange={e => setForm(f => ({...f, discounted_price: e.target.value}))} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Location *</Label>
                  <Input value={form.location} onChange={e => setForm(f => ({...f, location: e.target.value}))} className="mt-1" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={v => setForm(f => ({...f, category: v}))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Max Group Size</Label>
                  <Input type="number" value={form.max_group_size} onChange={e => setForm(f => ({...f, max_group_size: e.target.value}))} className="mt-1" />
                </div>
                <div>
                  <Label>Rating (0-5)</Label>
                  <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm(f => ({...f, rating: e.target.value}))} className="mt-1" />
                </div>
                <div>
                  <Label>Reviews Count</Label>
                  <Input type="number" min="0" value={form.reviews_count} onChange={e => setForm(f => ({...f, reviews_count: e.target.value}))} className="mt-1" />
                </div>
              </div>
              <div>
                <Label>Featured Image Upload</Label>
                <Input type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files?.[0])} className="mt-1" />
                {uploadingImage && <p className="text-xs text-muted-foreground mt-2">Uploading image...</p>}
                {form.image_url && (
                  <div className="mt-2">
                    <Image src={form.image_url} alt="Preview" width={512} height={128} className="h-32 rounded-lg object-cover w-full" />
                    <p className="text-xs text-muted-foreground mt-1 break-all">{form.image_url}</p>
                  </div>
                )}
              </div>
              <div>
                <Label>Highlights (comma-separated)</Label>
                <Textarea value={form.highlights} onChange={e => setForm(f => ({...f, highlights: e.target.value}))} placeholder="Fort Tour, Lake Ride, Desert Safari" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Inclusions (comma-separated)</Label>
                  <Textarea value={form.inclusions} onChange={e => setForm(f => ({...f, inclusions: e.target.value}))} className="mt-1" />
                </div>
                <div>
                  <Label>Exclusions (comma-separated)</Label>
                  <Textarea value={form.exclusions} onChange={e => setForm(f => ({...f, exclusions: e.target.value}))} className="mt-1" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({...f, is_featured: e.target.checked}))} className="rounded" />
                  Featured
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm(f => ({...f, is_active: e.target.checked}))} className="rounded" />
                  Active
                </label>
              </div>
            </TabsContent>
            
            {/* Itinerary Tab */}
            <TabsContent value="itinerary" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Day-by-Day Itinerary</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItineraryDay}>
                  <Plus className="w-4 h-4 mr-1" />Add Day
                </Button>
              </div>
              {form.itinerary.map((day, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded">Day {day.day}</div>
                    <div className="flex-1 space-y-2">
                      <Input placeholder="Day Title (e.g., Arrival & City Tour)" value={day.title} onChange={e => updateItinerary(idx, 'title', e.target.value)} />
                      <Textarea placeholder="Day Description..." value={day.description} onChange={e => updateItinerary(idx, 'description', e.target.value)} className="min-h-[80px]" />
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeItinerary(idx)} className="text-red-500 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              {form.itinerary.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No itinerary days added yet. Click "Add Day" to start.</p>
              )}
            </TabsContent>
            
            {/* Pricing & Hotels Tab */}
            <TabsContent value="pricing" className="space-y-6 mt-4">
              {/* Price Table */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-lg font-semibold">Price Table</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addPriceRow}>
                    <Plus className="w-4 h-4 mr-1" />Add Row
                  </Button>
                </div>
                {form.price_table.length > 0 && (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="p-2 text-left">Type</th>
                          <th className="p-2 text-left">Single</th>
                          <th className="p-2 text-left">Double</th>
                          <th className="p-2 text-left">Triple</th>
                          <th className="p-2 text-left">Child w/Bed</th>
                          <th className="p-2 text-left">Child w/o Bed</th>
                          <th className="p-2 w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.price_table.map((row, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="p-2"><Input placeholder="Standard / Deluxe" value={row.type} onChange={e => updatePriceRow(idx, 'type', e.target.value)} className="h-8" /></td>
                            <td className="p-2"><Input type="number" placeholder="0" value={row.single} onChange={e => updatePriceRow(idx, 'single', e.target.value)} className="h-8" /></td>
                            <td className="p-2"><Input type="number" placeholder="0" value={row.double} onChange={e => updatePriceRow(idx, 'double', e.target.value)} className="h-8" /></td>
                            <td className="p-2"><Input type="number" placeholder="0" value={row.triple} onChange={e => updatePriceRow(idx, 'triple', e.target.value)} className="h-8" /></td>
                            <td className="p-2"><Input type="number" placeholder="0" value={row.child_with_bed} onChange={e => updatePriceRow(idx, 'child_with_bed', e.target.value)} className="h-8" /></td>
                            <td className="p-2"><Input type="number" placeholder="0" value={row.child_without_bed} onChange={e => updatePriceRow(idx, 'child_without_bed', e.target.value)} className="h-8" /></td>
                            <td className="p-2">
                              <Button type="button" variant="ghost" size="sm" onClick={() => removePriceRow(idx)} className="text-red-500 hover:text-red-700 h-8 w-8 p-0">
                                <X className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {form.price_table.length === 0 && (
                  <p className="text-center text-muted-foreground py-4 border rounded-lg">No price rows added. Click "Add Row" to add pricing options.</p>
                )}
              </div>
              
              {/* Hotels */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-lg font-semibold">Hotels</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addHotel}>
                    <Plus className="w-4 h-4 mr-1" />Add Hotel
                  </Button>
                </div>
                <div className="space-y-3">
                  {form.hotels.map((hotel, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input placeholder="City" value={hotel.city} onChange={e => updateHotel(idx, 'city', e.target.value)} className="flex-1" />
                      <Input placeholder="Hotel Name" value={hotel.name} onChange={e => updateHotel(idx, 'name', e.target.value)} className="flex-[2]" />
                      <Input placeholder="Category (3 Star)" value={hotel.category} onChange={e => updateHotel(idx, 'category', e.target.value)} className="flex-1" />
                      <Input type="number" placeholder="Nights" value={hotel.nights} onChange={e => updateHotel(idx, 'nights', e.target.value)} className="w-20" />
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeHotel(idx)} className="text-red-500 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                {form.hotels.length === 0 && (
                  <p className="text-center text-muted-foreground py-4 border rounded-lg">No hotels added. Click "Add Hotel" to add accommodations.</p>
                )}
              </div>
            </TabsContent>
            
            {/* SEO & Map Tab */}
            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Meta Title (SEO)</Label>
                  <Input value={form.meta_title} onChange={e => setForm(f => ({...f, meta_title: e.target.value}))} className="mt-1" placeholder="Page title for search engines" />
                </div>
                <div>
                  <Label>Meta Description (SEO)</Label>
                  <Input value={form.meta_description} onChange={e => setForm(f => ({...f, meta_description: e.target.value}))} className="mt-1" placeholder="Description for search engines" />
                </div>
              </div>
              <div>
                <Label>Tour Map URL (Google Maps Embed)</Label>
                <Input value={form.tour_map_url} onChange={e => setForm(f => ({...f, tour_map_url: e.target.value}))} className="mt-1" placeholder="https://www.google.com/maps/embed?..." />
                {form.tour_map_url && (
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <iframe src={form.tour_map_url} width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                  </div>
                )}
              </div>
              <div>
                <Label>SEO Content (Rich Text)</Label>
                <div className="mt-2">
                  <SeoEditor
                    value={form.seo_content}
                    onChange={(value) => setForm(f => ({ ...f, seo_content: value }))}
                    placeholder="Write detailed SEO content here with rich formatting..."
                    minHeight="360px"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Use the toolbar to format text, add links, and create engaging content that will appear on the tour page.</p>
              </div>
            </TabsContent>
            
            {/* FAQs Tab */}
            <TabsContent value="faqs" className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold">Frequently Asked Questions</Label>
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
              {form.faqs.length === 0 && (
                <p className="text-center text-muted-foreground py-4 border rounded-lg">No FAQs added. Click "Add FAQ" to add questions and answers.</p>
              )}
            </TabsContent>
          </Tabs>
          </div>
          
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-amber-600 hover:bg-amber-700 text-white">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {editId ? 'Update' : 'Create'} Package
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
