'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Send, Sparkles } from 'lucide-react';

export default function EnquiryForm({ packageId, packageTitle, compact = false }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', travel_date: '', num_travelers: '2', message: '' });
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, package_id: packageId || null, package_title: packageTitle || 'General Inquiry', num_travelers: parseInt(form.num_travelers) || 2 }),
      });
      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error || 'Something went wrong');
        setStatus('error');
      } else {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', travel_date: '', num_travelers: '2', message: '' });
        setErrorMessage('');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error');
      setStatus('error');
    }
  };

  return (
    <Card className={`${compact ? 'p-4' : 'p-6 sm:p-7'} border-amber-200/80 bg-gradient-to-b from-amber-50/50 via-white to-white shadow-2xl rounded-2xl`}>
      <div className="mb-4 rounded-xl border border-amber-200/80 bg-white/70 px-4 py-3">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
          <Sparkles className="h-3.5 w-3.5" />
          Quick Trip Planning Form
        </p>
        <p className="mt-1 text-sm text-stone-600">Share your details and we will send the best plan and pricing.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className={`grid grid-cols-1 ${compact ? '' : 'sm:grid-cols-2'} gap-4`}>
          <div>
            <Label className="text-stone-700">Full Name *</Label>
            <Input required placeholder="Your name" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="mt-1.5 h-11 rounded-xl border-amber-200 bg-white/90 focus-visible:ring-2 focus-visible:ring-amber-500" />
          </div>
          <div>
            <Label className="text-stone-700">Email *</Label>
            <Input type="email" required placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className="mt-1.5 h-11 rounded-xl border-amber-200 bg-white/90 focus-visible:ring-2 focus-visible:ring-amber-500" />
          </div>
        </div>
        <div className={`grid grid-cols-1 ${compact ? '' : 'sm:grid-cols-3'} gap-4`}>
          <div>
            <Label className="text-stone-700">Phone</Label>
            <Input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} className="mt-1.5 h-11 rounded-xl border-amber-200 bg-white/90 focus-visible:ring-2 focus-visible:ring-amber-500" />
          </div>
          <div>
            <Label className="text-stone-700">Travel Date</Label>
            <Input type="date" value={form.travel_date} onChange={e => setForm(f => ({...f, travel_date: e.target.value}))} className="mt-1.5 h-11 rounded-xl border-amber-200 bg-white/90 focus-visible:ring-2 focus-visible:ring-amber-500" />
          </div>
          <div>
            <Label className="text-stone-700">Travelers</Label>
            <Select value={form.num_travelers} onValueChange={v => setForm(f => ({...f, num_travelers: v}))}>
              <SelectTrigger className="mt-1.5 h-11 rounded-xl border-amber-200 bg-white/90 focus:ring-2 focus:ring-amber-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>{[1,2,3,4,5,6,7,8,9,10].map(n => <SelectItem key={n} value={String(n)}>{n} {n===1?'Person':'People'}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label className="text-stone-700">Message</Label>
          <Textarea placeholder="Tell us about your travel preferences..." value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} className="mt-1.5 min-h-[110px] rounded-xl border-amber-200 bg-white/90 focus-visible:ring-2 focus-visible:ring-amber-500" />
        </div>
        <Button type="submit" disabled={status==='loading'} className="h-12 w-full rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/30 hover:from-amber-700 hover:to-orange-700">
          {status==='loading' ? 'Sending...' : 'Send Enquiry'} <Send className="ml-2 w-4 h-4" />
        </Button>
        {status==='success' && <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-3 text-sm text-green-700"><CheckCircle className="w-4 h-4" />Thank you! Our travel expert will contact you within 24 hours.</div>}
        {status==='error' && <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700"><XCircle className="w-4 h-4" />{errorMessage || 'Something went wrong. Please try again.'}</div>}
      </form>
    </Card>
  );
}
