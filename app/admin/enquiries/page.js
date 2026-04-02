'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Calendar, User, Mail, Phone, MapPin, Users, Trash2, Loader2 } from 'lucide-react';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [updating, setUpdating] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' ? '/api/enquiries' : `/api/enquiries?status=${filter}`;
      const res = await fetch(url);
      setEnquiries(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchEnquiries(); }, [filter]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await fetch(`/api/enquiries/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      fetchEnquiries();
    } catch (e) { alert(e.message); }
    setUpdating(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    try { await fetch(`/api/enquiries/${id}`, { method: 'DELETE' }); fetchEnquiries(); } catch (e) { alert(e.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Enquiries</h1><p className="text-muted-foreground">Manage customer enquiries and bookings</p></div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Filter" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="space-y-4">
          {enquiries.map(enq => (
            <Card key={enq.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">{enq.name}</h3>
                      <Badge className={STATUS_COLORS[enq.status] || 'bg-gray-100 text-gray-700'}>{enq.status}</Badge>
                    </div>
                    {enq.package_title && <p className="text-sm font-medium text-amber-700 mb-2">Package: {enq.package_title}</p>}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{enq.email}</span>
                      {enq.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{enq.phone}</span>}
                      {enq.travel_date && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(enq.travel_date).toLocaleDateString()}</span>}
                      {enq.num_travelers && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{enq.num_travelers} travelers</span>}
                    </div>
                    {enq.message && <p className="text-sm mt-2 bg-gray-50 p-3 rounded-lg">{enq.message}</p>}
                    <p className="text-xs text-muted-foreground mt-2">Received: {new Date(enq.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Select value={enq.status} onValueChange={v => updateStatus(enq.id, v)} disabled={updating === enq.id}>
                      <SelectTrigger className="w-32 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(enq.id)}><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {enquiries.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No enquiries yet. They will appear here when customers submit the enquiry form.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
