# Rajasthan Tours - SEO Tour Packages Website

A fully functional, SEO-optimized tour packages website built with Next.js and Supabase.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React

## 📁 Project Structure

```
/app
├── app/
│   ├── admin/                    # Admin Panel
│   │   ├── page.js              # Dashboard with stats
│   │   ├── packages/page.js     # Tour packages CRUD
│   │   ├── blogs/page.js        # Blog posts CRUD (with rich editor)
│   │   ├── enquiries/page.js    # Customer enquiries management
│   │   ├── setup/page.js        # Database setup & SQL editor
│   │   └── layout.js            # Admin layout with sidebar
│   │
│   ├── tour-packages/            # Public tour pages
│   │   ├── page.js              # Tour listing with filters
│   │   └── [slug]/page.js       # Tour detail page
│   │
│   ├── blogs/                    # Public blog pages
│   │   ├── page.js              # Blog listing
│   │   └── [slug]/page.js       # Blog detail with FAQs
│   │
│   ├── about/page.js            # About us page
│   ├── contact/page.js          # Contact page with form
│   ├── page.js                  # Homepage
│   │
│   └── api/
│       ├── [[...path]]/route.js # Main API (packages, blogs, enquiries, reviews)
│       ├── sql/route.js         # SQL execution endpoint
│       └── setup-sql-exec/route.js # SQL function setup
│
├── components/
│   ├── ui/                      # shadcn components
│   └── EnquiryForm.js           # Reusable enquiry form
│
├── lib/
│   ├── supabase.js              # Supabase client setup
│   ├── supabase-sql-helper.js   # SQL helper functions
│   ├── data.js                  # Static data & SQL migrations
│   └── utils.js                 # Utility functions
│
└── .env                         # Environment variables
```

## 🔧 Environment Variables

Required in `.env`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App URL (set by platform)
NEXT_PUBLIC_BASE_URL=https://your-app.preview.emergentagent.com
```

## 🗄️ Database Setup

### Step 1: Create the `exec_sql` Function (ONE TIME)

Run this SQL in Supabase SQL Editor to enable SQL execution from the app:

```sql
CREATE OR REPLACE FUNCTION exec_sql(query text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  EXECUTE query;
  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$;

GRANT EXECUTE ON FUNCTION exec_sql(text) TO service_role;
```

### Step 2: Create Tables

After `exec_sql` is created, go to `/admin/setup` and use the SQL Editor to run the table creation SQL, or run manually:

```sql
-- Tour Packages Table
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

-- Blogs Table
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

-- Enquiries Table
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

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create permissive policies
CREATE POLICY "public_all_tour_packages" ON tour_packages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all_blogs" ON blogs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all_enquiries" ON enquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all_reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);
```

### Step 3: Seed Data

Go to `/admin/setup` and click "Seed Database" to populate with sample data.

## 📡 API Endpoints

### Tour Packages
- `GET /api/packages` - List all packages (supports `?category=`, `?featured=true`, `?search=`, `?limit=`)
- `GET /api/packages/{slug}` - Get single package with reviews
- `POST /api/packages` - Create package
- `PUT /api/packages/{id}` - Update package
- `DELETE /api/packages/{id}` - Delete package

### Blogs
- `GET /api/blogs` - List blogs (supports `?category=`, `?published=false`, `?limit=`)
- `GET /api/blogs/{slug}` - Get single blog
- `POST /api/blogs` - Create blog
- `PUT /api/blogs/{id}` - Update blog
- `DELETE /api/blogs/{id}` - Delete blog

### Enquiries
- `GET /api/enquiries` - List enquiries (supports `?status=`)
- `POST /api/enquiries` - Create enquiry
- `PUT /api/enquiries/{id}` - Update enquiry status
- `DELETE /api/enquiries/{id}` - Delete enquiry

### Reviews
- `GET /api/reviews` - List reviews (supports `?package_id=`)

### Utility
- `GET /api/health` - Database connection status
- `GET /api/setup-check` - Check table and column status
- `GET /api/setup-sql` - Get CREATE TABLE SQL
- `GET /api/alter-sql` - Get ALTER TABLE SQL for extended columns
- `POST /api/seed` - Seed database with sample data
- `POST /api/sql` - Execute SQL (requires `exec_sql` function)

## 🎨 Admin Panel Features

### Dashboard (`/admin`)
- Stats overview (packages, blogs, enquiries, reviews)
- Database connection status
- Recent enquiries preview
- Featured packages display
- Quick action links

### Tour Packages (`/admin/packages`)
- Full CRUD with tabbed form:
  - **Basic Info**: Title, slug, description, price, location, category
  - **Itinerary**: Day-by-day schedule builder
  - **Pricing & Hotels**: Price table matrix, hotel accommodations
  - **SEO & Map**: Meta tags, Google Maps embed, SEO content
  - **FAQs**: Question/answer pairs

### Blogs (`/admin/blogs`)
- Full CRUD with:
  - **Rich Text Editor**: Markdown toolbar (bold, italic, headings, lists, links)
  - **Media & SEO**: Image URL, alt text, title alt, meta tags
  - **FAQs**: Blog-specific FAQs
  - **Settings**: Author, category, tags, publish status

### Enquiries (`/admin/enquiries`)
- View all customer enquiries
- Filter by status (pending, contacted, confirmed, cancelled)
- Update status
- Delete enquiries

### Setup (`/admin/setup`)
- SQL Editor for database operations
- Table status checker
- Quick load buttons for migrations
- Database seeding

## 🌐 Public Pages

### Homepage (`/`)
- Hero section with CTA
- Popular destinations
- About us section
- Featured tour packages
- Adventure & Heritage package sections
- Testimonials/Reviews
- Latest blog posts
- FAQs
- SEO content section
- Contact/Enquiry form

### Tour Packages (`/tour-packages`)
- Filterable by category
- Searchable by destination/name
- Package cards with pricing

### Tour Detail (`/tour-packages/[slug]`)
- Hero with breadcrumbs
- Sticky navigation
- Sections: Overview, Highlights, Itinerary, Inclusions/Exclusions, Price Table, Hotels, Map, SEO Content, FAQs, Reviews
- Sidebar with pricing card and enquiry form
- Related packages

### Blog Listing (`/blogs`)
- Grid of blog cards
- Category badges

### Blog Detail (`/blogs/[slug]`)
- Hero image with meta
- Markdown content rendering
- FAQs section (if available)
- Tags
- Related posts

## 🔄 How Data Flows

1. **Admin creates content** → Saves to Supabase via API
2. **Public pages load** → Fetch from API (which queries Supabase)
3. **Visitors submit enquiry** → Saved to Supabase → Visible in admin
4. **Admin updates status** → Reflected immediately

## 🚧 To-Do / Future Enhancements

- [ ] Image upload functionality (currently URL-based)
- [ ] Dynamic SEO meta tags with Next.js metadata
- [ ] Reviews submission from public site
- [ ] Email notifications for enquiries
- [ ] Admin authentication
- [ ] Analytics dashboard
- [ ] Multi-language support

## 🏃 Running Locally

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build
```

## 📝 Notes

- All IDs use UUID-like format (`pkg-{timestamp}-{random}`) for easy identification
- Prices are stored in INR (Indian Rupees) as integers
- Images use external URLs (Unsplash recommended)
- Markdown is used for blog content and SEO content
- The `exec_sql` function enables running any SQL from the app (powerful but use carefully)

## 🔗 Important URLs

- **Live Site**: Your deployed URL
- **Admin Panel**: `/admin`
- **Supabase Dashboard**: `https://supabase.com/dashboard/project/YOUR_PROJECT_ID`
