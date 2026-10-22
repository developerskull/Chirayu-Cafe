# 🍵 Chirayu Cafe — Website

> **Real Time To Celebrate** | चिरायु कॅफे — Mhasrul, Nashik

A production-ready, bilingual (English/Marathi) website for Chirayu Cafe, built with **Next.js 15 + TypeScript + Tailwind CSS + Framer Motion**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Run Locally

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## ✏️ How to Edit Content

### 1. Update Menu Items & Prices

Edit **`/data/menu.ts`** — this is the only file you need to change for menu updates.

```typescript
// Example: Change Vadapav price from 10 to 15
{ id: "snack-1", mr: "वडापाव", en: "Vadapav", price: 15, veg: true }

// Example: Add a new item to Snacks category
{ id: "snack-14", mr: "पाव भाजी", en: "Pav Bhaji", price: 60, veg: true }
```

**Each item has:**
- `id` — unique identifier (don't duplicate)
- `mr` — Marathi name
- `en` — English name
- `price` — price in ₹
- `veg` — always `true` for Chirayu Cafe
- `badge` — optional: `"Popular"`, `"Best Seller"`, `"New"`

### 2. Update Phone Numbers, Address & Hours

Edit **`/config/site.ts`**:

```typescript
phones: {
  reshma: { name: "Reshma Ghuge", number: "7030736393", ... },
  sachin: { name: "Sachin Ghuge", number: "8007316837", ... },
},
hours: [
  { day: "Monday – Friday", time: "9:00 AM – 10:00 PM" },  // ← Edit this
  ...
],
social: {
  instagram: "https://instagram.com/chirayucafe",  // ← Add your real URL
  facebook: "https://facebook.com/chirayucafe",
},
```

---

## 🖼️ How to Replace Images

### Logo
Replace `/public/logo.png` with the real logo (PNG with transparent background, ~500×500px).

### Gallery Photos
1. Add photos to `/public/images/gallery/`
2. Update the `galleryItems` array in `/components/Gallery.tsx`:
   ```typescript
   { id: 1, src: '/images/gallery/your-photo.jpg', alt: 'Description', category: 'Food' }
   ```

### OG Image (Social Preview)
Replace `/public/og-image.png` with a 1200×630px image for social media previews.

---

## 🗺️ Google Maps

To get the exact Google Maps embed URL for your location:
1. Go to [maps.google.com](https://maps.google.com)
2. Search for "Chirayu Cafe Mhasrul Nashik"
3. Click **Share** → **Embed a map** → Copy the `src` URL
4. Update `mapsEmbedUrl` in `/config/site.ts`

---

## 🌐 Deploy to Vercel (Free)

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"New Project"** → Import your GitHub repo
4. Click **Deploy** — done! 🎉

Your site will be live at `https://your-project-name.vercel.app`

**To connect a custom domain** (e.g., `chirayucafe.in`):
- In Vercel dashboard → Settings → Domains → Add domain

---

## 📋 What Needs to Be Done by the Client

| Item | Action Required |
|------|----------------|
| 🖼️ Logo | Replace `/public/logo.png` with real logo |
| 📸 Gallery Photos | Add real photos to `/public/images/gallery/` |
| 🕐 Opening Hours | Update in `/config/site.ts` |
| 📍 Google Maps | Get correct embed URL for `/config/site.ts` |
| 📱 Social Media | Add Instagram/Facebook URLs in `/config/site.ts` |
| ⭐ Reviews | Replace placeholder reviews in `/components/Testimonials.tsx` |
| 🌐 Domain | Connect real domain in Vercel |
| 🔗 Google My Business | Update Google Review link in `/components/Testimonials.tsx` |

---

## 🎨 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Google Fonts** (Poppins, Playfair Display, Noto Sans Devanagari)

---

## 📞 Support

For website changes, contact the developer. For cafe business: **Reshma – 70307 36393** | **Sachin – 80073 16837**
