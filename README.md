# StreamVibe

A modern movie and TV show streaming platform built with React and powered by the [TMDB API](https://www.themoviedb.org/documentation/api). Browse trending content, explore genres, view detailed movie/show info, search titles, and leave reviews — all wrapped in a sleek dark-themed UI.

**Live Site:** [svibe.netlify.app](https://svibe.netlify.app)

---

## Features

- **Home Page** — Hero section with a dynamic poster grid background, genre categories, device compatibility showcase, and subscription plans.
- **Movies & Shows** — Toggle between Movies and TV Series to browse by genre, view "Top 10 in Genres", and see trending titles.
- **Movie Details** — Full detail view with backdrop, poster, cast, crew, genres, ratings, runtime, and similar recommendations (protected route — login required).
- **Search** — Animated search modal with debounced TMDB search and inline results with poster, year, and overview.
- **User Reviews** — Authenticated users can create, edit, and delete star-rated reviews on any movie or show.
- **Authentication** — Token-based auth (register/login/logout) via a Django REST backend with CSRF and CORS support.
- **Subscription Plans** — Pricing cards for Basic, Standard, and Premium tiers with monthly/yearly toggle and a feature comparison table.
- **Support Page** — Contact form with a poster-grid visual and a free trial CTA.
- **Fully Responsive** — Custom Tailwind breakpoints (`5s: 390px`, `6s: 490px`) for fine-grained mobile support, all the way up to `3xl: 2560px`.

---

## Tech Stack

| Layer         | Technology                                                                 |
|---------------|----------------------------------------------------------------------------|
| **Framework** | [React 18](https://react.dev/) with [Vite 5](https://vitejs.dev/)         |
| **Routing**   | [React Router v7](https://reactrouter.com/)                               |
| **Styling**   | [Tailwind CSS 3](https://tailwindcss.com/) + custom design tokens          |
| **UI Library**| [MUI v5](https://mui.com/) (icons & select components)                     |
| **Animation** | [Framer Motion](https://www.framer.com/motion/)                            |
| **HTTP**      | [Axios](https://axios-http.com/) + Fetch API                              |
| **API**       | [TMDB API v3](https://developer.themoviedb.org/docs)                       |
| **Backend**   | Django REST Framework (hosted on [Render](https://render.com/))            |
| **Font**      | [Manrope](https://fonts.google.com/specimen/Manrope) via Google Fonts     |
| **Deployment**| [Netlify](https://www.netlify.com/)                                        |

---

## Project Structure

```
StreamVibe/
├── components/           # Reusable UI components
│   ├── AuthContext.jsx       # Auth context provider (login/register/logout)
│   ├── AuthModal.jsx         # Login & registration modal
│   ├── Categories.jsx        # Genre category grid
│   ├── Devices.jsx           # Device compatibility section
│   ├── Footer.jsx            # Site footer with social links
│   ├── GridText.jsx          # Hero text with CTA button
│   ├── MovieDetailsModal.jsx # Quick-view movie detail modal
│   ├── Navbar.jsx            # Top navigation bar with search & auth
│   ├── Preview.jsx           # Movie preview carousel
│   ├── ProfileDropdown.jsx   # User profile dropdown
│   ├── ProtectedRoute.jsx    # Auth-gated route wrapper
│   ├── ReviewSection.jsx     # Movie review CRUD section
│   ├── Search.jsx            # Animated search modal
│   ├── SubPlan.jsx           # Subscription plan cards
│   ├── SubTable.jsx          # Feature comparison table
│   ├── Trending.jsx          # Trending titles section
│   ├── Trial.jsx             # Free trial CTA banner
│   ├── data.js               # Static data
│   ├── monthlyPricingData.js # Monthly pricing tier data
│   └── yearlyPricingData.js  # Yearly pricing tier data
├── public/               # Static assets (SVG icons, images)
├── services/
│   └── tmdb.js               # TMDB API service (search, details, similar)
├── src/
│   ├── assets/               # Bundled assets
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── MovieDetails.jsx      # Full movie/show detail page
│   │   ├── MoviesXShows.jsx      # Browse movies & series
│   │   ├── Subscriptions.jsx     # Pricing & plans page
│   │   └── Support.jsx           # Contact & support page
│   ├── App.jsx               # Root component with routes & data fetching
│   ├── App.css               # Global styles & Tailwind directives
│   ├── config.js             # API URLs & site config
│   └── main.jsx              # React DOM entry point
├── index.html            # HTML shell
├── tailwind.config.js    # Tailwind config with custom breakpoints & tokens
├── postcss.config.js     # PostCSS config
├── vite.config.js        # Vite config (base path: /static/)
├── settings.py           # Django backend settings reference
└── package.json          # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/staff2277/Capstone.git
cd Capstone/StreamVibe

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Opens the app at [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
npm run preview
```

The production bundle is output to `dist/`.

---

## Environment & Configuration

API keys and base URLs are configured in [`src/config.js`](src/config.js):

| Variable          | Purpose                         |
|-------------------|---------------------------------|
| `API_BASE_URL`    | Django REST backend URL         |
| `TMDB_API_KEY`    | TMDB v3 API key                 |
| `TMDB_BASE_URL`   | TMDB API base URL               |
| `SITE_URL`        | Auto-detected (Netlify or local)|

---

## Available Scripts

| Command            | Description                          |
|--------------------|--------------------------------------|
| `npm run dev`      | Start Vite dev server with HMR       |
| `npm run build`    | Build for production                 |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint on JS/JSX files           |

---

## Custom Tailwind Breakpoints

| Breakpoint | Width      | Use Case                    |
|------------|------------|-----------------------------|
| `5s`       | `390px`    | iPhone SE / small phones    |
| `6s`       | `490px`    | Mid-size phones             |
| `sm`       | `640px`    | Small tablets               |
| `md`       | `768px`    | Tablets                     |
| `lg`       | `1024px`   | Laptops                     |
| `xl`       | `1280px`   | Desktops                    |
| `2xl`      | `1536px`   | Large desktops              |
| `3xl`      | `2560px`   | Ultra-wide displays         |

---

## Backend

The authentication and review system is powered by a Django REST Framework backend hosted on [Render](https://streamvibe-backend-q0e9.onrender.com). Key apps:

- **`auth_app`** — User registration, login, logout, and token verification.
- **`reviews`** — Movie/show review CRUD with token authentication.

---

## Deployment

The frontend is deployed to **Netlify** at [svibe.netlify.app](https://svibe.netlify.app). Vite's `base` is set to `/static/` to align with the Django static file serving convention.

---

## License

This project is a capstone project for educational purposes.
