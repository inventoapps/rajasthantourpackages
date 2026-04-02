/**
 * FAQ data — single source of truth for the /faq page.
 * Used by both the server page (JSON-LD schema) and client component (interactive accordion).
 */
export const FAQ_CATEGORIES = [
  {
    name: 'Booking & Reservations',
    emoji: '📋',
    faqs: [
      {
        q: 'How do I book a tour with Rajasthan Tours?',
        a: 'You can book a tour by visiting our Tour Packages page and selecting your preferred package. Fill out the enquiry form or contact us directly via phone or email. Our travel experts will confirm availability, share the detailed itinerary, and guide you through the booking process.',
      },
      {
        q: 'Is advance booking required?',
        a: 'Yes, we recommend booking at least 7–15 days in advance, especially during the peak tourist season (October to March). For festival-season tours (Diwali, Holi, Pushkar Fair, Desert Festival), we advise booking 30+ days ahead due to high demand.',
      },
      {
        q: 'Can I customize my tour itinerary?',
        a: 'Absolutely! All our tours can be fully customized to suit your preferences, budget, and schedule. Whether you want to add destinations, extend your stay, or include special activities, our team will design a personalized itinerary just for you.',
      },
      {
        q: 'What is the minimum group size for a tour?',
        a: 'We offer both private tours (minimum 1–2 persons) and group tours (minimum 4–6 persons). Private tours can be arranged for solo travelers or couples at a slightly higher per-person cost. Contact us for group discounts.',
      },
      {
        q: 'Do you offer last-minute bookings?',
        a: 'Yes, we do accommodate last-minute bookings based on availability. However, we cannot guarantee availability of preferred hotels or specific vehicles during peak season. Early booking is always recommended.',
      },
    ],
  },
  {
    name: 'Payment & Pricing',
    emoji: '💰',
    faqs: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept bank transfers (NEFT/RTGS/IMPS), UPI (Google Pay, PhonePe, Paytm), credit and debit cards (Visa, Mastercard, Rupay), and international wire transfers. All online payments are processed through secure, encrypted payment gateways.',
      },
      {
        q: 'How much deposit is required to confirm a booking?',
        a: 'A non-refundable deposit of 25% of the total tour cost is required at the time of booking. The remaining balance must be paid at least 15 days before the tour start date.',
      },
      {
        q: 'Are there any hidden charges?',
        a: 'No, we believe in transparent pricing. The tour cost includes everything mentioned in the inclusions section of each package. Any items listed under exclusions (such as personal expenses, tips, entry fees at optional sites) will be clearly stated upfront.',
      },
      {
        q: 'Can I pay in installments?',
        a: 'For tour packages above ₹50,000, we offer a flexible installment plan — 25% at booking, 50% at 30 days before departure, and the remaining 25% at 15 days before departure. Contact us for details.',
      },
    ],
  },
  {
    name: 'Cancellation & Refund',
    emoji: '🔄',
    faqs: [
      {
        q: 'What is your cancellation policy?',
        a: 'Cancellation charges depend on when you cancel: 30+ days before — 10% charge; 15–30 days — 25%; 7–14 days — 50%; less than 7 days or no show — 100% (no refund). For the full details, visit our Cancellation & Refund Policy page.',
      },
      {
        q: 'How long does it take to receive a refund?',
        a: 'Approved refunds are processed within 7–14 business days from the date of cancellation confirmation. The refund is credited to the original payment method. Bank processing times may add 3–5 additional business days.',
      },
      {
        q: 'Can I reschedule my tour instead of cancelling?',
        a: 'Yes! One free date change is permitted if requested more than 30 days before the original tour date (subject to availability). Changes within 30 days are treated as a cancellation and re-booking.',
      },
    ],
  },
  {
    name: 'Travel & Logistics',
    emoji: '🚗',
    faqs: [
      {
        q: 'What types of vehicles are used for tours?',
        a: 'We use well-maintained, air-conditioned vehicles appropriate for the group size — sedans (Swift Dzire, Honda Amaze) for 1–3 persons, SUVs (Innova Crysta, Ertiga) for 4–6 persons, and tempo travellers or mini coaches for larger groups. All vehicles are GPS-enabled and driven by experienced, licensed drivers.',
      },
      {
        q: 'Do you provide airport/railway station pickup?',
        a: 'Yes, complimentary pickup and drop-off at Jaipur airport and railway station is included in all tour packages. For other cities, transfers can be arranged at an additional cost. Our driver will be waiting with a name placard at the arrival gate.',
      },
      {
        q: 'What is the best time to visit Rajasthan?',
        a: 'The ideal time to visit Rajasthan is from October to March when the weather is pleasant (15°C to 30°C). November to February is the peak season. Summers (April to June) are hot but offer great deals. The monsoon season (July to September) brings lush greenery to southern Rajasthan.',
      },
      {
        q: 'Is Rajasthan safe for solo female travelers?',
        a: 'Yes, Rajasthan is generally safe for solo female travelers. We take extra care to ensure safety — our drivers and guides are thoroughly vetted, and we recommend hotels with good security. We suggest standard travel precautions like avoiding isolated areas at night and keeping valuables secure.',
      },
      {
        q: 'Do I need any permits or special documents?',
        a: 'Indian citizens need a valid government-issued ID (Aadhaar, PAN, Voter ID, or Passport). International tourists need a valid passport with an Indian tourist visa. Special permits may be required for certain restricted areas or wildlife sanctuaries, which we arrange as part of the tour.',
      },
    ],
  },
  {
    name: 'Accommodation & Meals',
    emoji: '🏨',
    faqs: [
      {
        q: 'What type of hotels do you use?',
        a: 'We offer a range of accommodations from heritage havelis and boutique hotels to 3-star, 4-star, and 5-star luxury properties. The specific hotels are mentioned in each package, and upgrades are available on request.',
      },
      {
        q: 'Are meals included in the tour packages?',
        a: 'Most packages include breakfast. Some premium packages include all meals (breakfast, lunch, and dinner). The exact meal plan is clearly mentioned in each tour package description. Special dietary requirements (vegetarian, Jain, vegan, halal) can be accommodated with prior notice.',
      },
      {
        q: 'Can I choose my own hotel?',
        a: 'Yes, if you prefer a specific hotel or have a loyalty membership, we can try to incorporate it into your itinerary. Additional charges may apply if the preferred hotel is at a higher price point than the one included in the package.',
      },
    ],
  },
  {
    name: 'Guides & Experiences',
    emoji: '🗺️',
    faqs: [
      {
        q: 'Are tour guides provided?',
        a: "Yes, all our packages include professional, government-licensed local tour guides who are knowledgeable about Rajasthan's history, culture, and architecture. Guides are available in English, Hindi, and select international languages (French, German, Spanish) on request.",
      },
      {
        q: 'What special experiences do you offer?',
        a: "We offer unique Rajasthani experiences including camel safaris in the Thar Desert, hot air balloon rides over Jaipur, village walks, cooking classes, traditional Rajasthani folk music and dance performances, textile workshops, and sunrise/sunset tours at iconic forts.",
      },
      {
        q: 'Do you arrange photography tours?',
        a: "Yes, we organize specialized photography tours with expert local guides who know the best spots, lighting conditions, and timings for capturing Rajasthan's vibrant landscapes, architecture, and culture.",
      },
    ],
  },
];

/**
 * Flatten all FAQ categories into a single array of {question, answer} objects.
 * Useful for JSON-LD FAQPage schema generation.
 */
export function getAllFaqs() {
  return FAQ_CATEGORIES.flatMap((cat) =>
    cat.faqs.map((faq) => ({ question: faq.q, answer: faq.a }))
  );
}
