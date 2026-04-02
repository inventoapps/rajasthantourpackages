# Database Schema Quick Reference

## Supabase Project
- **Project ID**: bznhfwjfdnetrnnlpzyp
- **Region**: Check your Supabase dashboard

---

## Tables Overview

### 1. tour_packages
Main table for tour packages with all details.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key (format: `pkg-{timestamp}-{random}`) |
| title | TEXT | Package name |
| slug | TEXT | URL-friendly identifier (unique) |
| short_description | TEXT | Brief summary for cards |
| description | TEXT | Full description |
| duration | TEXT | e.g., "3 Days / 2 Nights" |
| price | INTEGER | Original price in INR |
| discounted_price | INTEGER | Sale price (nullable) |
| location | TEXT | Main destination |
| image_url | TEXT | Featured image URL |
| highlights | TEXT[] | Array of highlight strings |
| itinerary | JSONB | Array of {day, title, description} |
| inclusions | TEXT[] | What's included |
| exclusions | TEXT[] | What's not included |
| category | TEXT | heritage/adventure/luxury/wildlife/spiritual/premium |
| rating | NUMERIC(2,1) | Average rating (e.g., 4.5) |
| reviews_count | INTEGER | Number of reviews |
| max_group_size | INTEGER | Maximum travelers |
| is_featured | BOOLEAN | Show on homepage |
| is_active | BOOLEAN | Published status |
| meta_title | TEXT | SEO title |
| meta_description | TEXT | SEO description |
| **price_table** | JSONB | Array of {type, single, double, triple, child_with_bed, child_without_bed} |
| **hotels** | JSONB | Array of {city, name, category, nights} |
| **tour_map_url** | TEXT | Google Maps embed URL |
| **seo_content** | TEXT | Markdown SEO content |
| **faqs** | JSONB | Array of {question, answer} |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### 2. blogs
Blog posts with rich content support.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key (format: `blog-{timestamp}-{random}`) |
| title | TEXT | Post title |
| slug | TEXT | URL-friendly identifier (unique) |
| excerpt | TEXT | Short summary |
| content | TEXT | Full content (Markdown) |
| image_url | TEXT | Featured image URL |
| **image_alt** | TEXT | Image alt text for SEO |
| **title_alt** | TEXT | Alternative title for structured data |
| author | TEXT | Author name |
| category | TEXT | travel-guide/travel-tips/food/adventure/luxury/culture |
| tags | TEXT[] | Array of tag strings |
| **faqs** | JSONB | Array of {question, answer} |
| is_published | BOOLEAN | Published status |
| meta_title | TEXT | SEO title |
| meta_description | TEXT | SEO description |
| **seo_content** | TEXT | Rich text SEO content |
| created_at | TIMESTAMPTZ | Creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### 3. enquiries
Customer enquiries from contact forms.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key (format: `enq-{timestamp}-{random}`) |
| package_id | TEXT | Related package ID (nullable) |
| package_title | TEXT | Related package name |
| name | TEXT | Customer name |
| email | TEXT | Customer email |
| phone | TEXT | Phone number |
| travel_date | DATE | Planned travel date |
| num_travelers | INTEGER | Number of travelers |
| message | TEXT | Customer message |
| status | TEXT | pending/contacted/confirmed/cancelled |
| created_at | TIMESTAMPTZ | Submission timestamp |

### 4. reviews
Customer reviews for packages.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key (format: `rev-{timestamp}-{random}`) |
| package_id | TEXT | Related package ID |
| name | TEXT | Reviewer name |
| rating | INTEGER | 1-5 stars |
| comment | TEXT | Review text |
| created_at | TIMESTAMPTZ | Submission timestamp |

### 5. homepage_settings
Homepage content and SEO settings.

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT | Primary key (single row: 'homepage') |
| hero_image_url | TEXT | Hero section background image URL |
| hero_image_alt | TEXT | Hero image alt text for accessibility |
| hero_title | TEXT | Main hero title |
| hero_subtitle | TEXT | Hero subtitle/description |
| hero_button_text | TEXT | Primary button text |
| hero_secondary_button_text | TEXT | Secondary button text |
| seo_content | TEXT | Rich text SEO content for homepage |
| meta_title | TEXT | Page meta title |
| meta_description | TEXT | Page meta description |
| meta_keywords | TEXT | Page meta keywords (comma-separated) |
| updated_at | TIMESTAMPTZ | Last update timestamp |

---

## JSONB Field Structures

### itinerary (tour_packages)
```json
[
  {
    "day": 1,
    "title": "Arrival & City Welcome",
    "description": "Arrive in Jaipur and check into your heritage hotel..."
  }
]
```

### price_table (tour_packages)
```json
[
  {
    "type": "Standard (3 Star)",
    "single": 12999,
    "double": 10999,
    "triple": 9999,
    "child_with_bed": 7999,
    "child_without_bed": 4999
  }
]
```

### hotels (tour_packages)
```json
[
  {
    "city": "Jaipur",
    "name": "Hotel Royal Heritage Inn",
    "category": "3 Star",
    "nights": 2
  }
]
```

### faqs (tour_packages & blogs)
```json
[
  {
    "question": "What is the best time to visit?",
    "answer": "October to March is ideal..."
  }
]
```

---

## SQL to Add Extended Columns (if missing)

```sql
-- Tour packages extended columns
ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS price_table JSONB DEFAULT '[]'::jsonb;
ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS hotels JSONB DEFAULT '[]'::jsonb;
ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS tour_map_url TEXT;
ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS seo_content TEXT;
ALTER TABLE tour_packages ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;

-- Blog extended columns
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS image_alt TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS title_alt TEXT;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS seo_content TEXT;
```

---

## Useful Queries

### Get featured packages
```sql
SELECT * FROM tour_packages 
WHERE is_featured = true AND is_active = true 
ORDER BY rating DESC;
```

### Get published blogs
```sql
SELECT * FROM tour_packages 
WHERE is_published = true 
ORDER BY created_at DESC;
```

### Get pending enquiries
```sql
SELECT * FROM enquiries 
WHERE status = 'pending' 
ORDER BY created_at DESC;
```

### Check column existence
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'tour_packages';
```
