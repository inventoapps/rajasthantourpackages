import { Card } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import PageHeader from '@/components/shared/PageHeader';

const DEFAULTS = {
  business_phone: '+91 98765 43210',
  business_email: 'info@rajasthantours.com',
  business_address: '123 MI Road, Jaipur, Rajasthan 302001, India',
  business_hours: 'Mon-Sat: 9AM - 7PM',
  google_maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227749.05387025368!2d75.64830659226562!3d26.88511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000',
};

export default function ContactPage({ siteSettings }) {
  const phone = siteSettings?.business_phone || DEFAULTS.business_phone;
  const email = siteSettings?.business_email || DEFAULTS.business_email;
  const address = siteSettings?.business_address || DEFAULTS.business_address;
  const hours = siteSettings?.business_hours || DEFAULTS.business_hours;
  const mapsUrl = siteSettings?.google_maps_embed_url || DEFAULTS.google_maps_embed_url;
  const phoneHref = `tel:${phone.replace(/[\s\-()]/g, '')}`;

  return (
    <div className="min-h-screen bg-stone-50" data-testid="contact-page">
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to help you plan your Rajasthan adventure"
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          <Card className="p-6 border-0 shadow-md text-center card-hover" data-testid="contact-phone">
            <div className="w-14 h-14 mx-auto mb-4 bg-amber-50 rounded-2xl flex items-center justify-center"><Phone className="w-7 h-7 text-amber-600" /></div>
            <h3 className="font-bold text-stone-900 mb-1">Phone</h3>
            <p className="text-stone-500 text-sm mb-2">Available {hours}</p>
            <a href={phoneHref} className="text-amber-700 font-semibold hover:underline">{phone}</a>
          </Card>
          <Card className="p-6 border-0 shadow-md text-center card-hover" data-testid="contact-email">
            <div className="w-14 h-14 mx-auto mb-4 bg-amber-50 rounded-2xl flex items-center justify-center"><Mail className="w-7 h-7 text-amber-600" /></div>
            <h3 className="font-bold text-stone-900 mb-1">Email</h3>
            <p className="text-stone-500 text-sm mb-2">We reply within 24 hours</p>
            <a href={`mailto:${email}`} className="text-amber-700 font-semibold hover:underline">{email}</a>
          </Card>
          <Card className="p-6 border-0 shadow-md text-center card-hover" data-testid="contact-address">
            <div className="w-14 h-14 mx-auto mb-4 bg-amber-50 rounded-2xl flex items-center justify-center"><MapPin className="w-7 h-7 text-amber-600" /></div>
            <h3 className="font-bold text-stone-900 mb-1">Office</h3>
            <p className="text-stone-500 text-sm mb-2">Visit our office</p>
            <p className="text-amber-700 font-semibold">{address}</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Send Us a Message</h2>
            <p className="text-stone-500 mb-6">Fill out the form and our travel experts will get back to you.</p>
            <EnquiryForm />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Find Us</h2>
            <p className="text-stone-500 mb-6">Our office is located in the heart of Jaipur.</p>
            <Card className="border-0 shadow-md overflow-hidden">
              <iframe src={mapsUrl} width="100%" height="400" style={{border:0}} allowFullScreen loading="lazy" className="rounded-lg" />
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
