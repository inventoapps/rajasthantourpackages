import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Users, Globe, Heart, ArrowRight } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { IMG_ABOUT_US } from '@/lib/image-config';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50" data-testid="about-page">
      <PageHeader
        title="About Rajasthan Tours"
        subtitle="Your trusted travel partner since 2010"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Badge className="bg-amber-50 text-amber-700 border-amber-200 mb-3">Our Story</Badge>
            <h2 className="text-3xl font-bold text-stone-900 mb-5">Crafting Royal Journeys Across Rajasthan</h2>
            <p className="text-stone-600 leading-relaxed mb-4">Founded in 2010, Rajasthan Tours has grown from a small Jaipur-based agency to one of the most trusted tour operators in North India. Our passion for Rajasthan's rich heritage and culture drives every itinerary we create.</p>
            <p className="text-stone-600 leading-relaxed mb-4">With over 50,000 happy travelers from 40+ countries, we pride ourselves on delivering authentic, immersive experiences that go beyond typical tourist trails. Our team of local experts, certified guides, and dedicated support staff ensures every trip is seamless and memorable.</p>
            <p className="text-stone-600 leading-relaxed">We are approved by the Department of Tourism, Government of Rajasthan, and members of IATO (Indian Association of Tour Operators) and RATO (Rajasthan Association of Tour Operators).</p>
          </div>
          {IMG_ABOUT_US && (
            <div className="rounded-2xl overflow-hidden shadow-2xl relative h-[400px]">
              <Image
                src={IMG_ABOUT_US}
                alt="Rajasthan"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[{ n: '15+', l: 'Years Experience', icon: Award }, { n: '50,000+', l: 'Happy Travelers', icon: Users }, { n: '40+', l: 'Countries Served', icon: Globe }, { n: '200+', l: 'Tour Packages', icon: Heart }].map(s => (
            <Card key={s.l} className="p-6 border-0 shadow-md text-center card-hover">
              <s.icon className="w-10 h-10 mx-auto text-amber-600 mb-3" />
              <p className="text-3xl font-bold text-stone-900">{s.n}</p>
              <p className="text-sm text-stone-500 mt-1">{s.l}</p>
            </Card>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-stone-900 text-center mb-10">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Local Expertise', desc: 'Born and raised in Rajasthan, our team has unmatched local knowledge and connections.' },
              { title: 'Customized Tours', desc: 'Every itinerary is tailored to your interests, pace, and budget. No cookie-cutter tours.' },
              { title: 'Best Value', desc: 'Direct hotel partnerships and local connections mean you get premium experiences at fair prices.' },
              { title: '24/7 Support', desc: 'Our dedicated support team is available round the clock during your trip.' },
              { title: 'Safety First', desc: 'Vetted vehicles, licensed drivers, and comprehensive travel insurance options.' },
              { title: 'Sustainable Tourism', desc: 'We support local communities and practice responsible, eco-friendly tourism.' },
            ].map(f => (
              <Card key={f.title} className="p-6 border-0 shadow-md card-hover">
                <h3 className="font-bold text-stone-900 mb-2">{f.title}</h3>
                <p className="text-sm text-stone-500">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Ready to Explore Rajasthan?</h2>
          <p className="text-stone-500 mb-6 max-w-xl mx-auto">Let us craft the perfect journey for you. Contact our travel experts today.</p>
          <div className="flex justify-center gap-4">
            <Link href="/tour-packages"><Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 py-5">Explore Packages <ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
            <Link href="/contact"><Button variant="outline" className="border-amber-300 text-amber-700 rounded-full px-8 py-5">Contact Us</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
