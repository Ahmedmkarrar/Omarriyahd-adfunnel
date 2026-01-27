# Luxury Real Estate Sales Funnel

Ultra-high-converting sales funnel for 9805 Steelhead Rd, Paso Robles, CA 93446 - a $1,195,000 Mediterranean estate near Lake Nacimiento.

## Features

- **Landing Page**: Hero with video background support, property highlights, photo gallery, property details, location/lifestyle section, and final CTA
- **Multi-Step Qualification Form**: 3-step form with buyer qualification, lead scoring, and validation
- **Thank You Page**: Confetti animation, calendar booking embed, timeline, and agent introduction
- **Lead Scoring System**: Automatic scoring (Hot/Warm/Cold) based on buyer profile
- **Email Notifications**: Resend integration for instant lead notifications and buyer dossier delivery

## Tech Stack

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** + **Framer Motion** for animations
- **React Hook Form** + **Zod** for form handling and validation
- **Radix UI** for accessible components
- **Resend** for email notifications
- **Canvas Confetti** for celebration animations

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and add your API keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required for email notifications
RESEND_API_KEY=re_xxxxxxxxxxxx

# Optional: Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Add Property Photos

Add photos from the Redfin listing to `/public/photos/`:

- `hero-bg.jpg` - Hero background
- `exterior-front.jpg` - Front exterior
- `living-room.jpg` - Living room
- `kitchen.jpg` - Kitchen
- etc.

See `/public/photos/README.md` for full list.

### 4. Add Agent Photo

Add Omar's professional headshot to `/public/agent-photo.jpg`

### 5. Configure Calendar Booking

Replace the Calendly placeholder in `/src/app/thank-you/page.tsx` with your actual Calendly embed code:

```tsx
<div
  className="calendly-inline-widget"
  data-url="https://calendly.com/omar-revel/property-showing"
  style={{ minWidth: '320px', height: '700px' }}
/>
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/submit-lead/    # Lead submission API
│   ├── qualify/            # Multi-step form
│   ├── thank-you/          # Confirmation page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── landing/            # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── Highlights.tsx
│   │   ├── PhotoGallery.tsx
│   │   ├── PropertyDetails.tsx
│   │   ├── Location.tsx
│   │   └── FinalCTA.tsx
│   └── ui/                 # Reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── checkbox.tsx
│       ├── radio-group.tsx
│       ├── label.tsx
│       └── progress.tsx
└── lib/
    ├── property-data.ts    # Property information
    ├── form-schema.ts      # Form validation schemas
    └── utils.ts            # Utility functions & lead scoring
```

## Lead Scoring System

Leads are automatically scored based on:

| Factor | Points |
|--------|--------|
| **Timeline** | |
| Ready Now (0-30 days) | +5 |
| 1-3 Months | +3 |
| 3-6 Months | +1 |
| **Buyer Type** | |
| Primary/Vacation | +3 |
| Investment | +2 |
| **Budget** | |
| $1M-$1.5M | +5 |
| Under $1M | +2 |
| **Showing Interest** | +5 |

**Categories:**
- 🔥 **Hot Lead** (12+ points): Immediate follow-up
- 🟡 **Warm Lead** (6-11 points): Follow-up within 24 hours
- ❄️ **Cold Lead** (<6 points): Nurture sequence

## Customization

### Update Property Data

Edit `/src/lib/property-data.ts` to update:
- Property details (price, beds, baths, etc.)
- Property description
- Key features and highlights
- Agent information
- Photo gallery

### Update Email Templates

Email templates are in `/src/app/api/submit-lead/route.ts`:
- Agent notification email
- Buyer dossier email

### Update Styling

- Colors: Edit `tailwind.config.ts` (gold color palette)
- Global styles: Edit `src/app/globals.css`
- Component styles: Individual component files

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Push to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables

## Support

For questions about this funnel, contact:
- **Omar Riyad** - omar@revelrealestate.com
- **Phone** - 805.268.3615
