import { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

// ─── SEO Hook ─────────────────────────────────────────────────────────────────
// Dynamically injects <title>, meta tags, Open Graph, Twitter Card, and JSON-LD
// structured data. No external dependency needed.
const useSEO = ({ title, description, keywords, ogImage, canonical }) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (nameOrProp, content, useProperty = false) => {
      const attr = useProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, nameOrProp);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow");
    setMeta("author", "HavenRise Homes");
    setMeta("theme-color", "#1a1a1a");

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", ogImage, true);
    setMeta(
      "og:image:alt",
      "HavenRise Homes — Luxury Real Estate in Nairobi",
      true,
    );
    setMeta("og:type", "website", true);
    setMeta("og:locale", "en_KE", true);
    setMeta("og:site_name", "HavenRise Homes", true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Canonical
    let canonical_el = document.querySelector('link[rel="canonical"]');
    if (!canonical_el) {
      canonical_el = document.createElement("link");
      canonical_el.setAttribute("rel", "canonical");
      document.head.appendChild(canonical_el);
    }
    canonical_el.setAttribute("href", canonical);

    // JSON-LD — RealEstateAgent structured data
    let ldEl = document.getElementById("ld-havenrise-home");
    if (!ldEl) {
      ldEl = document.createElement("script");
      ldEl.id = "ld-havenrise-home";
      ldEl.type = "application/ld+json";
      document.head.appendChild(ldEl);
    }
    ldEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "HavenRise Homes",
      description,
      url: canonical,
      logo: "https://havenrise.co.ke/logo.png",
      image: ogImage,
      priceRange: "KES 8,750,000 – KES 42,000,000",
      areaServed: "Nairobi, Kenya",
      telephone: "+254700000000",
      email: "hello@havenrise.co.ke",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Westlands",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      openingHours: "Mo-Fr 08:00-18:00",
      sameAs: [
        "https://www.instagram.com/havenrisehomes",
        "https://www.facebook.com/havenrisehomes",
      ],
    });

    return () => {
      // Optional: remove injected tags on unmount (SPA cleanup)
      document.getElementById("ld-havenrise-home")?.remove();
    };
  }, [title, description, keywords, ogImage, canonical]);
};

// ─── Constants (defined outside component to avoid re-creation) ───────────────
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjbzqjn";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
    label: "Lavington Villa",
    cat: "Villa",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=700&q=80",
    label: "Kilimani Penthouse",
    cat: "Apartment",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80",
    label: "Westlands Loft",
    cat: "Apartment",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=700&q=80",
    label: "Runda Retreat",
    cat: "Villa",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80",
    label: "Karen Residence",
    cat: "House",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80",
    label: "Luxury Interior",
    cat: "Interior",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80",
    label: "Langata Home",
    cat: "House",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80",
    label: "Kileleshwa Bungalow",
    cat: "Bungalow",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80",
    label: "Waterfront Villa",
    cat: "Villa",
  },
];
const galHeights = [320, 240, 260, 300, 240, 280, 260, 300, 240];
const propFilters = ["All", "Villa", "Apartment", "House"];
const galTabs = ["All", "Villa", "Apartment", "House", "Interior", "Bungalow"];

const properties = [
  {
    id: 1,
    title: "Modern Waterfront Villa",
    location: "Lavington",
    price: "KSh 24,500,000",
    beds: 4,
    baths: 3,
    sqm: 320,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    tag: "For Sale",
    type: "villa",
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    location: "Westlands",
    price: "KSh 42,000,000",
    beds: 3,
    baths: 3,
    sqm: 280,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    tag: "Featured",
    type: "apartment",
  },
  {
    id: 3,
    title: "Suburban Family Home",
    location: "Kileleshwa",
    price: "KSh 8,750,000",
    beds: 5,
    baths: 4,
    sqm: 410,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    tag: "For Sale",
    type: "house",
  },
  {
    id: 4,
    title: "Contemporary Loft",
    location: "Kilimani",
    price: "KSh 11,500,000",
    beds: 2,
    baths: 2,
    sqm: 185,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    tag: "New",
    type: "apartment",
  },
  {
    id: 5,
    title: "Mountain Retreat",
    location: "Runda",
    price: "KSh 38,000,000",
    beds: 6,
    baths: 5,
    sqm: 540,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    tag: "Featured",
    type: "villa",
  },
  {
    id: 6,
    title: "Coastal Cottage",
    location: "Langata",
    price: "KSh 29,000,000",
    beds: 3,
    baths: 2,
    sqm: 240,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    tag: "For Sale",
    type: "house",
  },
];

const locations = [
  {
    name: "Westlands",
    count: 45,
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    tall: false,
  },
  {
    name: "Kilimani",
    count: 32,
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    tall: true,
  },
  {
    name: "Lavington",
    count: 28,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    tall: false,
  },
  {
    name: "Runda",
    count: 18,
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    tall: false,
  },
  {
    name: "Kileleshwa",
    count: 25,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    tall: false,
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    text: "HavenRise made finding our dream home effortless. Professional, responsive, and truly understanding of our needs from day one.",
  },
  {
    name: "James Omondi",
    role: "Property Investor",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    text: "Exceptional service from start to finish. The team's expertise and dedication exceeded every expectation I had.",
  },
  {
    name: "Amina Hassan",
    role: "Tenant",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    text: "Found the perfect property within our budget in record time. They handled everything seamlessly and professionally.",
  },
];

// ─── Arrow icon (memoised as constant) ────────────────────────────────────────
const ArrowRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─── Home Component ────────────────────────────────────────────────────────────
const Home = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [galleryTab, setGalleryTab] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  // ── SEO ──────────────────────────────────────────────────────────────────────
  useSEO({
    title: "HavenRise Homes | Luxury Real Estate in Nairobi, Kenya",
    description:
      "Nairobi's premier luxury real estate agency. Browse 500+ exclusive properties in Lavington, Westlands, Kilimani and more. Find your perfect home with HavenRise.",
    keywords:
      "luxury real estate Nairobi, properties for sale Nairobi, Westlands apartments, Lavington villas, Kilimani homes, Kenya real estate, HavenRise Homes",
    ogImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    canonical: "https://havenrise.co.ke",
  });

  // ── Performance: memoised derived state ──────────────────────────────────────
  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? properties
        : properties.filter((p) => p.type === activeFilter),
    [activeFilter],
  );

  const visibleGal = useMemo(
    () =>
      galleryTab === "All"
        ? galleryImages
        : galleryImages.filter((i) => i.cat === galleryTab),
    [galleryTab],
  );

  // ── Performance: stable callbacks ─────────────────────────────────────────────
  const handleFilterChange = useCallback(
    (f) => setActiveFilter(f.toLowerCase()),
    [],
  );
  const handleTabChange = useCallback((t) => setGalleryTab(t), []);
  const openLightbox = useCallback((img) => setLightbox(img), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const handleFormField = useCallback(
    (key, val) => setFormData((prev) => ({ ...prev, [key]: val })),
    [],
  );

  const handleRoleSelect = useCallback(
    (role) => setFormData((prev) => ({ ...prev, role })),
    [],
  );

  const handleForm = useCallback(
    async (e) => {
      e.preventDefault();
      setFormStatus("sending");
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setFormStatus("success");
          setFormData({
            role: "",
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          setFormStatus("error");
        }
      } catch {
        setFormStatus("error");
      }
    },
    [formData],
  );

  // ── Close lightbox on Escape key ─────────────────────────────────────────────
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox]);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#F9F7F4",
        color: "#1a1a1a",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Reset ────────────────────────── */
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }

        /* ── Typography ───────────────────── */
        .serif { font-family:'Cormorant Garamond', Georgia, serif; }

        /* ── Animations ───────────────────── */
        .fade-up { animation: fadeUp 0.8s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

        /* ── Property card ────────────────── */
        .prop-card:hover .prop-img { transform:scale(1.04); }
        .prop-img { transition:transform 0.6s ease; will-change:transform; }

        /* ── Underline link ───────────────── */
        .ulink { position:relative; display:inline-block; }
        .ulink::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:1px; background:#1a1a1a; transition:width 0.3s; }
        .ulink:hover::after { width:100%; }
        .ulink-gold::after { background:#8B7355; }

        /* ── Form focus ───────────────────── */
        input:focus, textarea:focus { outline:none; border-color:#8B7355 !important; }

        /* ── Gallery ──────────────────────── */
        .gal-item { cursor:zoom-in; overflow:hidden; position:relative; }
        .gal-img-el { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.6s ease; will-change:transform; }
        .gal-item:hover .gal-img-el { transform:scale(1.06); }
        .gal-ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 55%); opacity:0; transition:opacity 0.3s; display:flex; align-items:flex-end; padding:20px 22px; }
        .gal-item:hover .gal-ov { opacity:1; }

        /* ── Lightbox ─────────────────────── */
        .lbx { position:fixed; inset:0; background:rgba(0,0,0,0.94); z-index:1000; display:flex; align-items:center; justify-content:center; padding:24px; cursor:zoom-out; }

        /* ── Policy ───────────────────────── */
        .policy-row:not(:last-child) { border-bottom:1px solid rgba(255,255,255,0.07); }

        /* ── About image hover ─────────────── */
        .about-img-hover { transition:transform 0.6s ease; will-change:transform; }
        .about-img-wrap:hover .about-img-hover { transform:scale(1.03); }

        /* ── Location card hover (CSS only — no inline handlers) ── */
        .loc-card img { transition:transform 0.6s ease; will-change:transform; }
        .loc-card:hover img { transform:scale(1.05); }

        /* ══════════════════════════════════════════════════════════
           RESPONSIVE MEDIA QUERIES
           Breakpoints:
             xl  : ≤ 1200px
             lg  : ≤ 1024px
             md  : ≤  900px
             sm  : ≤  640px
             xs  : ≤  420px
        ══════════════════════════════════════════════════════════ */

        /* ── xl: 1200px ───────────────────── */
        @media (max-width:1200px) {
          .about-grid { gap:48px !important; }
        }

        /* ── lg: 1024px ───────────────────── */
        @media (max-width:1024px) {
          .about-grid { grid-template-columns:1fr !important; }
          .about-imgs { grid-template-columns:1fr 1fr !important; height:360px !important; }
          .about-imgs-tall { display:none !important; }
          .about-stat-card { left:0 !important; bottom:-24px !important; }
          .two-col { grid-template-columns:1fr !important; gap:48px !important; }
          .four-stat { grid-template-columns:1fr 1fr !important; }
          .loc-grid { grid-template-columns:1fr 1fr !important; grid-template-rows:auto !important; }
          .loc-grid .loc-card[data-tall] { grid-row:auto !important; }
          .pol-ben { grid-template-columns:1fr 1fr !important; }
          .about-vals { grid-template-columns:1fr 1fr !important; }
          .hero-title { font-size:clamp(44px,8vw,80px) !important; }
        }

        /* ── md: 900px ────────────────────── */
        @media (max-width:900px) {
          .hero-cta-row { flex-direction:column !important; align-items:flex-start !important; }
          .hero-cta-row a { width:100%; justify-content:center !important; }
          .prop-grid { grid-template-columns:1fr 1fr !important; }
          .about-grid { padding:40px 6vw 0 !important; }
          .about-right { margin-top:64px; }
          .contact-grid { grid-template-columns:1fr !important; gap:48px !important; }
          .newsletter-form { flex-direction:column !important; }
          .newsletter-form input { border-right:1px solid rgba(255,255,255,.15) !important; border-bottom:none; }
          .newsletter-form button { width:100%; }
          .stats-strip { flex-direction:column !important; gap:16px !important; }
          .marquee-inner { padding-left:4vw !important; }
        }

        /* ── sm: 640px ────────────────────── */
        @media (max-width:640px) {
          .gal-cols { columns:1 !important; }
          .four-stat { grid-template-columns:1fr 1fr !important; }
          .pol-ben { grid-template-columns:1fr !important; }
          .loc-grid { grid-template-columns:1fr !important; }
          .about-imgs { grid-template-columns:1fr !important; height:auto !important; }
          .about-vals { grid-template-columns:1fr !important; }
          .prop-grid { grid-template-columns:1fr !important; }
          .about-stat-card { position:static !important; margin-top:24px; width:100%; }
          .hero-scroll-hint { display:none !important; }
          .hero-subtitle { max-width:100% !important; font-size:15px !important; }
          .hero-pad { padding:0 5vw 60px !important; }
          .section-pad { padding:72px 5vw !important; }
          .hero-title { font-size:clamp(38px,12vw,64px) !important; }
          .marquee-inner { gap:40px !important; }
          .marquee-inner span { font-size:10px !important; }
          .pol-quote-row { flex-direction:column !important; align-items:flex-start !important; }
          .pol-quote-row a { margin-top:20px; width:100%; text-align:center; justify-content:center !important; }
          .filter-row { gap:6px !important; }
          .filter-row button { padding:7px 14px !important; font-size:11px !important; }
          .gallery-header { flex-direction:column !important; align-items:flex-start !important; gap:20px !important; }
          .props-header { flex-direction:column !important; align-items:flex-start !important; gap:20px !important; }
          .two-col { gap:32px !important; }
          .four-stat div { padding:40px 20px !important; border-right:none !important; border-bottom:1px solid #E8E4DF; }
          .lbx img { max-height:65vh !important; }
        }

        /* ── xs: 420px ────────────────────── */
        @media (max-width:420px) {
          .hero-title { font-size:clamp(34px,10vw,52px) !important; }
          .four-stat { grid-template-columns:1fr !important; }
          .gal-tabs-row { gap:4px !important; }
          .prop-stats { gap:14px !important; }
          .about-stat-nums { gap:16px !important; }
          .pol-fee-card { padding:28px 22px !important; }
          .pol-fee-card .serif { font-size:40px !important; }
        }

        /* ── Safe area (notched phones) ───── */
        @supports (padding: env(safe-area-inset-bottom)) {
          .hero-content { padding-bottom:calc(80px + env(safe-area-inset-bottom)); }
        }

        /* ── Reduced motion ───────────────── */
        @media (prefers-reduced-motion: reduce) {
          .fade-up { animation:none !important; }
          .prop-img, .gal-img-el, .about-img-hover, .loc-card img { transition:none !important; }
        }

        /* ── Print ────────────────────────── */
        @media print {
          .lbx, .marquee-bar, .newsletter-section { display:none !important; }
          body { background:#fff !important; color:#000 !important; }
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      {/* Semantic: <header> contains the primary branding/CTA */}
      <header
        style={{
          position: "relative",
          height: "100vh",
          minHeight: 600,
          overflow: "hidden",
        }}
      >
        {/*
          Performance:
          - fetchpriority="high" tells browser to prioritise this above-the-fold image
          - decoding="sync" avoids layout paint flash on first render
          - No loading="lazy" on hero — it must load immediately
        */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Lavington villa aerial view — HavenRise Homes hero property"
          fetchpriority="high"
          decoding="sync"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom,rgba(10,8,6,.55) 0%,rgba(10,8,6,.45) 60%,rgba(10,8,6,.72) 100%)",
          }}
          aria-hidden="true"
        />

        <div
          className="hero-content hero-pad"
          style={{
            position: "relative",
            zIndex: 10,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 6vw 80px",
          }}
        >
          <p
            className="fade-up serif"
            style={{
              color: "rgba(255,255,255,.65)",
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
              animationDelay: ".1s",
            }}
          >
            Nairobi's Premier Real Estate
          </p>
          {/* SEO: single H1 per page */}
          <h1
            className="fade-up serif hero-title"
            style={{
              fontSize: "clamp(52px,9vw,110px)",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 0.95,
              letterSpacing: "-.02em",
              animationDelay: ".2s",
            }}
          >
            HavenRise
            <br />
            <em>Homes</em>
          </h1>
          <p
            className="fade-up hero-subtitle"
            style={{
              marginTop: 28,
              fontSize: 16,
              color: "rgba(255,255,255,.6)",
              maxWidth: 420,
              lineHeight: 1.6,
              fontWeight: 300,
              animationDelay: ".35s",
            }}
          >
            Extraordinary properties in Kenya's most exclusive neighbourhoods —
            curated for those who expect the finest.
          </p>
          <div
            className="fade-up hero-cta-row"
            style={{
              marginTop: 44,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              animationDelay: ".5s",
            }}
          >
            <Link
              to="/properties"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#fff",
                color: "#1a1a1a",
                padding: "14px 32px",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Browse Properties <ArrowRight />
            </Link>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "transparent",
                color: "#fff",
                padding: "14px 32px",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,.35)",
                textDecoration: "none",
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div
          className="hero-scroll-hint"
          style={{
            position: "absolute",
            bottom: 36,
            right: "6vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            zIndex: 10,
          }}
          aria-hidden="true"
        >
          <p
            style={{
              color: "rgba(255,255,255,.4)",
              fontSize: 10,
              letterSpacing: ".25em",
              textTransform: "uppercase",
              writingMode: "vertical-lr",
            }}
          >
            Scroll
          </p>
          <div
            style={{
              width: 1,
              height: 48,
              background: "rgba(255,255,255,.25)",
            }}
          />
        </div>
      </header>

      {/* ══ MARQUEE ═══════════════════════════════════════════════════════════ */}
      <div
        className="marquee-bar"
        style={{
          background: "#1a1a1a",
          padding: "20px 0",
          borderBottom: "1px solid #2a2a2a",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <div
          className="marquee-inner"
          style={{
            display: "flex",
            gap: 80,
            whiteSpace: "nowrap",
            paddingLeft: "6vw",
          }}
        >
          {[
            "500+ Properties Listed",
            "1,000+ Happy Clients",
            "15 Years of Excellence",
            "98% Client Satisfaction",
            "Nairobi's #1 Agency",
          ].map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: 12,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.45)",
              }}
            >
              <span style={{ color: "#8B7355", marginRight: 16 }}>◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══ ABOUT ═════════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="about-heading"
        style={{ background: "#F9F7F4", overflow: "hidden" }}
      >
        <div
          className="section-pad"
          style={{ padding: "80px 6vw 0", maxWidth: 1400, margin: "0 auto" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 40,
            }}
          >
            <div
              style={{ width: 40, height: 1, background: "#8B7355" }}
              aria-hidden="true"
            />
            <p
              style={{
                fontSize: 10,
                letterSpacing: ".25em",
                textTransform: "uppercase",
                color: "#8B7355",
                fontWeight: 600,
              }}
            >
              About HavenRise
            </p>
          </div>
          <h2
            id="about-heading"
            className="serif"
            style={{
              fontSize: "clamp(44px,6vw,88px)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-.03em",
              maxWidth: 900,
            }}
          >
            Redefining
            <br />
            Luxury Living
            <br />
            <em style={{ color: "#8B7355" }}>in Nairobi</em>
          </h2>
        </div>

        <div
          className="about-grid section-pad"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            maxWidth: 1400,
            margin: "0 auto",
            padding: "60px 6vw 0",
          }}
        >
          {/* Left */}
          <div style={{ paddingRight: "6vw", paddingBottom: 80 }}>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.85,
                color: "#555",
                fontWeight: 300,
                marginBottom: 28,
                maxWidth: 520,
              }}
            >
              HavenRise Homes is Nairobi's premier real estate agency,
              specialising in luxury properties and bespoke real estate
              solutions. For over 15 years we've been the quiet force behind
              thousands of life-changing property transactions.
            </p>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.85,
                color: "#555",
                fontWeight: 300,
                marginBottom: 48,
                maxWidth: 520,
              }}
            >
              We don't just sell properties — we curate lifestyles. Every home
              we represent is a reflection of our commitment to exceptional
              quality, transparent dealings, and the belief that where you live
              shapes who you become.
            </p>
            <blockquote
              style={{
                borderLeft: "2px solid #8B7355",
                paddingLeft: 24,
                marginBottom: 48,
              }}
            >
              <p
                className="serif"
                style={{
                  fontSize: 22,
                  fontWeight: 300,
                  color: "#1a1a1a",
                  lineHeight: 1.55,
                  fontStyle: "italic",
                }}
              >
                "Your home is more than four walls — it's where your story
                unfolds."
              </p>
            </blockquote>
            <div
              className="about-vals"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                marginBottom: 52,
              }}
            >
              {[
                {
                  icon: "◈",
                  title: "Trust First",
                  desc: "Every relationship we build is grounded in transparency and integrity.",
                },
                {
                  icon: "◈",
                  title: "Curated Quality",
                  desc: "We handpick only properties that meet our exacting standards.",
                },
                {
                  icon: "◈",
                  title: "Client-Centred",
                  desc: "Your goals drive every decision our agents make on your behalf.",
                },
                {
                  icon: "◈",
                  title: "Deep Local Roots",
                  desc: "15+ years of Nairobi market knowledge, neighbourhood by neighbourhood.",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  style={{ background: "#F0EDE8", padding: "24px 22px" }}
                >
                  <span
                    style={{
                      color: "#8B7355",
                      fontSize: 13,
                      display: "block",
                      marginBottom: 10,
                    }}
                    aria-hidden="true"
                  >
                    {v.icon}
                  </span>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1a1a1a",
                      marginBottom: 8,
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#888",
                      lineHeight: 1.65,
                      fontWeight: 300,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
            <Link
              className="ulink ulink-gold"
              to="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontSize: 12,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#8B7355",
                textDecoration: "none",
              }}
            >
              Discover Our Full Story <ArrowRight />
            </Link>
          </div>

          {/* Right — images */}
          <div className="about-right" style={{ position: "relative" }}>
            <div
              className="about-imgs"
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 0.9fr",
                gridTemplateRows: "280px 220px",
                gap: 8,
                height: 516,
              }}
            >
              <div
                className="about-img-wrap"
                style={{ gridRow: "span 2", overflow: "hidden" }}
              >
                {/* loading="lazy" on all below-fold images */}
                <img
                  className="about-img-hover"
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Luxury interior of a HavenRise premium property"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div className="about-img-wrap" style={{ overflow: "hidden" }}>
                <img
                  className="about-img-hover"
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80"
                  alt="Kilimani penthouse property exterior"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div
                style={{
                  background: "#1a1a1a",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "24px 22px",
                }}
              >
                <p
                  className="serif"
                  style={{
                    fontSize: 36,
                    fontWeight: 300,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  500+
                </p>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "#8B7355",
                    marginTop: 6,
                    fontWeight: 600,
                  }}
                >
                  Properties Sold
                </p>
              </div>
            </div>
            <div
              className="about-stat-card"
              style={{
                position: "absolute",
                bottom: -36,
                left: -28,
                background: "#fff",
                padding: "28px 30px",
                border: "1px solid #E8E4DF",
                boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
                zIndex: 2,
              }}
            >
              <div
                className="about-stat-nums"
                style={{ display: "flex", gap: 28 }}
              >
                {[
                  ["15+", "Years"],
                  ["1K+", "Clients"],
                  ["98%", "Satisfaction"],
                ].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <p
                      className="serif"
                      style={{
                        fontSize: 32,
                        fontWeight: 300,
                        color: "#1a1a1a",
                        lineHeight: 1,
                      }}
                    >
                      {n}
                    </p>
                    <p
                      style={{
                        fontSize: 10,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        color: "#8B7355",
                        marginTop: 5,
                        fontWeight: 600,
                      }}
                    >
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: -16,
                right: -16,
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "1px solid #8B7355",
                opacity: 0.3,
              }}
              aria-hidden="true"
            />
            <div
              style={{
                position: "absolute",
                top: -8,
                right: -8,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#8B7355",
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Awards strip */}
        <div style={{ borderTop: "1px solid #E8E4DF", marginTop: 80 }}>
          <div
            className="stats-strip"
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              padding: "32px 6vw",
              display: "flex",
              alignItems: "center",
              gap: 48,
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: 11,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#aaa",
                fontWeight: 500,
              }}
            >
              Recognised &amp; Trusted
            </p>
            {[
              "Kenya Property Network",
              "Nairobi Real Estate Board",
              "Luxury Portfolio Intl.",
              "EARB Member 2024",
            ].map((award) => (
              <span
                key={award}
                style={{
                  fontSize: 12,
                  color: "#bbb",
                  fontWeight: 300,
                  letterSpacing: ".04em",
                  borderLeft: "1px solid #E8E4DF",
                  paddingLeft: 24,
                }}
              >
                {award}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROPERTIES ═══════════════════════════════════════════════ */}
      <section
        aria-labelledby="props-heading"
        className="section-pad"
        style={{ background: "#F0EDE8", padding: "100px 6vw" }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div
            className="props-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 60,
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#8B7355",
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                Our Collection
              </p>
              <h2
                id="props-heading"
                className="serif"
                style={{
                  fontSize: "clamp(34px,4vw,52px)",
                  fontWeight: 300,
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                }}
              >
                Featured Properties
              </h2>
            </div>
            <div
              className="filter-row"
              style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
              role="group"
              aria-label="Filter properties by type"
            >
              {propFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f)}
                  aria-pressed={activeFilter === f.toLowerCase()}
                  style={{
                    padding: "9px 22px",
                    fontSize: 12,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    cursor: "pointer",
                    border: "1px solid",
                    transition: "all .2s",
                    fontFamily: "inherit",
                    background:
                      activeFilter === f.toLowerCase()
                        ? "#1a1a1a"
                        : "transparent",
                    color: activeFilter === f.toLowerCase() ? "#fff" : "#555",
                    borderColor:
                      activeFilter === f.toLowerCase() ? "#1a1a1a" : "#ccc",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div
            className="prop-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
              gap: 24,
            }}
          >
            {filtered.map((p) => (
              <article
                key={p.id}
                className="prop-card"
                style={{ background: "#fff", overflow: "hidden" }}
              >
                <div
                  style={{
                    position: "relative",
                    height: 280,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.beds} bed property in ${p.location}, Nairobi`}
                    className="prop-img"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="560"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 20,
                      left: 20,
                      background: "#1a1a1a",
                      color: "#fff",
                      fontSize: 10,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      padding: "6px 14px",
                      fontWeight: 600,
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
                <div style={{ padding: "28px 28px 32px" }}>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      lineHeight: 1.3,
                      marginBottom: 8,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#8B7355",
                      letterSpacing: ".05em",
                      marginBottom: 20,
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    {/* Inline SVG kept; aria-hidden since text follows */}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {p.location}, Nairobi
                  </p>
                  <div
                    style={{
                      height: 1,
                      background: "#F0EDE8",
                      marginBottom: 20,
                    }}
                  />
                  <div
                    className="prop-stats"
                    style={{ display: "flex", gap: 24, marginBottom: 24 }}
                  >
                    {[
                      { v: p.beds, l: "Beds" },
                      { v: p.baths, l: "Baths" },
                      { v: p.sqm, l: "Sq m" },
                    ].map((s) => (
                      <div key={s.l}>
                        <p style={{ fontSize: 16, fontWeight: 600 }}>{s.v}</p>
                        <p
                          style={{ fontSize: 11, color: "#999", marginTop: 2 }}
                        >
                          {s.l}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      className="serif"
                      style={{ fontSize: 22, fontWeight: 400 }}
                    >
                      {p.price}
                    </p>
                    {/* FIX: template literal must be inside {} */}
                    <Link
                      to={`/property/${p.id}`}
                      className="ulink"
                      style={{
                        fontSize: 12,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        color: "#1a1a1a",
                        textDecoration: "none",
                      }}
                      aria-label={`View ${p.title} details`}
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 60 }}>
            <Link
              to="/properties"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "#1a1a1a",
                color: "#fff",
                padding: "16px 40px",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: ".15em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              View All Properties <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═══════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="gallery-heading"
        className="section-pad"
        style={{ padding: "100px 6vw", background: "#1a1a1a" }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div
            className="gallery-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 52,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "#8B7355",
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Our Portfolio
              </p>
              <h2
                id="gallery-heading"
                className="serif"
                style={{
                  fontSize: "clamp(32px,4vw,52px)",
                  fontWeight: 300,
                  color: "#fff",
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                }}
              >
                Property Gallery
              </h2>
            </div>
            <div
              className="gal-tabs-row"
              style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
              role="group"
              aria-label="Filter gallery by category"
            >
              {galTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  aria-pressed={galleryTab === tab}
                  style={{
                    padding: "8px 18px",
                    fontSize: 11,
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    cursor: "pointer",
                    border: "1px solid",
                    transition: "all .2s",
                    fontFamily: "inherit",
                    background: galleryTab === tab ? "#8B7355" : "transparent",
                    color: galleryTab === tab ? "#fff" : "rgba(255,255,255,.4)",
                    borderColor:
                      galleryTab === tab ? "#8B7355" : "rgba(255,255,255,.15)",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="gal-cols" style={{ columns: "3 260px", gap: 10 }}>
            {visibleGal.map((img, i) => (
              <div
                key={img.id}
                className="gal-item"
                onClick={() => openLightbox(img)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${img.label} in lightbox`}
                onKeyDown={(e) => e.key === "Enter" && openLightbox(img)}
                style={{
                  marginBottom: 10,
                  breakInside: "avoid",
                  height: galHeights[i % galHeights.length],
                }}
              >
                <img
                  src={img.src}
                  alt={`${img.label} — ${img.cat} property in Nairobi`}
                  className="gal-img-el"
                  loading="lazy"
                  decoding="async"
                  style={{ height: galHeights[i % galHeights.length] }}
                />
                <div className="gal-ov" aria-hidden="true">
                  <div>
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond,serif",
                        fontSize: 18,
                        fontWeight: 400,
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {img.label}
                    </p>
                    <p
                      style={{
                        fontSize: 10,
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "#8B7355",
                        marginTop: 5,
                      }}
                    >
                      {img.cat}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 52 }}>
            <Link
              to="/properties"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 38px",
                background: "transparent",
                color: "#fff",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,.2)",
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#8B7355")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,.2)")
              }
            >
              View All Properties <ArrowRight />
            </Link>
          </div>
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div
            className="lbx"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Lightbox: ${lightbox.label}`}
          >
            <div
              style={{ position: "relative", maxWidth: "90vw" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={`${lightbox.label} — full view`}
                style={{
                  maxWidth: "88vw",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond,serif",
                      fontSize: 20,
                      fontWeight: 400,
                      color: "#fff",
                    }}
                  >
                    {lightbox.label}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "#8B7355",
                      marginTop: 4,
                    }}
                  >
                    {lightbox.cat}
                  </p>
                </div>
                <button
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                  style={{
                    background: "none",
                    border: "1px solid rgba(255,255,255,.2)",
                    color: "#fff",
                    cursor: "pointer",
                    padding: "8px 20px",
                    fontSize: 11,
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    fontFamily: "inherit",
                  }}
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ══ LOCATIONS ════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="locations-heading"
        className="section-pad"
        style={{ padding: "100px 6vw", maxWidth: 1400, margin: "0 auto" }}
      >
        <div style={{ marginBottom: 60 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#8B7355",
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            Where We Operate
          </p>
          <h2
            id="locations-heading"
            className="serif"
            style={{
              fontSize: "clamp(34px,4vw,52px)",
              fontWeight: 300,
              letterSpacing: "-.02em",
            }}
          >
            Prime Nairobi Neighbourhoods
          </h2>
        </div>
        <div
          className="loc-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridTemplateRows: "repeat(2,260px)",
            gap: 12,
          }}
        >
          {locations.map((loc) => (
            <Link
              key={loc.name}
              to={`/properties?location=${loc.name.toLowerCase()}`}
              className="loc-card"
              data-tall={loc.tall || undefined}
              style={{
                position: "relative",
                overflow: "hidden",
                display: "block",
                textDecoration: "none",
                ...(loc.tall ? { gridRow: "span 2" } : {}),
              }}
            >
              {/*
                Performance: loading="lazy" on all location images.
                CSS hover replaces inline onMouseEnter/Leave handlers,
                avoiding unnecessary re-renders.
              */}
              <img
                src={loc.img}
                alt={`${loc.name} neighbourhood — Nairobi real estate`}
                loading="lazy"
                decoding="async"
                width="800"
                height="520"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.1) 50%,transparent 100%)",
                }}
                aria-hidden="true"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "24px 28px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond,serif",
                    fontSize: loc.tall ? 32 : 24,
                    fontWeight: 400,
                    color: "#fff",
                    marginBottom: 4,
                  }}
                >
                  {loc.name}
                </h3>
                <p
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,.65)",
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                  }}
                >
                  {loc.count} Properties
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ FULL-BLEED QUOTE ══════════════════════════════════════════════════ */}
      <section
        style={{ position: "relative", height: 520, overflow: "hidden" }}
        aria-labelledby="quote-heading"
      >
        <img
          src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=80"
          alt="Luxury property interior — HavenRise commitment to quality"
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,8,6,.62)",
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 6vw",
          }}
        >
          <blockquote>
            <p
              style={{
                fontSize: 12,
                letterSpacing: ".25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.55)",
                marginBottom: 20,
              }}
            >
              Our Promise
            </p>
            <h2
              id="quote-heading"
              className="serif"
              style={{
                fontSize: "clamp(28px,5vw,60px)",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1.15,
                letterSpacing: "-.02em",
                maxWidth: 760,
              }}
            >
              "Every home we represent reflects our commitment to{" "}
              <em>exceptional quality</em>"
            </h2>
          </blockquote>
        </div>
      </section>

      {/* ══ VIEWING POLICY ════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="policy-heading"
        className="section-pad"
        style={{ background: "#111010", padding: "100px 6vw" }}
      >
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right,transparent,#8B7355,transparent)",
            marginBottom: 80,
          }}
          aria-hidden="true"
        />
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div
            className="two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "flex-start",
              marginBottom: 72,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "#8B7355",
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                HavenRise Realty
              </p>
              <h2
                id="policy-heading"
                className="serif"
                style={{
                  fontSize: "clamp(34px,4vw,56px)",
                  fontWeight: 300,
                  color: "#fff",
                  lineHeight: 1.05,
                  letterSpacing: "-.02em",
                  marginBottom: 28,
                }}
              >
                Our Viewing
                <br />
                <em>Policy</em>
              </h2>
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: "#8B7355",
                  marginBottom: 28,
                }}
                aria-hidden="true"
              />
              <blockquote>
                <p
                  className="serif"
                  style={{
                    fontSize: 20,
                    fontWeight: 300,
                    color: "rgba(255,255,255,.5)",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    maxWidth: 460,
                  }}
                >
                  "We value both our clients' time and property owners' privacy
                  — every viewing is a curated, purposeful experience."
                </p>
              </blockquote>
            </div>
            <div
              className="pol-fee-card"
              style={{
                background: "#1a1a1a",
                padding: "44px 40px",
                borderTop: "2px solid #8B7355",
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "#8B7355",
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                Commitment Fee
              </p>
              <p
                className="serif"
                style={{
                  fontSize: 52,
                  fontWeight: 300,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                KES 3,000
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,.3)",
                  margin: "6px 0",
                  fontWeight: 300,
                }}
              >
                — to —
              </p>
              <p
                className="serif"
                style={{
                  fontSize: 52,
                  fontWeight: 300,
                  color: "#fff",
                  lineHeight: 1,
                  marginBottom: 24,
                }}
              >
                5,000
              </p>
              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,.07)",
                  marginBottom: 20,
                }}
              />
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,.45)",
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}
              >
                Fully refundable or deductible from commission upon successful
                purchase. Fee varies by property value.
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: 10,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#8B7355",
              fontWeight: 600,
              marginBottom: 28,
            }}
          >
            Before Scheduling a Viewing
          </p>
          <div style={{ marginBottom: 64 }}>
            {[
              {
                n: "01",
                title: "Client Intake Form",
                desc: "A completed client intake form helps us understand your property needs, preferences, and lifestyle requirements so we can curate the most relevant viewings for you.",
              },
              {
                n: "02",
                title: "Budget &amp; Timeline Confirmation",
                desc: "Confirmation of your budget range and intended purchase or lease timeline allows our agents to prioritise the most suitable properties for your schedule.",
              },
              {
                n: "03",
                title: "Viewing Commitment Fee (KES 3,000 – 5,000)",
                desc: "Required prior to scheduling. Refundable or deductible from commission upon purchase — ensuring all parties engage seriously and respectfully.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="policy-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: 28,
                  padding: "32px 0",
                }}
              >
                <p
                  className="serif"
                  style={{
                    fontSize: 38,
                    fontWeight: 300,
                    color: "rgba(255,255,255,.1)",
                    lineHeight: 1,
                  }}
                  aria-hidden="true"
                >
                  {item.n}
                </p>
                <div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 10,
                    }}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,.45)",
                      lineHeight: 1.75,
                      fontWeight: 300,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: 10,
              letterSpacing: ".22em",
              textTransform: "uppercase",
              color: "#8B7355",
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            This Policy Ensures
          </p>
          <div
            className="pol-ben"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 12,
              marginBottom: 64,
            }}
          >
            {[
              {
                title: "Serious Buyer Engagement",
                desc: "Every viewing is attended by a financially ready, committed client.",
              },
              {
                title: "Structured Property Tours",
                desc: "Organised, guided viewings with full documentation prepared.",
              },
              {
                title: "Efficient Time Management",
                desc: "Respecting everyone's schedule through disciplined, planned appointments.",
              },
              {
                title: "Professional Seller Representation",
                desc: "Sellers confident their property is shown only to vetted buyers.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#1a1a1a",
                  padding: "28px 24px 32px",
                  borderTop: "1px solid rgba(139,115,85,.4)",
                }}
              >
                <span
                  style={{
                    color: "#8B7355",
                    fontSize: 14,
                    display: "block",
                    marginBottom: 14,
                  }}
                  aria-hidden="true"
                >
                  ✦
                </span>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: 10,
                    lineHeight: 1.35,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,.4)",
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className="pol-quote-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                flex: 1,
              }}
            >
              <div
                style={{
                  width: 2,
                  background: "#8B7355",
                  flexShrink: 0,
                  alignSelf: "stretch",
                  minHeight: 40,
                }}
                aria-hidden="true"
              />
              <blockquote>
                <p
                  className="serif"
                  style={{
                    fontSize: 19,
                    fontWeight: 300,
                    color: "rgba(255,255,255,.55)",
                    lineHeight: 1.65,
                    fontStyle: "italic",
                  }}
                >
                  "We appreciate your understanding as we maintain the highest
                  standards of service for all our clients." — The HavenRise
                  Team
                </p>
              </blockquote>
            </div>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 32px",
                background: "#8B7355",
                color: "#fff",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Book a Viewing →
            </a>
          </div>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="why-heading"
        className="section-pad"
        style={{ padding: "100px 6vw", maxWidth: 1400, margin: "0 auto" }}
      >
        <div style={{ marginBottom: 72 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#8B7355",
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            Why Choose Us
          </p>
          <h2
            id="why-heading"
            className="serif"
            style={{
              fontSize: "clamp(34px,4vw,52px)",
              fontWeight: 300,
              letterSpacing: "-.02em",
            }}
          >
            The HavenRise Difference
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 40,
          }}
        >
          {[
            {
              n: "01",
              title: "Verified Listings",
              desc: "Every property is thoroughly vetted and authenticated before listing.",
            },
            {
              n: "02",
              title: "24/7 Support",
              desc: "Round-the-clock assistance from our dedicated team of licensed professionals.",
            },
            {
              n: "03",
              title: "Transparent Pricing",
              desc: "Competitive, honest rates with zero hidden fees or surprise costs.",
            },
            {
              n: "04",
              title: "Seamless Process",
              desc: "Streamlined procedures to make your acquisition smooth and stress-free.",
            },
          ].map((f) => (
            <div
              key={f.n}
              style={{ borderTop: "1px solid #E8E4DF", paddingTop: 32 }}
            >
              <p
                className="serif"
                style={{
                  fontSize: 44,
                  fontWeight: 300,
                  color: "#E8E4DF",
                  lineHeight: 1,
                  marginBottom: 20,
                }}
                aria-hidden="true"
              >
                {f.n}
              </p>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#777",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="testimonials-heading"
        className="section-pad"
        style={{ background: "#1a1a1a", padding: "100px 6vw" }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 60 }}>
            <p
              style={{
                fontSize: 11,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#8B7355",
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              Client Stories
            </p>
            <h2
              id="testimonials-heading"
              className="serif"
              style={{
                fontSize: "clamp(34px,4vw,52px)",
                fontWeight: 300,
                color: "#fff",
                letterSpacing: "-.02em",
              }}
            >
              Trusted by Thousands
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {testimonials.map((t) => (
              <article
                key={t.name}
                style={{
                  background: "#242424",
                  padding: "36px",
                  borderTop: "2px solid #8B7355",
                }}
              >
                <div
                  style={{ display: "flex", gap: 4, marginBottom: 24 }}
                  aria-label="5 star rating"
                >
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{ color: "#8B7355", fontSize: 14 }}
                      aria-hidden="true"
                    >
                      ★
                    </span>
                  ))}
                </div>
                <blockquote>
                  <p
                    style={{
                      fontSize: 15,
                      color: "rgba(255,255,255,.7)",
                      lineHeight: 1.8,
                      fontWeight: 300,
                      marginBottom: 28,
                      fontStyle: "italic",
                    }}
                  >
                    "{t.text}"
                  </p>
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img
                    src={t.img}
                    alt={`Photo of ${t.name}`}
                    loading="lazy"
                    decoding="async"
                    width="44"
                    height="44"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>
                      {t.name}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#8B7355",
                        letterSpacing: ".05em",
                        marginTop: 2,
                      }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Company statistics"
        style={{ borderBottom: "1px solid #E8E4DF" }}
      >
        <dl
          className="four-stat"
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
          }}
        >
          {[
            ["500+", "Properties Listed"],
            ["1,000+", "Happy Clients"],
            ["15+", "Years Experience"],
            ["98%", "Satisfaction Rate"],
          ].map(([num, label]) => (
            <div
              key={label}
              style={{
                padding: "60px 40px",
                textAlign: "center",
                borderRight: "1px solid #E8E4DF",
              }}
            >
              <dd
                className="serif"
                style={{ fontSize: 52, fontWeight: 300, lineHeight: 1 }}
              >
                {num}
              </dd>
              <dt
                style={{
                  fontSize: 11,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "#8B7355",
                  marginTop: 10,
                  fontWeight: 600,
                }}
              >
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ══ CONTACT FORM ═════════════════════════════════════════════════════ */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="section-pad"
        style={{ background: "#F0EDE8", padding: "100px 6vw" }}
      >
        <div
          className="contact-grid two-col"
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#8B7355",
                marginBottom: 20,
                fontWeight: 600,
              }}
            >
              Let's Talk
            </p>
            <h2
              id="contact-heading"
              className="serif"
              style={{
                fontSize: "clamp(32px,4vw,48px)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-.02em",
                marginBottom: 24,
              }}
            >
              Find Your
              <br />
              <em>Perfect Home</em>
            </h2>
            <div
              style={{
                width: 40,
                height: 1,
                background: "#8B7355",
                marginBottom: 28,
              }}
              aria-hidden="true"
            />
            <p
              style={{
                fontSize: 14,
                color: "#666",
                lineHeight: 1.8,
                fontWeight: 300,
                marginBottom: 40,
              }}
            >
              Whether you're buying, renting, or listing — our expert team is
              ready to guide you.
            </p>
            <address
              style={{
                fontStyle: "normal",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {[
                {
                  label: "Phone",
                  val: "+254 700 000 000",
                  href: "tel:+254700000000",
                },
                {
                  label: "Email",
                  val: "hello@havenrise.co.ke",
                  href: "mailto:hello@havenrise.co.ke",
                },
                { label: "Office", val: "Westlands, Nairobi", href: null },
              ].map((c) => (
                <div
                  key={c.label}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        letterSpacing: ".15em",
                        textTransform: "uppercase",
                        color: "#8B7355",
                        fontWeight: 600,
                      }}
                    >
                      {c.label}
                    </p>
                    {c.href ? (
                      <a
                        href={c.href}
                        style={{
                          fontSize: 14,
                          marginTop: 3,
                          display: "block",
                          color: "#1a1a1a",
                          textDecoration: "none",
                        }}
                      >
                        {c.val}
                      </a>
                    ) : (
                      <p style={{ fontSize: 14, marginTop: 3 }}>{c.val}</p>
                    )}
                  </div>
                </div>
              ))}
            </address>
          </div>

          <div style={{ background: "#fff", padding: "48px 44px" }}>
            {formStatus === "success" ? (
              <div
                style={{ textAlign: "center", padding: "40px 0" }}
                role="alert"
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#f0fdf4",
                    border: "1px solid #86efac",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: 24,
                  }}
                  aria-hidden="true"
                >
                  ✓
                </div>
                <h3
                  className="serif"
                  style={{ fontSize: 28, fontWeight: 300, marginBottom: 12 }}
                >
                  Message Sent
                </h3>
                <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>
                  Thank you for reaching out. Our team will contact you within
                  24 hours.
                </p>
                <button
                  onClick={() => setFormStatus(null)}
                  style={{
                    marginTop: 28,
                    fontSize: 12,
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "#8B7355",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Send Another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleForm} noValidate>
                <fieldset
                  style={{ border: "none", marginBottom: 28, padding: 0 }}
                >
                  <legend
                    style={{
                      fontSize: 11,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      color: "#999",
                      marginBottom: 14,
                      fontWeight: 600,
                    }}
                  >
                    I am a
                  </legend>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                    }}
                  >
                    {["Buyer", "Tenant", "Agent", "Other"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleRoleSelect(role)}
                        aria-pressed={formData.role === role}
                        style={{
                          padding: "11px 8px",
                          fontSize: 12,
                          letterSpacing: ".1em",
                          textTransform: "uppercase",
                          fontWeight: 500,
                          cursor: "pointer",
                          border: "1px solid",
                          fontFamily: "inherit",
                          transition: "all .15s",
                          background:
                            formData.role === role ? "#1a1a1a" : "transparent",
                          color: formData.role === role ? "#fff" : "#999",
                          borderColor:
                            formData.role === role ? "#1a1a1a" : "#ddd",
                        }}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {[
                  {
                    key: "name",
                    label: "Full Name",
                    type: "text",
                    placeholder: "Jane Doe",
                    autoComplete: "name",
                  },
                  {
                    key: "email",
                    label: "Email Address",
                    type: "email",
                    placeholder: "jane@example.com",
                    autoComplete: "email",
                  },
                  {
                    key: "phone",
                    label: "Phone Number",
                    type: "tel",
                    placeholder: "+254 700 000 000",
                    autoComplete: "tel",
                  },
                ].map((f) => (
                  <div key={f.key} style={{ marginBottom: 20 }}>
                    <label
                      htmlFor={`contact-${f.key}`}
                      style={{
                        display: "block",
                        fontSize: 11,
                        letterSpacing: ".15em",
                        textTransform: "uppercase",
                        color: "#999",
                        marginBottom: 8,
                        fontWeight: 600,
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      id={`contact-${f.key}`}
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      value={formData[f.key]}
                      onChange={(e) => handleFormField(f.key, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "13px 16px",
                        fontSize: 14,
                        border: "1px solid #E8E4DF",
                        background: "#FAFAFA",
                        color: "#1a1a1a",
                        fontFamily: "inherit",
                        transition: "border-color .2s",
                      }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: 28 }}>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: "block",
                      fontSize: 11,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      color: "#999",
                      marginBottom: 8,
                      fontWeight: 600,
                    }}
                  >
                    Message{" "}
                    <span style={{ color: "#ccc", fontWeight: 400 }}>
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={3}
                    placeholder="Tell us what you're looking for..."
                    value={formData.message}
                    onChange={(e) => handleFormField("message", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "13px 16px",
                      fontSize: 14,
                      border: "1px solid #E8E4DF",
                      background: "#FAFAFA",
                      color: "#1a1a1a",
                      fontFamily: "inherit",
                      resize: "vertical",
                      transition: "border-color .2s",
                    }}
                  />
                </div>

                {formStatus === "error" && (
                  <p
                    role="alert"
                    style={{ fontSize: 13, color: "#c0392b", marginBottom: 16 }}
                  >
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending" || !formData.role}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: formData.role ? "#1a1a1a" : "#ccc",
                    color: "#fff",
                    fontSize: 12,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    border: "none",
                    cursor: formData.role ? "pointer" : "not-allowed",
                    fontFamily: "inherit",
                    transition: "background .2s",
                  }}
                >
                  {formStatus === "sending" ? "Sending…" : "Send Enquiry →"}
                </button>
                <p
                  style={{
                    fontSize: 11,
                    color: "#bbb",
                    marginTop: 14,
                    textAlign: "center",
                  }}
                >
                  We respond within 24 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ════════════════════════════════════════════════════════ */}
      <section
        className="newsletter-section section-pad"
        aria-labelledby="newsletter-heading"
        style={{
          position: "relative",
          padding: "100px 6vw",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80"
          alt="Luxury Nairobi home — newsletter background"
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,8,6,.84)",
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 640,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              color: "#8B7355",
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            Stay Updated
          </p>
          <h2
            id="newsletter-heading"
            className="serif"
            style={{
              fontSize: "clamp(32px,4vw,52px)",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-.02em",
              marginBottom: 16,
            }}
          >
            Exclusive Listings
            <br />
            <em>Delivered to You</em>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,.5)",
              marginBottom: 40,
              lineHeight: 1.7,
            }}
          >
            Join 10,000+ subscribers and be first to hear about new properties
            and market insights.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="newsletter-form"
            style={{ display: "flex", maxWidth: 480, margin: "0 auto" }}
          >
            <label
              htmlFor="newsletter-email"
              className="sr-only"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                overflow: "hidden",
                clip: "rect(0,0,0,0)",
              }}
            >
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              required
              autoComplete="email"
              style={{
                flex: 1,
                padding: "15px 20px",
                fontSize: 14,
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                borderRight: "none",
                color: "#fff",
                fontFamily: "inherit",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "15px 28px",
                background: "#8B7355",
                color: "#fff",
                fontSize: 12,
                letterSpacing: ".15em",
                textTransform: "uppercase",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </form>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,.3)",
              marginTop: 16,
            }}
          >
            Unsubscribe at any time. No spam.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
