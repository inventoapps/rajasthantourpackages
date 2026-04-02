export const STATIC_PACKAGES = [
  {
    id: 'pkg-001', title: 'Royal Jaipur Explorer', slug: 'royal-jaipur-explorer',
    short_description: 'Explore the Pink City\'s magnificent palaces, vibrant bazaars, and rich Rajput heritage on this unforgettable 3-day journey.',
    description: 'Immerse yourself in the grandeur of Jaipur, the Pink City of India. This carefully curated tour takes you through centuries of Rajput history, from the majestic Amber Fort perched on a hilltop to the intricate lattice windows of Hawa Mahal. Experience the blend of ancient traditions and modern culture as you explore royal palaces, astronomical marvels, and bustling local markets. Enjoy traditional Rajasthani cuisine and stay in beautiful heritage hotels that reflect the city\'s royal past.',
    duration: '3 Days / 2 Nights', price: 12999, discounted_price: 10999, location: 'Jaipur',
    image_url: 'https://images.unsplash.com/photo-1670254812851-e59013163aee?w=800&q=80',
    highlights: ['Amber Fort Elephant Ride', 'City Palace Tour', 'Hawa Mahal Photography', 'Jantar Mantar Observatory', 'Johari Bazaar Shopping', 'Traditional Rajasthani Dinner'],
    itinerary: [
      { day: 1, title: 'Arrival & City Welcome', description: 'Arrive in Jaipur and check into your heritage hotel. Evening visit to Birla Mandir and enjoy a traditional Rajasthani welcome dinner with folk music and dance.' },
      { day: 2, title: 'Forts & Palaces', description: 'Morning visit to Amber Fort with elephant ride. Explore Jaigarh Fort and Nahargarh Fort. Afternoon at City Palace and Jantar Mantar. Evening at Hawa Mahal for sunset views.' },
      { day: 3, title: 'Markets & Departure', description: 'Morning visit to Albert Hall Museum. Shopping at Johari Bazaar and Bapu Bazaar for handicrafts, textiles, and jewelry. Afternoon departure with beautiful memories.' }
    ],
    inclusions: ['Heritage Hotel Stay', 'Daily Breakfast', 'AC Private Transport', 'Professional Guide', 'Monument Entry Tickets', 'Airport/Station Transfers'],
    exclusions: ['Lunch & Dinner (except Day 1)', 'Personal Expenses', 'Camera Fees', 'Travel Insurance', 'Tips & Gratuities'],
    category: 'heritage', rating: 4.7, reviews_count: 234, max_group_size: 15, is_featured: true, is_active: true,
    meta_title: 'Royal Jaipur Explorer - 3 Day Pink City Tour Package | Rajasthan Tours',
    meta_description: 'Explore Jaipur\'s Amber Fort, City Palace, Hawa Mahal & more on this 3-day heritage tour. Starting at Rs 10,999 per person with hotels & guide included.',
    price_table: [
      { type: 'Standard (3 Star)', single: 12999, double: 10999, triple: 9999, child_with_bed: 7999, child_without_bed: 4999 },
      { type: 'Deluxe (4 Star)', single: 18999, double: 15999, triple: 13999, child_with_bed: 10999, child_without_bed: 6999 },
      { type: 'Premium (5 Star)', single: 28999, double: 24999, triple: 21999, child_with_bed: 16999, child_without_bed: 9999 },
    ],
    hotels: [
      { city: 'Jaipur', name: 'Hotel Royal Heritage Inn', category: '3 Star', nights: 2 },
      { city: 'Jaipur', name: 'Samode Haveli', category: '4 Star Deluxe', nights: 2 },
      { city: 'Jaipur', name: 'Rambagh Palace by Taj', category: '5 Star Premium', nights: 2 },
    ],
    tour_map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227749.05387025368!2d75.64830659226562!3d26.88511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000',
    seo_content: '## Jaipur Tour Package - The Complete Pink City Experience\n\nJaipur, the capital of Rajasthan, is one of India\'s most popular tourist destinations. Known as the Pink City due to its distinctive terracotta-colored buildings, Jaipur forms one-third of India\'s famous Golden Triangle tourist circuit along with Delhi and Agra.\n\n### Why Choose Our Jaipur Tour Package?\n\nOur Royal Jaipur Explorer package is designed for travelers who want to experience the best of Jaipur in a compact 3-day itinerary. From the iconic Amber Fort to the bustling markets of the old city, every moment is carefully planned to give you an authentic Rajasthani experience.\n\n### Best Time to Visit Jaipur\n\nThe best time to visit Jaipur is from October to March when the weather is pleasant and ideal for sightseeing. The Jaipur Literature Festival in January and the Elephant Festival during Holi are special events worth planning your trip around.',
    faqs: [
      { question: 'What is the best time to visit Jaipur?', answer: 'October to March is the best time to visit Jaipur when temperatures are pleasant (10-25°C). Avoid May-June as temperatures can reach 45°C+.' },
      { question: 'Is this package suitable for families with children?', answer: 'Yes! The package is family-friendly. Children under 5 stay free. We provide child-friendly meals and activities.' },
      { question: 'Can I customize this package?', answer: 'Absolutely! Contact us to customize the itinerary, add extra days, upgrade hotels, or add special activities like cooking classes.' },
      { question: 'What about cancellation policy?', answer: 'Free cancellation up to 7 days before travel. 50% refund for 3-7 days. No refund within 3 days of travel.' },
    ],
  },
  {
    id: 'pkg-002', title: 'Udaipur Lake City Romance', slug: 'udaipur-lake-city-romance',
    short_description: 'Discover the Venice of the East with its stunning lakes, romantic palaces, and enchanting sunsets.',
    description: 'Experience the most romantic city in India. Udaipur, nestled between the Aravalli hills and shimmering lakes, offers a fairy-tale setting with its magnificent palaces, serene lakes, and vibrant arts scene. Perfect for couples and those seeking a luxurious, culturally rich getaway.',
    duration: '4 Days / 3 Nights', price: 18999, discounted_price: 15999, location: 'Udaipur',
    image_url: 'https://images.unsplash.com/photo-1601571574713-349e4e867fa6?w=800&q=80',
    highlights: ['Lake Pichola Boat Ride', 'City Palace Museum', 'Jag Mandir Island Visit', 'Saheliyon ki Bari Gardens', 'Sunset at Monsoon Palace', 'Cultural Dance Show'],
    itinerary: [
      { day: 1, title: 'Lakeside Arrival', description: 'Arrive in Udaipur and check into lakeside resort. Evening boat ride on Lake Pichola with views of City Palace and Jag Mandir.' },
      { day: 2, title: 'Royal Heritage', description: 'Full-day exploration of City Palace complex, Jagdish Temple, and the vintage car museum. Afternoon at Saheliyon ki Bari.' },
      { day: 3, title: 'Art & Culture', description: 'Visit Shilpgram craft village. Explore Bagore ki Haveli and Fateh Sagar Lake. Sunset drive to Monsoon Palace.' },
      { day: 4, title: 'Leisure & Departure', description: 'Morning yoga by the lake. Leisure time for shopping at Hathi Pol market. Afternoon departure.' }
    ],
    inclusions: ['Lakeside Resort Stay', 'Daily Breakfast & Dinner', 'AC Transport', 'Expert Guide', 'Boat Rides', 'Entry Tickets'],
    exclusions: ['Lunch', 'Personal Shopping', 'Spa Services', 'Travel Insurance'],
    category: 'luxury', rating: 4.9, reviews_count: 189, max_group_size: 10, is_featured: true, is_active: true,
    meta_title: 'Udaipur Lake City Romance - 4 Day Luxury Tour | Rajasthan Tours',
    meta_description: 'Explore the Venice of the East with Lake Pichola boat rides, City Palace, and romantic sunset views. 4-day Udaipur package from Rs 15,999.',
    price_table: [
      { type: 'Standard (3 Star)', single: 18999, double: 15999, triple: 13999, child_with_bed: 11999, child_without_bed: 6999 },
      { type: 'Deluxe (4 Star)', single: 26999, double: 22999, triple: 19999, child_with_bed: 15999, child_without_bed: 9999 },
      { type: 'Premium (5 Star)', single: 39999, double: 34999, triple: 29999, child_with_bed: 22999, child_without_bed: 13999 },
    ],
    hotels: [
      { city: 'Udaipur', name: 'Hotel Lakend', category: '3 Star', nights: 3 },
      { city: 'Udaipur', name: 'Radisson Blu Udaipur', category: '4 Star Deluxe', nights: 3 },
      { city: 'Udaipur', name: 'Taj Lake Palace', category: '5 Star Premium', nights: 3 },
    ],
    tour_map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115771.90408950898!2d73.62574849726562!3d24.585445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e56ce110aaad%3A0x4c2eaa2ee4be4b1b!2sUdaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000',
    seo_content: '## Udaipur Tour Package - The Venice of the East\n\nUdaipur is widely regarded as the most romantic city in India. With its pristine lakes, grand palaces, and the backdrop of the Aravalli hills, Udaipur offers an enchanting experience that stays with you forever.\n\n### Top Attractions in Udaipur\n\nCity Palace, Lake Pichola, Jag Mandir, Monsoon Palace, and the vibrant art galleries make Udaipur a must-visit destination for culture lovers and honeymooners alike.',
    faqs: [
      { question: 'Is this package good for honeymoon?', answer: 'Absolutely! Udaipur is India\'s #1 honeymoon destination. We offer special honeymoon upgrades with candlelit dinners and private boat rides.' },
      { question: 'What is the boat ride like?', answer: 'The Lake Pichola boat ride is the highlight. You\'ll cruise past the City Palace and visit Jag Mandir island. Sunset rides are most popular.' },
      { question: 'Can I add a cooking class?', answer: 'Yes! We offer optional Rajasthani cooking classes at heritage havelis. Ask when booking.' },
    ],
  },
  {
    id: 'pkg-003', title: 'Jaisalmer Desert Adventure', slug: 'jaisalmer-desert-adventure',
    short_description: 'Experience the Golden City and the magical Thar Desert with camel safaris, desert camping, and ancient fort exploration.',
    description: 'Journey to the heart of the Thar Desert and discover the golden magnificence of Jaisalmer. This adventure package combines the thrill of desert safari with the historical grandeur of one of the world\'s largest living forts. Sleep under a billion stars in luxury desert camps.',
    duration: '5 Days / 4 Nights', price: 22999, discounted_price: 19499, location: 'Jaisalmer',
    image_url: 'https://images.unsplash.com/photo-1670687174580-c003b4716959?w=800&q=80',
    highlights: ['Camel Safari in Sam Dunes', 'Desert Camp Under Stars', 'Jaisalmer Fort Walk', 'Patwon Ki Haveli', 'Gadisar Lake Sunset', 'Folk Music Night'],
    itinerary: [
      { day: 1, title: 'Golden City Arrival', description: 'Arrive in Jaisalmer and check into a haveli-style hotel inside the fort. Evening walk through the living fort.' },
      { day: 2, title: 'Havelis & Heritage', description: 'Visit Patwon Ki Haveli, Salim Singh Ki Haveli, and Nathmal Ki Haveli. Afternoon at Gadisar Lake.' },
      { day: 3, title: 'Desert Safari', description: 'Morning jeep safari to Kuldhara abandoned village. Afternoon camel ride through Sam Sand Dunes. Evening cultural program. Night in luxury desert camp.' },
      { day: 4, title: 'Desert Morning', description: 'Sunrise over the dunes. Morning desert activities. Return to Jaisalmer. Visit the War Museum.' },
      { day: 5, title: 'Departure', description: 'Morning leisure at the fort. Last-minute shopping. Departure.' }
    ],
    inclusions: ['Fort Hotel + Desert Camp Stay', 'All Meals During Desert Camp', 'Breakfast at Hotel', 'Jeep & Camel Safari', 'Cultural Program', 'AC Transport', 'Guide'],
    exclusions: ['Lunch & Dinner at Hotel', 'Personal Expenses', 'Dune Bashing (optional)', 'Travel Insurance'],
    category: 'adventure', rating: 4.8, reviews_count: 312, max_group_size: 20, is_featured: true, is_active: true,
    meta_title: 'Jaisalmer Desert Adventure - 5 Day Thar Desert Tour | Rajasthan Tours',
    meta_description: 'Camel safari, desert camping under stars, Jaisalmer Fort & more. 5-day Jaisalmer adventure from Rs 19,499. Book now!',
    price_table: [
      { type: 'Standard', single: 22999, double: 19499, triple: 17499, child_with_bed: 13999, child_without_bed: 7999 },
      { type: 'Deluxe', single: 29999, double: 25999, triple: 22999, child_with_bed: 17999, child_without_bed: 10999 },
      { type: 'Luxury Camp', single: 38999, double: 33999, triple: 29999, child_with_bed: 22999, child_without_bed: 14999 },
    ],
    hotels: [
      { city: 'Jaisalmer', name: 'Hotel Golden Haveli', category: '3 Star', nights: 3 },
      { city: 'Sam Dunes', name: 'Royal Desert Camp', category: 'Luxury Camp', nights: 1 },
    ],
    tour_map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115771.90408950898!2d70.91257484972656!3d26.915445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c4e09a3d1cb%3A0x56bf43b02a8348e0!2sJaisalmer%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1700000000000',
    seo_content: '## Jaisalmer Desert Safari Package\n\nJaisalmer, known as the Golden City, rises from the Thar Desert like a golden mirage. Our desert adventure package offers the perfect blend of historical exploration and thrilling desert activities.\n\n### What Makes Our Desert Safari Special?\n\nUnlike generic desert tours, our package includes an overnight stay at a luxury desert camp with Swiss tents, authentic Rajasthani cuisine, and private cultural performances under the stars.',
    faqs: [
      { question: 'How cold does it get in the desert at night?', answer: 'Desert nights can drop to 5-10°C in winter (Oct-Feb). We provide warm blankets and bonfires at the camp.' },
      { question: 'Is the camel ride safe for beginners?', answer: 'Yes, all our camels are well-trained and our guides are experienced. The ride is gentle and suitable for beginners.' },
      { question: 'What should I pack for the desert?', answer: 'Light cotton clothes, warm jacket for evenings, sunscreen, sunglasses, comfortable shoes, and a camera with extra batteries.' },
    ],
  },
  {
    id: 'pkg-004', title: 'Jodhpur Blue City Heritage', slug: 'jodhpur-blue-city-heritage',
    short_description: 'Discover the majestic Blue City with its imposing Mehrangarh Fort, vibrant markets, and royal Umaid Bhawan Palace.',
    description: 'Explore Jodhpur, the Blue City of Rajasthan, where azure-painted houses create a mesmerizing landscape beneath the imposing Mehrangarh Fort. This heritage tour takes you through centuries of Marwar history.',
    duration: '3 Days / 2 Nights', price: 11999, discounted_price: 9999, location: 'Jodhpur',
    image_url: 'https://images.unsplash.com/photo-1685790582503-1b2762d95407?w=800&q=80',
    highlights: ['Mehrangarh Fort Tour', 'Umaid Bhawan Palace', 'Blue City Walking Tour', 'Zip-lining at Mehrangarh', 'Clock Tower Market', 'Rajasthani Thali'],
    itinerary: [
      { day: 1, title: 'Fort City Welcome', description: 'Arrive in Jodhpur. Check into heritage hotel. Evening walk through the old city blue lanes.' },
      { day: 2, title: 'Forts & Palaces', description: 'Full-day tour of Mehrangarh Fort with audio guide. Umaid Bhawan Palace Museum. Evening at Mandore Gardens.' },
      { day: 3, title: 'Markets & Departure', description: 'Morning visit to Clock Tower and Sardar Market. Spice shopping tour. Visit Toorji Ka Jhalra stepwell. Departure.' }
    ],
    inclusions: ['Heritage Hotel Stay', 'Breakfast & One Dinner', 'AC Transport', 'Fort Audio Guide', 'Walking Tour Guide', 'Entry Tickets'],
    exclusions: ['Zip-lining Fee', 'Other Meals', 'Personal Expenses', 'Travel Insurance'],
    category: 'heritage', rating: 4.6, reviews_count: 178, max_group_size: 15, is_featured: false, is_active: true,
    meta_title: 'Jodhpur Blue City Heritage - 3 Day Tour Package | Rajasthan Tours',
    meta_description: 'Explore Jodhpur\'s Mehrangarh Fort, Blue City lanes & Umaid Bhawan Palace. 3-day heritage tour from Rs 9,999.',
    price_table: [
      { type: 'Standard', single: 11999, double: 9999, triple: 8499, child_with_bed: 6999, child_without_bed: 3999 },
      { type: 'Deluxe', single: 16999, double: 13999, triple: 11999, child_with_bed: 9999, child_without_bed: 5999 },
    ],
    hotels: [
      { city: 'Jodhpur', name: 'Pal Haveli', category: '3 Star Heritage', nights: 2 },
      { city: 'Jodhpur', name: 'Raas Jodhpur', category: '4 Star Boutique', nights: 2 },
    ],
    tour_map_url: '',
    seo_content: '## Jodhpur Tour Package - Explore the Blue City\n\nJodhpur, the second-largest city in Rajasthan, is a vibrant destination known for its striking blue-painted old city and the massive Mehrangarh Fort that towers above it.',
    faqs: [
      { question: 'Why is Jodhpur called the Blue City?', answer: 'The old city houses are painted blue, originally to indicate Brahmin residences. The blue color also helps keep houses cool in summer.' },
      { question: 'Is zip-lining at Mehrangarh Fort included?', answer: 'Zip-lining is optional and not included in the base price. It can be booked separately at Rs 1,500 per person.' },
    ],
  },
  {
    id: 'pkg-005', title: 'Grand Rajasthan Circuit', slug: 'grand-rajasthan-circuit',
    short_description: 'The ultimate Rajasthan experience covering Jaipur, Jodhpur, Jaisalmer, and Udaipur in one magnificent journey.',
    description: 'This is the definitive Rajasthan tour. Travel through the land of kings, from the Pink City to the Blue City, from the Golden Fort to the City of Lakes. Experience every facet of Rajasthani culture, cuisine, and heritage in this comprehensive 10-day journey.',
    duration: '10 Days / 9 Nights', price: 54999, discounted_price: 45999, location: 'Jaipur - Jodhpur - Jaisalmer - Udaipur',
    image_url: 'https://images.unsplash.com/photo-1724382981275-f144e3a12cdb?w=800&q=80',
    highlights: ['4 Royal Cities', 'Desert Safari & Camping', 'Lake Palace Views', 'Heritage Hotel Stays', 'Cultural Performances', 'Cooking Classes'],
    itinerary: [
      { day: 1, title: 'Jaipur Arrival', description: 'Arrive in Jaipur. Heritage hotel check-in. Evening welcome dinner.' },
      { day: 2, title: 'Jaipur Exploration', description: 'Amber Fort, City Palace, Hawa Mahal, Jantar Mantar.' },
      { day: 3, title: 'Jaipur to Jodhpur', description: 'Drive to Jodhpur via Ajmer and Pushkar.' },
      { day: 4, title: 'Jodhpur Heritage', description: 'Mehrangarh Fort, Umaid Bhawan Palace, Blue City walk.' },
      { day: 5, title: 'Jodhpur to Jaisalmer', description: 'Scenic drive through the Thar Desert.' },
      { day: 6, title: 'Jaisalmer Golden City', description: 'Fort walk, havelis tour, Gadisar Lake.' },
      { day: 7, title: 'Desert Experience', description: 'Camel safari, sand dune activities, cultural night under the stars.' },
      { day: 8, title: 'Jaisalmer to Udaipur', description: 'Long scenic drive via Ranakpur Jain Temple.' },
      { day: 9, title: 'Udaipur Romance', description: 'City Palace, Lake Pichola boat ride, Jagdish Temple.' },
      { day: 10, title: 'Departure', description: 'Morning at leisure. Airport transfer.' }
    ],
    inclusions: ['Heritage Hotels Throughout', 'Daily Breakfast', '4 Dinners', 'AC Transport', 'Expert Guide', 'All Entry Tickets', 'Desert Camp', 'Camel Safari', 'Boat Rides'],
    exclusions: ['Flights', 'Lunches', 'Personal Expenses', 'Tips', 'Travel Insurance'],
    category: 'premium', rating: 4.9, reviews_count: 156, max_group_size: 12, is_featured: true, is_active: true,
    meta_title: 'Grand Rajasthan Circuit - 10 Day Complete Tour | Rajasthan Tours',
    meta_description: 'The ultimate 10-day Rajasthan tour covering Jaipur, Jodhpur, Jaisalmer & Udaipur. Heritage hotels, desert safari & more from Rs 45,999.',
    price_table: [
      { type: 'Standard (3 Star)', single: 54999, double: 45999, triple: 39999, child_with_bed: 32999, child_without_bed: 19999 },
      { type: 'Deluxe (4 Star)', single: 74999, double: 62999, triple: 54999, child_with_bed: 44999, child_without_bed: 27999 },
      { type: 'Premium (5 Star)', single: 109999, double: 94999, triple: 84999, child_with_bed: 64999, child_without_bed: 39999 },
    ],
    hotels: [
      { city: 'Jaipur', name: 'Samode Haveli / Rambagh Palace', category: '4-5 Star', nights: 2 },
      { city: 'Jodhpur', name: 'Raas / Umaid Bhawan', category: '4-5 Star', nights: 2 },
      { city: 'Jaisalmer', name: 'Suryagarh / Golden Haveli', category: '4-5 Star', nights: 2 },
      { city: 'Sam Dunes', name: 'Royal Desert Camp', category: 'Luxury Camp', nights: 1 },
      { city: 'Udaipur', name: 'Taj Lake Palace / Leela', category: '5 Star', nights: 2 },
    ],
    tour_map_url: 'https://www.google.com/maps/embed?pb=!1m40!1m12!1m3!1d1851979.7018448035!2d71.9!3d26.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m25!3e0!4m5!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur!3m2!1d26.9124336!2d75.7872709!4m5!1s0x39418c4e09a3d1cb%3A0x56bf43b02a8348e0!2sJodhpur!3m2!1d26.2389469!2d73.0243094!4m5!1s0x39418c4e09a3d1cb%3A0x56bf43b02a8348e0!2sJaisalmer!3m2!1d26.9157!2d70.9083!4m5!1s0x3967e56ce110aaad%3A0x4c2eaa2ee4be4b1b!2sUdaipur!3m2!1d24.5854!2d73.7125!5e0!3m2!1sen!2sin!4v1700000000000',
    seo_content: '## Grand Rajasthan Circuit - The Complete Royal Experience\n\nThe Grand Rajasthan Circuit is our flagship tour covering the four most iconic cities of Rajasthan: Jaipur, Jodhpur, Jaisalmer, and Udaipur. This 10-day journey gives you the most comprehensive Rajasthan experience possible.\n\n### Route Overview\n\nJaipur (Pink City) → Jodhpur (Blue City) → Jaisalmer (Golden City) → Udaipur (City of Lakes). Each city offers a completely different landscape, architecture, and cultural experience.',
    faqs: [
      { question: 'How much driving is involved?', answer: 'The total driving distance is approximately 1,200 km spread over 10 days. Longest drive is Jaisalmer to Udaipur (~550 km) with a stop at Ranakpur.' },
      { question: 'Can I do this tour in fewer days?', answer: 'We offer a 7-day version covering 3 cities. Contact us for a customized shorter itinerary.' },
      { question: 'Are internal flights available?', answer: 'Yes, we can arrange flights between cities to reduce driving time. This adds approximately Rs 15,000-20,000 to the package cost.' },
    ],
  },
  {
    id: 'pkg-006', title: 'Pushkar Sacred Journey', slug: 'pushkar-sacred-journey',
    short_description: 'Visit the holy city of Pushkar and the sacred Ajmer Sharif Dargah on this spiritual Rajasthan tour.',
    description: 'Embark on a soul-stirring journey to Pushkar, home to one of the few Brahma temples in the world, and Ajmer, housing the revered Dargah Sharif.',
    duration: '3 Days / 2 Nights', price: 9999, discounted_price: 7999, location: 'Pushkar & Ajmer',
    image_url: 'https://images.unsplash.com/photo-1637584498138-1f7122e48082?w=800&q=80',
    highlights: ['Brahma Temple Darshan', 'Pushkar Lake Aarti', 'Ajmer Sharif Dargah', 'Camel Fair Grounds', 'Rose Garden Visit', 'Sunset at Savitri Temple'],
    itinerary: [
      { day: 1, title: 'Arrival in Pushkar', description: 'Arrive and check into lakeside guesthouse. Evening Pushkar Lake aarti ceremony.' },
      { day: 2, title: 'Temples & Dargah', description: 'Morning Brahma Temple. Trek to Savitri Temple. Afternoon Ajmer Sharif Dargah.' },
      { day: 3, title: 'Rose Gardens & Departure', description: 'Visit famous rose gardens. Explore camel fair grounds. Shopping. Departure.' }
    ],
    inclusions: ['Lakeside Stay', 'Breakfast', 'AC Transport', 'Local Guide', 'Ajmer Transfer'],
    exclusions: ['Meals (except breakfast)', 'Temple Donations', 'Personal Expenses', 'Travel Insurance'],
    category: 'spiritual', rating: 4.5, reviews_count: 145, max_group_size: 20, is_featured: false, is_active: true,
    meta_title: 'Pushkar Sacred Journey - 3 Day Spiritual Tour | Rajasthan Tours',
    meta_description: 'Visit Pushkar\'s Brahma Temple, Pushkar Lake & Ajmer Dargah. 3-day spiritual tour from Rs 7,999.',
    price_table: [
      { type: 'Standard', single: 9999, double: 7999, triple: 6999, child_with_bed: 5499, child_without_bed: 2999 },
      { type: 'Deluxe', single: 14999, double: 11999, triple: 10499, child_with_bed: 7999, child_without_bed: 4999 },
    ],
    hotels: [
      { city: 'Pushkar', name: 'Hotel Pushkar Palace', category: '3 Star Heritage', nights: 2 },
    ],
    tour_map_url: '',
    seo_content: '## Pushkar & Ajmer Spiritual Tour\n\nPushkar is one of the oldest cities in India and holds immense religious significance. Our spiritual tour combines the sacred Brahma Temple, the holy Pushkar Lake, and the revered Ajmer Sharif Dargah.',
    faqs: [
      { question: 'Is there a dress code for temples?', answer: 'Modest clothing is recommended. Cover shoulders and knees when visiting temples and the Dargah.' },
      { question: 'When is the Pushkar Camel Fair?', answer: 'The fair typically falls in November (during Kartik Purnima). Check exact dates as they vary each year.' },
    ],
  },
  {
    id: 'pkg-007', title: 'Ranthambore Wildlife Safari', slug: 'ranthambore-wildlife-safari',
    short_description: 'Track the majestic Royal Bengal Tiger in one of India\'s most famous national parks.',
    description: 'Experience the thrill of wildlife safari in Ranthambore National Park, one of the best places in India to spot the Royal Bengal Tiger in its natural habitat.',
    duration: '4 Days / 3 Nights', price: 24999, discounted_price: 21999, location: 'Ranthambore',
    image_url: 'https://images.unsplash.com/photo-1715264500941-27bf30bf46eb?w=800&q=80',
    highlights: ['3 Jungle Safaris', 'Tiger Spotting', 'Ranthambore Fort Trek', 'Bird Watching', 'Nature Photography', 'Tribal Village Visit'],
    itinerary: [
      { day: 1, title: 'Arrival & Evening Safari', description: 'Arrive at Ranthambore. Check into wildlife resort. Afternoon jungle safari.' },
      { day: 2, title: 'Morning & Evening Safari', description: 'Early morning safari. Afternoon rest and nature walk. Evening safari.' },
      { day: 3, title: 'Fort & Final Safari', description: 'Morning Ranthambore Fort visit. Afternoon safari. Evening tribal village visit.' },
      { day: 4, title: 'Departure', description: 'Early morning bird watching. Breakfast and departure.' }
    ],
    inclusions: ['Wildlife Resort Stay', 'All Meals', '3 Jeep Safaris', 'Park Entry Fees', 'Naturalist Guide', 'Fort Visit', 'Station Transfers'],
    exclusions: ['Travel to/from Ranthambore', 'Camera Fees Inside Park', 'Personal Expenses', 'Travel Insurance'],
    category: 'wildlife', rating: 4.7, reviews_count: 198, max_group_size: 6, is_featured: true, is_active: true,
    meta_title: 'Ranthambore Wildlife Safari - 4 Day Tiger Tour | Rajasthan Tours',
    meta_description: 'Spot Royal Bengal Tigers at Ranthambore National Park. 4-day wildlife safari with resort stay from Rs 21,999.',
    price_table: [
      { type: 'Standard', single: 24999, double: 21999, triple: 19999, child_with_bed: 15999, child_without_bed: 9999 },
      { type: 'Luxury Resort', single: 34999, double: 29999, triple: 26999, child_with_bed: 21999, child_without_bed: 13999 },
    ],
    hotels: [
      { city: 'Ranthambore', name: 'Tiger Den Resort', category: '3 Star', nights: 3 },
      { city: 'Ranthambore', name: 'Nahargarh Ranthambore', category: '5 Star', nights: 3 },
    ],
    tour_map_url: '',
    seo_content: '## Ranthambore Wildlife Safari Package\n\nRanthambore National Park is one of the largest and most renowned national parks in northern India. Known for its large tiger population, it is one of the best places to see these majestic animals in their natural habitat.',
    faqs: [
      { question: 'What are the chances of seeing a tiger?', answer: 'Ranthambore has one of the highest tiger sighting rates in India. With 3 safaris, the probability is approximately 70-80% in peak season.' },
      { question: 'Is the park open year-round?', answer: 'The park is open from October 1 to June 30. It remains closed during the monsoon season (July-September).' },
    ],
  },
  {
    id: 'pkg-008', title: 'Golden Triangle with Rajasthan', slug: 'golden-triangle-rajasthan',
    short_description: 'Combine the iconic Golden Triangle of Delhi, Agra & Jaipur with the desert magic of Rajasthan.',
    description: 'The most popular tour circuit in India, enhanced with Rajasthan\'s finest destinations. Start from Delhi, witness the Taj Mahal in Agra, explore Jaipur\'s forts, and extend into Rajasthan\'s heartland.',
    duration: '7 Days / 6 Nights', price: 35999, discounted_price: 29999, location: 'Delhi - Agra - Jaipur',
    image_url: 'https://images.unsplash.com/photo-1740918140700-c84ad83c7696?w=800&q=80',
    highlights: ['Taj Mahal Sunrise', 'Red Fort Delhi', 'Amber Fort Jaipur', 'Qutub Minar', 'Agra Fort', 'India Gate', 'Fatehpur Sikri'],
    itinerary: [
      { day: 1, title: 'Delhi Arrival', description: 'Airport pickup. Check into hotel. Evening India Gate visit.' },
      { day: 2, title: 'Delhi Sightseeing', description: 'Red Fort, Jama Masjid, Chandni Chowk, Qutub Minar.' },
      { day: 3, title: 'Delhi to Agra', description: 'Drive to Agra. Afternoon Agra Fort. Evening Taj views from Mehtab Bagh.' },
      { day: 4, title: 'Taj Mahal & Fatehpur Sikri', description: 'Sunrise at Taj Mahal. Visit Fatehpur Sikri. Drive to Jaipur.' },
      { day: 5, title: 'Jaipur Day 1', description: 'Amber Fort, Jaigarh Fort, Nahargarh Fort. Evening Chokhi Dhani.' },
      { day: 6, title: 'Jaipur Day 2', description: 'City Palace, Hawa Mahal, Jantar Mantar. Shopping. Farewell dinner.' },
      { day: 7, title: 'Departure', description: 'Morning leisure. Transfer to airport/station.' }
    ],
    inclusions: ['4-Star Hotels', 'Daily Breakfast', 'AC Transport Throughout', 'Professional Guide', 'All Entry Tickets', 'Airport Transfers'],
    exclusions: ['Flights', 'Lunches & Dinners', 'Personal Expenses', 'Camera Fees', 'Travel Insurance'],
    category: 'heritage', rating: 4.6, reviews_count: 267, max_group_size: 15, is_featured: false, is_active: true,
    meta_title: 'Golden Triangle with Rajasthan - 7 Day Tour | Rajasthan Tours',
    meta_description: 'Delhi, Agra & Jaipur Golden Triangle tour with Rajasthan extension. 7 days from Rs 29,999 including Taj Mahal, Amber Fort & more.',
    price_table: [
      { type: 'Standard (3 Star)', single: 35999, double: 29999, triple: 26999, child_with_bed: 21999, child_without_bed: 12999 },
      { type: 'Deluxe (4 Star)', single: 49999, double: 42999, triple: 37999, child_with_bed: 29999, child_without_bed: 17999 },
      { type: 'Premium (5 Star)', single: 74999, double: 64999, triple: 56999, child_with_bed: 44999, child_without_bed: 27999 },
    ],
    hotels: [
      { city: 'Delhi', name: 'ITC Maurya / Oberoi', category: '4-5 Star', nights: 2 },
      { city: 'Agra', name: 'ITC Mughal / Oberoi Amarvilas', category: '4-5 Star', nights: 1 },
      { city: 'Jaipur', name: 'Rambagh Palace / Samode', category: '4-5 Star', nights: 3 },
    ],
    tour_map_url: '',
    seo_content: '## Golden Triangle Tour with Rajasthan Extension\n\nThe Golden Triangle is India\'s most iconic tourist circuit connecting Delhi, Agra, and Jaipur. Our enhanced version extends into Rajasthan for a more comprehensive experience of North India\'s finest heritage and culture.',
    faqs: [
      { question: 'Is the Taj Mahal visit at sunrise?', answer: 'Yes! We include a sunrise visit to the Taj Mahal, which is the most magical time to see it. The changing colors of marble at dawn are unforgettable.' },
      { question: 'How long are the drives between cities?', answer: 'Delhi to Agra: ~4 hours, Agra to Jaipur: ~5 hours (via Fatehpur Sikri). All drives are in air-conditioned vehicles.' },
    ],
  }
];

export const STATIC_BLOGS = [
  {
    id: 'blog-001', title: 'Top 10 Must-Visit Places in Rajasthan in 2025', slug: 'top-10-places-rajasthan-2025',
    excerpt: 'Discover the most breathtaking destinations in Rajasthan that you absolutely cannot miss this year.',
    content: '## 1. Jaipur - The Pink City\n\nJaipur, the capital of Rajasthan, is a vibrant city that perfectly blends ancient heritage with modern culture. The Amber Fort, City Palace, and Hawa Mahal are iconic landmarks that attract millions of visitors.\n\n## 2. Udaipur - The Venice of the East\n\nNestled between the Aravalli hills, Udaipur is arguably the most romantic city in India. Lake Pichola, City Palace, and the stunning sunset views make it a photographer\'s paradise.\n\n## 3. Jaisalmer - The Golden City\n\nRising from the Thar Desert like a golden mirage, Jaisalmer is famous for its massive sandcastle-like fort and endless sand dunes. The desert safari experience here is unmatched.\n\n## 4. Jodhpur - The Blue City\n\nThe blue-painted houses of the old city create a mesmerizing landscape beneath the imposing Mehrangarh Fort. The Clock Tower market is perfect for souvenir shopping.\n\n## 5. Pushkar - The Sacred City\n\nHome to the only Brahma Temple in the world, Pushkar is a spiritual haven. The annual Camel Fair is one of India\'s most colorful festivals.\n\n## 6. Ranthambore - Tiger Country\n\nOne of the best places in India to spot Royal Bengal Tigers in their natural habitat. The ancient Ranthambore Fort adds a historical dimension.\n\n## 7. Mount Abu - The Hill Station\n\nRajasthan\'s only hill station offers cool respite with its Dilwara Jain Temples, Nakki Lake, and lush greenery.\n\n## 8. Bikaner - The Camel Country\n\nFamous for Junagarh Fort and delicious snacks (bhujia), Bikaner offers an authentic Rajasthani experience away from tourist crowds.\n\n## 9. Chittorgarh - Fort of Valor\n\nThe largest fort in India stands as a testament to Rajput bravery. The Tower of Victory and Tower of Fame are remarkable.\n\n## 10. Bundi - The Hidden Gem\n\nOften overlooked, Bundi\'s step-wells, palace, and wall paintings are among Rajasthan\'s best-kept secrets.',
    image_url: 'https://images.unsplash.com/photo-1601571574713-349e4e867fa6?w=800&q=80',
    image_alt: 'Top 10 places to visit in Rajasthan India',
    title_alt: 'Best tourist destinations in Rajasthan 2025',
    author: 'Rajasthan Tours', category: 'travel-guide', tags: ['Rajasthan', 'Travel', 'Tourism', 'India', 'Top 10'],
    is_published: true,
    meta_title: 'Top 10 Must-Visit Places in Rajasthan 2025 | Travel Guide',
    meta_description: 'Discover the top 10 must-visit destinations in Rajasthan for 2025 including Jaipur, Udaipur, Jaisalmer, Jodhpur, and hidden gems.',
    faqs: [
      { question: 'What is the best time to visit Rajasthan?', answer: 'October to March is ideal with pleasant weather (15-25°C).' },
      { question: 'How many days do I need to explore Rajasthan?', answer: 'A minimum of 10-14 days is recommended to cover the major cities.' },
    ],
    created_at: '2025-01-15', updated_at: '2025-01-15'
  },
  {
    id: 'blog-002', title: 'Best Time to Visit Rajasthan: A Season-by-Season Guide', slug: 'best-time-visit-rajasthan',
    excerpt: 'Planning your Rajasthan trip? Here\'s everything you need to know about the best seasons and weather.',
    content: '## Overview\n\nRajasthan experiences extreme weather conditions throughout the year. Choosing the right time to visit can make or break your experience.\n\n## Winter (October - March) - Best Time\n\nThe ideal time to visit Rajasthan. Temperatures range from 5°C to 25°C, making sightseeing comfortable. This is peak tourist season.\n\n**Highlights:**\n- Pushkar Camel Fair (November)\n- Jaipur Literature Festival (January)\n- Desert Festival in Jaisalmer (February)\n- Perfect weather for desert safaris\n\n## Summer (April - June) - Budget Travel\n\nTemperatures soar to 45°C+. However, this is when you get the best deals on hotels and packages.\n\n## Monsoon (July - September) - Magical Landscapes\n\nThe landscape transforms into lush green. Rain brings relief from the heat.\n\n## Our Recommendation\n\nFor first-time visitors, October to March is ideal. For budget travelers, May-June offers great deals.',
    image_url: 'https://images.unsplash.com/photo-1670254812851-e59013163aee?w=800&q=80',
    image_alt: 'Best time to visit Rajasthan weather guide',
    title_alt: 'Rajasthan travel season guide',
    author: 'Rajasthan Tours', category: 'travel-tips', tags: ['Rajasthan', 'Weather', 'Travel Tips', 'Planning'],
    is_published: true,
    meta_title: 'Best Time to Visit Rajasthan 2025 - Season Guide | Rajasthan Tours',
    meta_description: 'Complete guide on the best time to visit Rajasthan. Season-by-season weather, festivals, and travel tips for 2025.',
    faqs: [
      { question: 'Is Rajasthan too hot in summer?', answer: 'Yes, temperatures can exceed 45°C. But hotels offer great discounts during this period.' },
    ],
    created_at: '2025-02-10', updated_at: '2025-02-10'
  },
  {
    id: 'blog-003', title: 'Rajasthani Cuisine: 15 Dishes You Must Try', slug: 'rajasthani-cuisine-must-try-dishes',
    excerpt: 'From Dal Baati Churma to Ghevar, explore the incredible flavors of Rajasthan\'s traditional cuisine.',
    content: '## The Flavors of Rajasthan\n\nRajasthani cuisine is as colorful as its culture. Born from the desert landscape, the food is rich, flavorful, and designed to last in the harsh climate.\n\n## Must-Try Dishes\n\n### 1. Dal Baati Churma\nThe quintessential Rajasthani dish.\n\n### 2. Laal Maas\nA fiery red meat curry made with mathania chilies.\n\n### 3. Ker Sangri\nA unique desert vegetable dish.\n\n### 4. Ghevar\nA disc-shaped sweet soaked in sugar syrup.\n\n### 5. Pyaaz Kachori\nCrispy onion-filled pastries from Jodhpur.',
    image_url: 'https://images.unsplash.com/photo-1637584498138-1f7122e48082?w=800&q=80',
    image_alt: 'Rajasthani traditional food dishes',
    title_alt: 'Must try Rajasthani cuisine',
    author: 'Rajasthan Tours', category: 'food', tags: ['Rajasthani Food', 'Cuisine', 'Culture', 'Foodie'],
    is_published: true,
    meta_title: 'Rajasthani Cuisine: 15 Must-Try Dishes | Food Guide',
    meta_description: 'Explore Rajasthan\'s famous cuisine including Dal Baati Churma, Laal Maas, Ghevar & more.',
    faqs: [
      { question: 'Is Rajasthani food spicy?', answer: 'Yes, many dishes are spicy but you can request milder versions at restaurants.' },
    ],
    created_at: '2025-03-05', updated_at: '2025-03-05'
  },
  {
    id: 'blog-004', title: 'Complete Guide to Desert Safari in Jaisalmer', slug: 'desert-safari-jaisalmer-guide',
    excerpt: 'Everything you need to know about experiencing a magical desert safari in the Thar Desert near Jaisalmer.',
    content: '## Why Jaisalmer Desert Safari?\n\nA desert safari in Jaisalmer is one of India\'s most iconic travel experiences.\n\n## Types of Safari\n\n### Camel Safari\nThe traditional way to explore the desert.\n\n### Jeep Safari\nFor those who prefer speed and comfort.\n\n## Best Locations\n\n### Sam Sand Dunes\nThe most popular destination.',
    image_url: 'https://images.unsplash.com/photo-1670687174580-c003b4716959?w=800&q=80',
    image_alt: 'Jaisalmer desert safari camel ride',
    title_alt: 'Desert safari guide Jaisalmer',
    author: 'Rajasthan Tours', category: 'adventure', tags: ['Desert Safari', 'Jaisalmer', 'Camping', 'Adventure'],
    is_published: true,
    meta_title: 'Complete Guide to Jaisalmer Desert Safari 2025 | Rajasthan Tours',
    meta_description: 'Plan your Jaisalmer desert safari with our complete guide.',
    faqs: [
      { question: 'How long is the camel safari?', answer: 'Typically 2-3 hours for a short safari, or overnight for the full experience.' },
    ],
    created_at: '2025-04-01', updated_at: '2025-04-01'
  },
  {
    id: 'blog-005', title: 'Heritage Hotels of Rajasthan: Where History Meets Luxury', slug: 'heritage-hotels-rajasthan',
    excerpt: 'Stay like royalty in converted palaces, forts, and havelis.',
    content: '## A Royal Night\'s Sleep\n\nRajasthan is home to some of India\'s finest heritage hotels.\n\n## Top Heritage Hotels\n\n### 1. Taj Lake Palace, Udaipur\nFloating on Lake Pichola.\n\n### 2. Umaid Bhawan Palace, Jodhpur\nOne of the world\'s largest private residences.\n\n### 3. Rambagh Palace, Jaipur\nFormer residence of the Maharaja.',
    image_url: 'https://images.unsplash.com/photo-1724382981275-f144e3a12cdb?w=800&q=80',
    image_alt: 'Heritage palace hotels in Rajasthan',
    title_alt: 'Best heritage hotels Rajasthan',
    author: 'Rajasthan Tours', category: 'luxury', tags: ['Heritage Hotels', 'Luxury', 'Palace Hotels'],
    is_published: true,
    meta_title: 'Best Heritage Hotels in Rajasthan 2025 | Palace & Fort Hotels',
    meta_description: 'Discover the best heritage hotels in Rajasthan.',
    faqs: [
      { question: 'Are heritage hotels expensive?', answer: 'Prices range from Rs 5,000 to Rs 50,000+ per night depending on the property.' },
    ],
    created_at: '2025-05-20', updated_at: '2025-05-20'
  }
];

export const STATIC_REVIEWS = [
  { id: 'rev-001', package_id: 'pkg-001', name: 'Rahul Sharma', rating: 5, comment: 'Absolutely magnificent tour! The Amber Fort was breathtaking and our guide was incredibly knowledgeable.', created_at: '2025-03-15' },
  { id: 'rev-002', package_id: 'pkg-002', name: 'Priya Mehta', rating: 5, comment: 'Udaipur is truly the Venice of East. The lake boat ride at sunset was the highlight of our honeymoon.', created_at: '2025-04-02' },
  { id: 'rev-003', package_id: 'pkg-003', name: 'James Wilson', rating: 5, comment: 'Sleeping under the stars in the desert was a once-in-a-lifetime experience. The cultural program was authentic.', created_at: '2025-02-20' },
  { id: 'rev-004', package_id: 'pkg-005', name: 'Anita Desai', rating: 5, comment: 'The Grand Circuit covered everything! 10 days flew by. Each city had its own charm.', created_at: '2025-05-10' },
  { id: 'rev-005', package_id: 'pkg-007', name: 'Vikram Singh', rating: 4, comment: 'We spotted two tigers on our safari! The resort was luxurious and the naturalist guide was passionate.', created_at: '2025-01-28' },
  { id: 'rev-006', package_id: 'pkg-004', name: 'Sarah Johnson', rating: 5, comment: 'Jodhpur\'s blue city walk was magical. The view from Mehrangarh Fort is something I will never forget.', created_at: '2025-04-18' }
];

export const HOMEPAGE_FAQS = [
  { question: 'What is the best time to visit Rajasthan?', answer: 'The best time to visit Rajasthan is from October to March when the weather is pleasant (10-25°C). This is peak tourist season with comfortable temperatures for sightseeing, desert safaris, and outdoor activities.' },
  { question: 'How do I book a tour package?', answer: 'You can book directly through our website by selecting a package and filling out the enquiry form, or call us at our helpline number. Our travel experts will customize the perfect itinerary for you.' },
  { question: 'Are your tour packages customizable?', answer: 'Absolutely! All our packages can be fully customized. You can add extra days, upgrade hotels, include special activities, or create an entirely new itinerary based on your preferences and budget.' },
  { question: 'What is included in the tour package price?', answer: 'Most packages include hotel accommodation, daily breakfast, air-conditioned transport, professional guide, monument entry tickets, and airport/station transfers. Specific inclusions vary by package.' },
  { question: 'Is Rajasthan safe for solo female travelers?', answer: 'Yes, Rajasthan is generally safe for solo female travelers. We recommend standard precautions. Our guided tours provide extra security and local knowledge. Many solo women have had wonderful experiences with us.' },
  { question: 'Do you offer group discounts?', answer: 'Yes! We offer attractive group discounts for parties of 5 or more. Contact us with your group size for a customized quote with the best rates.' },
  { question: 'What about food options for vegetarians?', answer: 'Rajasthan is a paradise for vegetarians! The state has a rich tradition of vegetarian cuisine including Dal Baati Churma, Gatte ki Sabzi, and more. All our partner hotels offer excellent vegetarian options.' },
  { question: 'Can I cancel or reschedule my booking?', answer: 'Free cancellation is available up to 7 days before travel. Rescheduling is free up to 14 days before travel. Check our cancellation policy for full details.' },
];

export const STATIC_DESTINATIONS = [
  {
    id: 'dest-jaipur',
    name: 'Jaipur',
    slug: 'jaipur',
    tagline: 'The Pink City',
    description: 'Jaipur, the vibrant capital of Rajasthan, is a mesmerizing blend of royal heritage and modern charm. Founded in 1727 by Maharaja Sawai Jai Singh II, the city gets its iconic name from the terracotta-pink hue of its old city buildings. From the majestic Amber Fort perched on a hilltop to the intricate lattice windows of Hawa Mahal, every corner of Jaipur tells a story of Rajput grandeur. The city is also a shopper\'s paradise, famous for block-printed textiles, precious gemstones, blue pottery, and traditional Rajasthani jewelry.',
    image_url: 'https://images.unsplash.com/photo-1670254812851-e59013163aee?w=1200&q=80',
    gallery: [],
    best_time_to_visit: 'October to March',
    best_time_details: 'The winter months offer pleasant weather with temperatures between 8°C and 25°C, ideal for sightseeing and outdoor activities. The city comes alive during festivals like Diwali, Teej, and the Jaipur Literature Festival (January).',
    how_to_reach: { air: 'Jaipur International Airport (JAI) — well connected to Delhi, Mumbai, Bangalore, Kolkata, and Hyderabad with daily flights.', rail: 'Jaipur Junction is a major railway hub with direct trains from Delhi (4-5 hrs), Mumbai (12 hrs), Agra (4 hrs), and all major Indian cities.', road: 'Excellent highway connectivity — NH48 from Delhi (280 km, 4-5 hrs), NH21 from Agra (240 km, 4 hrs).' },
    key_attractions: [
      { name: 'Amber Fort', description: 'A magnificent hilltop fort with stunning Rajput architecture, mirror work, and panoramic views of Maota Lake.' },
      { name: 'Hawa Mahal', description: 'The iconic Palace of Winds with 953 intricately carved windows, built for royal women to observe street life.' },
      { name: 'City Palace', description: 'A grand complex blending Rajput and Mughal architecture, still partially home to the royal family of Jaipur.' },
      { name: 'Jantar Mantar', description: 'UNESCO World Heritage astronomical observatory with the world\'s largest stone sundial.' },
      { name: 'Nahargarh Fort', description: 'A stunning sunset viewpoint overlooking the entire Pink City, perfect for photography.' },
      { name: 'Albert Hall Museum', description: 'Rajasthan\'s oldest museum housed in a beautiful Indo-Saracenic building with rich art and artifact collections.' }
    ],
    travel_tips: ['Dress modestly when visiting temples and religious sites.', 'Bargain at local bazaars — Johari Bazaar and Bapu Bazaar are must-visits.', 'Book elephant rides at Amber Fort in advance or opt for jeep rides.', 'Try authentic Rajasthani thali at LMB (Laxmi Mishthan Bhandar) or Chokhi Dhani village resort.', 'Carry sunscreen and stay hydrated, even during winter afternoons.'],
    faqs: [
      { question: 'How many days are enough for Jaipur?', answer: '2-3 days is ideal to cover the major attractions including Amber Fort, City Palace, Hawa Mahal, Jantar Mantar, and the local bazaars.' },
      { question: 'Is Jaipur safe for tourists?', answer: 'Yes, Jaipur is one of the safest cities in India for tourists. Standard travel precautions apply — avoid isolated areas late at night and keep valuables secure.' },
      { question: 'What is Jaipur famous for shopping?', answer: 'Jaipur is renowned for gemstones, silver jewelry, block-printed fabrics, blue pottery, lac bangles, leather goods (mojaris), and miniature paintings.' }
    ],
    meta_title: 'Jaipur Tourism - The Pink City of Rajasthan | Best Tours & Travel Guide',
    meta_description: 'Plan your Jaipur trip with our expert guide. Explore Amber Fort, Hawa Mahal, City Palace & more. Book curated Jaipur tour packages with best hotels & local guides.',
    display_order: 1,
    is_active: true,
  },
  {
    id: 'dest-udaipur',
    name: 'Udaipur',
    slug: 'udaipur',
    tagline: 'The City of Lakes',
    description: 'Udaipur, often called the Venice of the East, is Rajasthan\'s most romantic city. Nestled among the Aravalli hills, this enchanting destination is famous for its shimmering lakes, grand palaces, and artistic heritage. Lake Pichola, with the iconic Lake Palace floating in its center, creates one of India\'s most photographed scenes. The City Palace, one of the largest palace complexes in Rajasthan, offers breathtaking views and a deep dive into Mewar history. Udaipur is also known for its vibrant miniature painting tradition and traditional folk performances.',
    image_url: 'https://images.unsplash.com/photo-1601571574713-349e4e867fa6?w=1200&q=80',
    gallery: [],
    best_time_to_visit: 'September to March',
    best_time_details: 'The post-monsoon months (September-November) bring lush greenery and full lakes. Winters (November-February) offer ideal sightseeing weather at 10-25°C. The Mewar Festival and World Music Festival are major highlights.',
    how_to_reach: { air: 'Maharana Pratap Airport (UDR) — daily flights from Delhi, Mumbai, and Jaipur.', rail: 'Udaipur City Railway Station — well connected to Delhi (12 hrs), Jaipur (6 hrs), Ahmedabad (6 hrs), and Mumbai.', road: 'NH48 from Ahmedabad (260 km, 4 hrs), from Jaipur (400 km, 6 hrs via Ajmer).' },
    key_attractions: [
      { name: 'City Palace', description: 'A majestic complex of 11 palaces with stunning lake views, intricate mosaics, and the Crystal Gallery.' },
      { name: 'Lake Pichola', description: 'A scenic artificial lake with boat rides offering views of Jag Mandir and the Lake Palace.' },
      { name: 'Jagdish Temple', description: 'An elaborately carved Indo-Aryan temple from 1651, dedicated to Lord Vishnu.' },
      { name: 'Saheliyon Ki Bari', description: 'Garden of the Maidens — a beautiful garden with fountains, lotus pools, and marble elephants.' },
      { name: 'Monsoon Palace', description: 'A hilltop palace (Sajjangarh) offering panoramic sunset views over the city and lakes.' }
    ],
    travel_tips: ['Book a sunset boat ride on Lake Pichola in advance — it\'s the highlight of Udaipur.', 'Visit Ambrai Ghat for stunning evening views of the City Palace and Lake Palace.', 'Attend a traditional Rajasthani puppet show or folk dance performance.', 'Try the famous Udaipur thali and local sweets like malpua.', 'The old city is best explored on foot — wear comfortable walking shoes.'],
    faqs: [
      { question: 'Why is Udaipur called the City of Lakes?', answer: 'Udaipur has several beautiful lakes including Lake Pichola, Fateh Sagar Lake, Udai Sagar, and Jaisamand Lake, giving it this romantic nickname.' },
      { question: 'Is Udaipur good for couples?', answer: 'Absolutely! Udaipur is considered one of India\'s most romantic cities with luxury lake-facing hotels, sunset boat rides, and intimate dining options.' }
    ],
    meta_title: 'Udaipur Tourism - City of Lakes | Best Tours & Travel Guide',
    meta_description: 'Explore Udaipur\'s stunning lakes, grand palaces & romantic charm. Book curated Udaipur tour packages with lake-view hotels & expert local guides.',
    display_order: 2,
    is_active: true,
  },
  {
    id: 'dest-jaisalmer',
    name: 'Jaisalmer',
    slug: 'jaisalmer',
    tagline: 'The Golden City',
    description: 'Rising from the heart of the Thar Desert, Jaisalmer is a magical city of golden sandstone, ancient havelis, and endless sand dunes. The Jaisalmer Fort, one of the few living forts in the world, still houses shops, hotels, and residents within its towering walls. The city\'s intricate havelis — Patwon Ki Haveli, Salim Singh Ki Haveli, and Nathmal Ki Haveli — showcase extraordinary stone carving craftsmanship. But the real magic happens at the Sam and Khuri sand dunes, where camel safaris, overnight desert camping, and Rajasthani folk music create unforgettable experiences under star-filled skies.',
    image_url: 'https://images.unsplash.com/photo-1670687174580-c003b4716959?w=1200&q=80',
    gallery: [],
    best_time_to_visit: 'October to March',
    best_time_details: 'Winter months are perfect with daytime temperatures of 15-25°C. The Desert Festival (February) is a cultural extravaganza with camel races, folk music, and turban-tying competitions.',
    how_to_reach: { air: 'Jaisalmer Airport (JSA) — limited flights from Delhi and Jaipur; most visitors fly to Jodhpur and drive (5 hrs).', rail: 'Jaisalmer Railway Station — Palace on Wheels luxury train and regular trains from Delhi (18 hrs), Jaipur (12 hrs), and Jodhpur (5 hrs).', road: 'From Jodhpur (285 km, 5 hrs via NH15), from Jaipur (560 km, 8-9 hrs).' },
    key_attractions: [
      { name: 'Jaisalmer Fort (Sonar Quila)', description: 'A UNESCO World Heritage living fort with palaces, temples, shops, and havelis within its golden walls.' },
      { name: 'Sam Sand Dunes', description: 'The most popular desert experience — camel safaris, dune bashing, camping, and cultural evenings.' },
      { name: 'Patwon Ki Haveli', description: 'A cluster of five ornate mansions with the most intricate stone carving in Rajasthan.' },
      { name: 'Gadisar Lake', description: 'A serene artificial lake surrounded by temples and shrines, perfect for peaceful morning visits.' },
      { name: 'Kuldhara Ghost Village', description: 'An abandoned village from the 1800s with haunting ruins and fascinating folklore.' }
    ],
    travel_tips: ['Book a desert camp stay in advance during peak season (December-January).', 'Carry warm clothing for desert nights — temperatures can drop to 5°C.', 'Negotiate camel safari prices before starting, or book through your tour operator.', 'Visit the fort early morning to avoid crowds and get the best golden light for photos.', 'Try the local dal baati churma and ker sangri — desert cuisine staples.'],
    faqs: [
      { question: 'How do I reach the Sam Sand Dunes?', answer: 'Sam Sand Dunes are 42 km from Jaisalmer city (about 1 hour drive). Most tour operators include transfers. Desert camps provide pickup from the city.' },
      { question: 'Is the desert camping experience safe?', answer: 'Yes, established desert camps are safe and comfortable with proper tents, bedding, attached washrooms, and security. We partner only with vetted camps.' }
    ],
    meta_title: 'Jaisalmer Tourism - The Golden City | Desert Safari & Travel Guide',
    meta_description: 'Experience Jaisalmer\'s golden fort, desert safaris & starlit camping. Book curated Jaisalmer tour packages with desert camps & expert guides.',
    display_order: 3,
    is_active: true,
  },
  {
    id: 'dest-jodhpur',
    name: 'Jodhpur',
    slug: 'jodhpur',
    tagline: 'The Blue City',
    description: 'Jodhpur, the Blue City, is a feast for the senses. Dominated by the mighty Mehrangarh Fort towering 125 meters above the city, Jodhpur is where Rajasthan\'s warrior spirit meets artistic brilliance. The old city, painted in striking shades of blue, creates a mesmerizing labyrinth of narrow lanes, vibrant bazaars, and hidden temples. The city\'s rich Marwari culture is reflected in its spicy cuisine, ornate textiles, and the legendary hospitality of the Rathore clan. Jodhpur also serves as a gateway to the Thar Desert, with Osian and Khimsar offering desert experiences close to the city.',
    image_url: 'https://images.unsplash.com/photo-1685790582503-1b2762d95407?w=1200&q=80',
    gallery: [],
    best_time_to_visit: 'October to March',
    best_time_details: 'Pleasant winters make it perfect for fort explorations and walking tours. The Marwar Festival (October) and Rajasthan International Folk Festival (RIFF) at Mehrangarh are cultural highlights.',
    how_to_reach: { air: 'Jodhpur Airport (JDH) — daily flights from Delhi, Mumbai, Jaipur, and Udaipur.', rail: 'Jodhpur Junction — excellent connectivity with Delhi (10 hrs), Jaipur (5 hrs), and Jaisalmer (5 hrs).', road: 'Well connected via NH62 from Jaipur (340 km, 5 hrs) and NH15 from Jaisalmer (285 km, 5 hrs).' },
    key_attractions: [
      { name: 'Mehrangarh Fort', description: 'One of India\'s largest and most impressive forts with panoramic city views, museums, and zip-lining adventures.' },
      { name: 'Blue City Walk', description: 'Wander through the blue-painted lanes of the old city — a photographer\'s dream.' },
      { name: 'Umaid Bhawan Palace', description: 'An Art Deco masterpiece — part royal residence, part heritage hotel, part museum.' },
      { name: 'Clock Tower & Sardar Market', description: 'The bustling heart of old Jodhpur with spices, textiles, handicrafts, and street food.' },
      { name: 'Jaswant Thada', description: 'A serene marble cenotaph with beautiful carvings and peaceful lake views, known as the Taj Mahal of Marwar.' }
    ],
    travel_tips: ['Don\'t miss the zip-line experience at Mehrangarh Fort — Flying Fox offers stunning views.', 'The blue city lanes are best explored early morning with a local guide.', 'Try mirchi vada, pyaaz kachori, and makhania lassi — iconic Jodhpur street food.', 'Visit the Mehrangarh Fort museum — it\'s one of Rajasthan\'s best curated museums.', 'Sunset from Mehrangarh Fort is spectacular — plan your visit accordingly.'],
    faqs: [
      { question: 'Why is Jodhpur called the Blue City?', answer: 'The houses in the old city around Mehrangarh Fort are painted blue. Originally, this indicated Brahmin homes, but the tradition spread because the blue paint kept houses cool and repelled insects.' },
      { question: 'How far is the desert from Jodhpur?', answer: 'Osian (65 km, 1 hr) and Khimsar (95 km, 1.5 hrs) offer desert experiences close to Jodhpur. For the full Thar Desert experience, Jaisalmer is 285 km (5 hrs) away.' }
    ],
    meta_title: 'Jodhpur Tourism - The Blue City | Best Tours & Travel Guide',
    meta_description: 'Explore Jodhpur\'s magnificent Mehrangarh Fort, blue city lanes & royal heritage. Book curated Jodhpur tour packages with expert local guides.',
    display_order: 4,
    is_active: true,
  },
  {
    id: 'dest-pushkar',
    name: 'Pushkar',
    slug: 'pushkar',
    tagline: 'The Sacred City',
    description: 'Pushkar is one of the oldest cities in India and one of the five sacred dhams for Hindus. Centered around the holy Pushkar Lake, this spiritual town is home to the world\'s only Brahma Temple. But Pushkar is more than just a pilgrimage site — it\'s a vibrant mix of spirituality, bohemian café culture, and colorful traditions. The annual Pushkar Camel Fair (November) transforms this quiet town into one of Rajasthan\'s most spectacular events with camel trading, folk performances, and hot air balloon rides.',
    image_url: 'https://images.unsplash.com/photo-1637584498138-1f7122e48082?w=1200&q=80',
    gallery: [],
    best_time_to_visit: 'October to March',
    best_time_details: 'The Pushkar Camel Fair (October-November) is the prime time. Winters offer pleasant weather at 10-25°C. Holi celebrations in Pushkar are world-famous for the colorful festivities.',
    how_to_reach: { air: 'Nearest airport is Jaipur (145 km, 2.5 hrs) or Kishangarh Airport (50 km, 1 hr).', rail: 'Ajmer Junction (14 km, 30 min) is the nearest major railway station with trains from Delhi, Jaipur, and Mumbai.', road: 'From Jaipur (145 km, 2.5 hrs via NH48 + NH89), from Jodhpur (200 km, 3.5 hrs).' },
    key_attractions: [
      { name: 'Brahma Temple', description: 'The world\'s only dedicated temple to Lord Brahma — a must-visit spiritual landmark.' },
      { name: 'Pushkar Lake', description: 'Sacred lake surrounded by 52 ghats where pilgrims perform rituals and evening aarti ceremonies.' },
      { name: 'Savitri Temple', description: 'Hilltop temple reached by ropeway with stunning panoramic views of Pushkar and the desert.' },
      { name: 'Rose Garden', description: 'Pushkar is famous for its roses and rose products — visit a farm during blooming season.' }
    ],
    travel_tips: ['Remove shoes and leather items before approaching the ghats — it\'s a mark of respect.', 'Be mindful of flower offering scams at the lake — set a price before accepting.', 'Pushkar is vegetarian and alcohol-free within the old town — respect local customs.', 'The Savitri Temple ropeway offers the best sunrise views.', 'Stay at a rooftop café by the lake for sunset — Om Shiva Café is popular.'],
    faqs: [
      { question: 'When is the Pushkar Camel Fair?', answer: 'The Pushkar Camel Fair is held annually in October-November during the Kartik Purnima full moon. The exact dates change each year based on the Hindu calendar. Book accommodation months in advance.' },
      { question: 'Can non-Hindus visit Pushkar temples?', answer: 'Yes, Pushkar temples welcome visitors of all faiths. Just follow the dress code (cover shoulders and knees) and remove shoes before entering.' }
    ],
    meta_title: 'Pushkar Tourism - The Sacred City | Camel Fair & Travel Guide',
    meta_description: 'Discover Pushkar\'s spiritual heritage, sacred lake, Brahma Temple & famous Camel Fair. Book curated Pushkar tour packages with expert guides.',
    display_order: 5,
    is_active: true,
  },
  {
    id: 'dest-ranthambore',
    name: 'Ranthambore',
    slug: 'ranthambore',
    tagline: 'Tiger Country',
    description: 'Ranthambore National Park is one of India\'s premier tiger reserves and Rajasthan\'s wildest destination. Spread over 1,334 sq km, this former royal hunting ground of the Maharajas of Jaipur is now a haven for Bengal tigers, leopards, sloth bears, and over 300 species of birds. The ancient Ranthambore Fort, perched on a cliff within the park, adds a unique historical dimension to the wildlife experience. Morning and evening safari drives through the park\'s diverse terrain of dry deciduous forests, lakes, and grasslands offer thrilling encounters with India\'s national animal.',
    image_url: 'https://images.unsplash.com/photo-1715264500941-27bf30bf46eb?w=1200&q=80',
    gallery: [],
    best_time_to_visit: 'October to June',
    best_time_details: 'October to March is pleasant weather. April to June offers the best tiger sighting probability as animals gather around water sources. The park is closed during monsoon (July-September).',
    how_to_reach: { air: 'Nearest airport is Jaipur (180 km, 3 hrs).', rail: 'Sawai Madhopur Railway Station (11 km from park gate) is on the Delhi-Mumbai rail line with excellent connectivity.', road: 'From Jaipur (180 km, 3 hrs via NH52), from Delhi (420 km, 6 hrs).' },
    key_attractions: [
      { name: 'Tiger Safari', description: 'Canter and Gypsy safaris through 10 zones with excellent chances of spotting Bengal tigers in their natural habitat.' },
      { name: 'Ranthambore Fort', description: 'A 10th-century fort within the park — a UNESCO World Heritage Site with temples and panoramic views.' },
      { name: 'Padam Talao', description: 'The largest lake in the park, famous for lotus blooms and frequent tiger sightings at its banks.' },
      { name: 'Jogi Mahal', description: 'A hunting lodge beside Padam Talao with one of India\'s largest banyan trees.' }
    ],
    travel_tips: ['Book safari permits well in advance (available at 120 days before) — they sell out fast, especially for premium zones.', 'Morning safaris (6:00 AM) offer better wildlife activity than afternoon ones.', 'Wear earth-toned clothing (khaki, olive, brown) — avoid bright colors in the park.', 'Carry binoculars and a zoom lens for photography.', 'Stay at a resort near Zone 1-5 gates for the best safari access.'],
    faqs: [
      { question: 'What are the chances of seeing a tiger?', answer: 'Ranthambore has one of India\'s highest tiger densities. During peak season (April-June), there\'s a 60-70% chance of sighting in a single safari. Over two safaris, the odds increase significantly.' },
      { question: 'Which safari zones are best for tigers?', answer: 'Zones 1-5 are considered premium zones with the highest tiger sighting frequency. Zones 3, 4, and 5 around the lakes are particularly rewarding.' }
    ],
    meta_title: 'Ranthambore Tourism - Tiger Safari & Wildlife | Travel Guide',
    meta_description: 'Experience thrilling tiger safaris at Ranthambore National Park. Book curated wildlife tour packages with expert naturalists & best safari lodges.',
    display_order: 6,
    is_active: true,
  },
];

export const SETUP_SQL = `-- Rajasthan Tour Packages - Database Setup
-- Run this SQL in your Supabase SQL Editor

-- 1. Tour Packages Table
CREATE TABLE IF NOT EXISTS tour_packages (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  duration TEXT NOT NULL,
  price INTEGER NOT NULL,
  discounted_price INTEGER,
  location TEXT NOT NULL,
  image_url TEXT,
  highlights TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT '[]'::jsonb,
  inclusions TEXT[] DEFAULT '{}',
  exclusions TEXT[] DEFAULT '{}',
  category TEXT DEFAULT 'heritage',
  rating NUMERIC(2,1) DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 0,
  max_group_size INTEGER DEFAULT 15,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  meta_title TEXT,
  meta_description TEXT,
  price_table JSONB DEFAULT '[]'::jsonb,
  hotels JSONB DEFAULT '[]'::jsonb,
  tour_map_url TEXT,
  seo_content TEXT,
  faqs JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  image_alt TEXT,
  title_alt TEXT,
  author TEXT DEFAULT 'Rajasthan Tours',
  category TEXT DEFAULT 'travel-guide',
  tags TEXT[] DEFAULT '{}',
  faqs JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enquiries Table
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  package_title TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  travel_date DATE,
  num_travelers INTEGER DEFAULT 1,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Slug governance table (redirects + removed URLs)
CREATE TABLE IF NOT EXISTS slug_governance (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('package', 'blog')),
  source_slug TEXT NOT NULL,
  target_slug TEXT,
  status_code INTEGER NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308, 410)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resource_type, source_slug)
);

CREATE INDEX IF NOT EXISTS idx_slug_governance_lookup
  ON slug_governance (resource_type, source_slug);

-- 6. Enable RLS and create permissive policies
ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE slug_governance ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='tour_packages' AND policyname='public_all_tour_packages') THEN
    CREATE POLICY "public_all_tour_packages" ON tour_packages FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='blogs' AND policyname='public_all_blogs') THEN
    CREATE POLICY "public_all_blogs" ON blogs FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='enquiries' AND policyname='public_all_enquiries') THEN
    CREATE POLICY "public_all_enquiries" ON enquiries FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='reviews' AND policyname='public_all_reviews') THEN
    CREATE POLICY "public_all_reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='slug_governance' AND policyname='public_all_slug_governance') THEN
    CREATE POLICY "public_all_slug_governance" ON slug_governance FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- 7. Destinations Table
CREATE TABLE IF NOT EXISTS destinations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  image_url TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  best_time_to_visit TEXT,
  best_time_details TEXT,
  how_to_reach JSONB DEFAULT '{}'::jsonb,
  key_attractions JSONB DEFAULT '[]'::jsonb,
  travel_tips JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='destinations' AND policyname='public_all_destinations') THEN
    CREATE POLICY "public_all_destinations" ON destinations FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Done! Now go back to the admin panel and click "Seed Data".`;

export const ALTER_SQL = `-- Add new columns to tour_packages table
-- Run this SQL in your Supabase SQL Editor

ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS price_table JSONB DEFAULT '[]'::jsonb;
ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS hotels JSONB DEFAULT '[]'::jsonb;
ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS tour_map_url TEXT;
ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS seo_content TEXT;
ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;

-- Add new columns to blogs table
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS image_alt TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS title_alt TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS seo_content TEXT;

-- Slug governance table (redirects + removed URLs)
CREATE TABLE IF NOT EXISTS slug_governance (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('package', 'blog')),
  source_slug TEXT NOT NULL,
  target_slug TEXT,
  status_code INTEGER NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 307, 308, 410)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resource_type, source_slug)
);

CREATE INDEX IF NOT EXISTS idx_slug_governance_lookup
  ON slug_governance (resource_type, source_slug);

ALTER TABLE slug_governance ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'slug_governance'
      AND policyname = 'public_all_slug_governance'
  ) THEN
    CREATE POLICY "public_all_slug_governance"
      ON slug_governance FOR ALL
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  image_url TEXT,
  gallery JSONB DEFAULT '[]'::jsonb,
  best_time_to_visit TEXT,
  best_time_details TEXT,
  how_to_reach JSONB DEFAULT '{}'::jsonb,
  key_attractions JSONB DEFAULT '[]'::jsonb,
  travel_tips JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'destinations'
      AND policyname = 'public_all_destinations'
  ) THEN
    CREATE POLICY "public_all_destinations"
      ON destinations FOR ALL
      USING (true) WITH CHECK (true);
  END IF;
END $$;`;
