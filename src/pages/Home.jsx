import { useState, useMemo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProperties } from "../data/propertyData";

// ─── SEO Hook ─────────────────────────────────────────────────────────────────
// JSON-LD is handled statically in index.html — do NOT inject it here.
// This hook only manages dynamic meta tags, canonical, and OG tags.
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

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1");
    setMeta("author", "HavenRise Realtors");
    setMeta("theme-color", "#1a1a1a");
    setMeta("geo.region", "KE-30");
    setMeta("geo.placename", "Nairobi, Kenya");
    setMeta("geo.position", "-1.2166;36.8342");
    setMeta("ICBM", "-1.2166, 36.8342");

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);
    setMeta("og:image:alt", "HavenRise Realtors — Luxury Real Estate in Nairobi", true);
    setMeta("og:type", "website", true);
    setMeta("og:locale", "en_KE", true);
    setMeta("og:site_name", "HavenRise Realtors", true);
    setMeta("og:url", canonical, true);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@havenriserealtors");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Canonical
    let canonEl = document.querySelector('link[rel="canonical"]');
    if (!canonEl) {
      canonEl = document.createElement("link");
      canonEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonEl);
    }
    canonEl.setAttribute("href", canonical);

    // ── JSON-LD is in index.html — removed from here to avoid duplicates ──
    return () => {};
  }, [title, description, keywords, ogImage, canonical]);
};

// ─── Constants ────────────────────────────────────────────────────────────────
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjbzqjn";
const SITE_URL = "https://www.havenriserealtors.com";
const INITIAL_SHOW = 6;

const galleryImages = [
  { id: 1,  src: "/pandora/WhatsApp Image 2026-03-03 at 6.30.20 PM.webp",                 label: "A-One Pandora",      cat: "Apartment" },
  { id: 2,  src: "/pandora/WhatsApp Image 2026-03-03 at 6.30.25 PM.webp",                 label: "A-One Pandora",      cat: "Apartment" },
  { id: 3,  src: "/panorama west residence/WhatsApp Image 2026-03-03 at 9.00.43 PM.webp", label: "Panorama West",      cat: "Apartment" },
  { id: 4,  src: "/panorama west residence/WhatsApp Image 2026-03-03 at 9.01.04 PM.webp", label: "Panorama West",      cat: "Apartment" },
  { id: 5,  src: "/Riverside/WhatsApp Image 2024-06-18 at 23.32.35.webp",                 label: "Balkis Riverside",   cat: "Apartment" },
  { id: 6,  src: "/Riverside/WhatsApp Image 2026-03-04 at 10.18.33 PM.webp",              label: "Balkis Riverside",   cat: "Apartment" },
  { id: 7,  src: "/Amethyst-springs/WhatsApp Image 2026-03-04 at 10.26.36 PM.webp",       label: "Amethyst Springs",   cat: "Apartment" },
  { id: 8,  src: "/Amethyst-springs/WhatsApp Image 2026-03-04 at 10.26.49 PM.webp",       label: "Amethyst Springs",   cat: "Apartment" },
  { id: 9,  src: "/Lesto/WhatsApp Image 2026-03-04 at 10.41.32 PM.webp",                  label: "Lesto Residences",   cat: "Apartment" },
  { id: 10, src: "/Lesto/WhatsApp Image 2026-03-04 at 10.41.42 PM.webp",                  label: "Lesto Residences",   cat: "Apartment" },
  { id: 11, src: "/Rentals/Runda-5bedroom/WhatsApp Image 2026-03-04 at 10.47.09 PM.webp", label: "Runda Residence",    cat: "House"     },
  { id: 12, src: "/Rentals/Runda-5bedroom/WhatsApp Image 2026-03-04 at 10.47.22 PM.webp", label: "Runda Residence",    cat: "House"     },
  { id: 15, src: "/Rentals/runda-kiambu/WhatsApp Image 2026-03-05 at 7.44.17 PM.webp",    label: "Runda Kiambu Home",  cat: "House"     },
  { id: 16, src: "/Rentals/runda-kiambu/WhatsApp Image 2026-03-05 at 7.44.31 PM.webp",    label: "Runda Kiambu Home",  cat: "House"     },
  { id: 17, src: "/7-bedroom-runda/WhatsApp Image 2026-03-05 at 7.51.21 PM.webp",         label: "Runda Acacia 7BR",   cat: "House"     },
];

const galHeights = [320, 240, 260, 300, 240, 280, 260, 300, 240, 260, 300, 240];
const propFilters = ["All", "For Sale", "For Rent"];
const galTabs = ["All", "Apartment", "House"];

const locationCards = [
  { name: "Westlands",    description: "Lesto Residences & Panorama West",  img: "/Lesto/WhatsApp Image 2026-03-04 at 10.41.32 PM.webp",               tall: false },
  { name: "Kilimani",     description: "Amethyst Springs & Luna Oak",        img: "/Amethyst-springs/WhatsApp Image 2026-03-04 at 10.26.36 PM.webp",    tall: true  },
  { name: "Lavington",    description: "A-One Pandora & Garden Villas",      img: "/pandora/WhatsApp Image 2026-03-03 at 6.30.20 PM.webp",              tall: false },
  { name: "Riverside",    description: "Balkis Residences",                  img: "/Riverside/WhatsApp Image 2024-06-18 at 23.32.35.webp",              tall: false },
  { name: "Runda",        description: "Premium Residences & Rentals",       img: "/7-bedroom-runda/WhatsApp Image 2026-03-05 at 7.51.21 PM.webp",      tall: false },
  { name: "Kiambu",       description: "Gated Family Homes",                 img: "/Rentals/runda-kiambu/WhatsApp Image 2026-03-05 at 7.44.17 PM.webp", tall: false },
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

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─── Home Component ────────────────────────────────────────────────────────────
const Home = () => {
  const featuredProperties = getFeaturedProperties();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAllProps, setShowAllProps] = useState(false);
  const [formData, setFormData] = useState({
    role: "", intent: "", bedrooms: "", priceMin: "", priceMax: "",
    name: "", email: "", phone: "", message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [galleryTab, setGalleryTab] = useState("All");
  const [lightbox, setLightbox]     = useState(null);

  useSEO({
    title: "HavenRise Realtors | Luxury Real Estate in Nairobi, Kenya",
    description:
      "Nairobi's premier luxury real estate agency. Browse exclusive off-plan and ready apartments, houses and land in Lavington, Westlands, Kilimani, Riverside, Runda and Kiambu. Starting from KES 6.9M.",
    keywords:
      "luxury real estate Nairobi, apartments for sale Nairobi, Westlands apartments, Lavington off-plan, Kilimani homes, Riverside apartments, houses for rent Runda, Kenya real estate agent, HavenRise Realtors, off-plan apartments Kenya",
    ogImage: `${SITE_URL}/pandora/WhatsApp%20Image%202026-03-03%20at%206.30.20%20PM.webp`,
    canonical: `${SITE_URL}/`,
  });

  const allFiltered = useMemo(() => {
    if (activeFilter === "all")      return featuredProperties;
    if (activeFilter === "for sale") return featuredProperties.filter(p => p.type === "for-sale");
    if (activeFilter === "for rent") return featuredProperties.filter(p => p.type === "for-rent");
    return featuredProperties;
  }, [activeFilter, featuredProperties]);

  const filtered = useMemo(
    () => showAllProps ? allFiltered : allFiltered.slice(0, INITIAL_SHOW),
    [allFiltered, showAllProps],
  );

  const hasMore = allFiltered.length > INITIAL_SHOW;

  const handleFilterChange = useCallback((f) => {
    setActiveFilter(f.toLowerCase());
    setShowAllProps(false);
  }, []);

  const visibleGal    = useMemo(
    () => galleryTab === "All" ? galleryImages : galleryImages.filter(i => i.cat === galleryTab),
    [galleryTab],
  );
  const handleTabChange  = useCallback((t) => setGalleryTab(t), []);
  const openLightbox     = useCallback((img) => setLightbox(img), []);
  const closeLightbox    = useCallback(() => setLightbox(null), []);
  const handleFormField  = useCallback((key, val) => setFormData(prev => ({ ...prev, [key]: val })), []);
  const handleRoleSelect = useCallback((role) => setFormData(prev => ({ ...prev, role })), []);

  const handleForm = useCallback(async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormData({ role: "", intent: "", bedrooms: "", priceMin: "", priceMax: "", name: "", email: "", phone: "", message: "" });
      } else { setFormStatus("error"); }
    } catch { setFormStatus("error"); }
  }, [formData]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox]);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F9F7F4", color: "#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        .serif { font-family:'Cormorant Garamond', Georgia, serif; }
        .fade-up { animation: fadeUp 0.8s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .prop-card:hover .prop-img { transform:scale(1.04); }
        .prop-img { transition:transform 0.6s ease; will-change:transform; }
        .ulink { position:relative; display:inline-block; }
        .ulink::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:1px; background:#1a1a1a; transition:width 0.3s; }
        .ulink:hover::after { width:100%; }
        .ulink-gold::after { background:#8B7355; }
        input:focus, textarea:focus, select:focus { outline:none; border-color:#8B7355 !important; }
        .gal-item { cursor:zoom-in; overflow:hidden; position:relative; }
        .gal-img-el { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.6s ease; will-change:transform; }
        .gal-item:hover .gal-img-el { transform:scale(1.06); }
        .gal-ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 55%); opacity:0; transition:opacity 0.3s; display:flex; align-items:flex-end; padding:20px 22px; }
        .gal-item:hover .gal-ov { opacity:1; }
        .lbx { position:fixed; inset:0; background:rgba(0,0,0,0.94); z-index:1000; display:flex; align-items:center; justify-content:center; padding:24px; cursor:zoom-out; }
        .about-img-hover { transition:transform 0.6s ease; will-change:transform; }
        .about-img-wrap:hover .about-img-hover { transform:scale(1.03); }
        .loc-card img { transition:transform 0.6s ease; will-change:transform; }
        .loc-card:hover img { transform:scale(1.05); }
        .prop-card { animation: fadeUp 0.5s ease both; }
        @media (max-width:1024px) {
          .about-grid { grid-template-columns:1fr !important; }
          .about-imgs { grid-template-columns:1fr 1fr !important; height:360px !important; }
          .two-col { grid-template-columns:1fr !important; gap:48px !important; }
          .four-stat { grid-template-columns:1fr 1fr !important; }
          .loc-grid { grid-template-columns:1fr 1fr !important; grid-template-rows:auto !important; }
          .loc-grid .loc-card[data-tall] { grid-row:auto !important; }
          .about-vals { grid-template-columns:1fr 1fr !important; }
          .hero-title { font-size:clamp(44px,8vw,80px) !important; }
        }
        @media (max-width:900px) {
          .hero-cta-row { flex-direction:column !important; align-items:flex-start !important; }
          .hero-cta-row a { width:100%; justify-content:center !important; }
          .prop-grid { grid-template-columns:1fr 1fr !important; }
          .contact-grid { grid-template-columns:1fr !important; gap:48px !important; }
          .newsletter-form { flex-direction:column !important; }
          .newsletter-form input { border-right:1px solid rgba(255,255,255,.15) !important; border-bottom:none; }
          .newsletter-form button { width:100%; }
          .stats-strip { flex-direction:column !important; gap:16px !important; }
        }
        @media (max-width:640px) {
          .gal-cols { columns:1 !important; }
          .four-stat { grid-template-columns:1fr 1fr !important; }
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
          .filter-row { gap:6px !important; }
          .filter-row button { padding:7px 14px !important; font-size:11px !important; }
          .gallery-header { flex-direction:column !important; align-items:flex-start !important; gap:20px !important; }
          .props-header { flex-direction:column !important; align-items:flex-start !important; gap:20px !important; }
          .four-stat div { padding:40px 20px !important; border-right:none !important; border-bottom:1px solid #E8E4DF; }
          .lbx img { max-height:65vh !important; }
          .form-price-grid { grid-template-columns:1fr !important; }
        }
        @media (max-width:420px) {
          .hero-title { font-size:clamp(34px,10vw,52px) !important; }
          .four-stat { grid-template-columns:1fr !important; }
          .gal-tabs-row { gap:4px !important; }
          .prop-stats { gap:14px !important; }
          .about-stat-nums { gap:16px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fade-up, .prop-card { animation:none !important; }
          .prop-img, .gal-img-el, .about-img-hover, .loc-card img { transition:none !important; }
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <header style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
        <img
          src="/pandora/WhatsApp Image 2026-03-03 at 6.30.20 PM.webp"
          alt="A-One Pandora — Lavington luxury apartments for sale Nairobi"
          fetchpriority="high"
          decoding="sync"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(10,8,6,.55) 0%,rgba(10,8,6,.45) 60%,rgba(10,8,6,.72) 100%)" }} aria-hidden="true" />
        <div className="hero-content hero-pad" style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 6vw 80px" }}>
          <p className="fade-up serif" style={{ color: "rgba(255,255,255,.65)", fontSize: 14, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, animationDelay: ".1s" }}>
            Nairobi's Premier Real Estate
          </p>
          <h1 className="fade-up serif hero-title" style={{ fontSize: "clamp(52px,9vw,110px)", fontWeight: 300, color: "#fff", lineHeight: 0.95, letterSpacing: "-.02em", animationDelay: ".2s" }}>
            HavenRise<br /><em>Realtors</em>
          </h1>
          <p className="fade-up hero-subtitle" style={{ marginTop: 28, fontSize: 16, color: "rgba(255,255,255,.6)", maxWidth: 420, lineHeight: 1.6, fontWeight: 300, animationDelay: ".35s" }}>
            Extraordinary properties in Kenya's most exclusive neighbourhoods — curated for those who expect the finest.
          </p>
          <div className="fade-up hero-cta-row" style={{ marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap", animationDelay: ".5s" }}>
            <Link to="/properties" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fff", color: "#1a1a1a", padding: "14px 32px", fontSize: 13, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none" }}>
              Browse Properties <ArrowRight />
            </Link>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: "#fff", padding: "14px 32px", fontSize: 13, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,.35)", textDecoration: "none" }}>
              Get in Touch
            </a>
          </div>
        </div>
        <div className="hero-scroll-hint" style={{ position: "absolute", bottom: 36, right: "6vw", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 10 }} aria-hidden="true">
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", writingMode: "vertical-lr" }}>Scroll</p>
          <div style={{ width: 1, height: 48, background: "rgba(255,255,255,.25)" }} />
        </div>
      </header>

      {/* ══ MARQUEE ═══════════════════════════════════════════════════════════ */}
      <div className="marquee-bar" style={{ background: "#1a1a1a", padding: "20px 0", borderBottom: "1px solid #2a2a2a", overflow: "hidden" }} aria-hidden="true">
        <div style={{ display: "flex", gap: 80, whiteSpace: "nowrap", paddingLeft: "6vw" }}>
          {["59 Premium Listings", "6 Prime Locations", "Off-Plan & Ready Units", "Lavington · Westlands · Kilimani · Riverside · Runda · Kiambu", "Flexible Payment Plans Available"].map((item, i) => (
            <span key={i} style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}>
              <span style={{ color: "#8B7355", marginRight: 16 }}>◆</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* ══ ABOUT ═════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="about-heading" style={{ background: "#F9F7F4", overflow: "hidden" }}>
        <div className="section-pad" style={{ padding: "80px 6vw 0", maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
            <div style={{ width: 40, height: 1, background: "#8B7355" }} aria-hidden="true" />
            <p style={{ fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: "#8B7355", fontWeight: 600 }}>About HavenRise</p>
          </div>
          <h2 id="about-heading" className="serif" style={{ fontSize: "clamp(44px,6vw,88px)", fontWeight: 300, lineHeight: 0.95, letterSpacing: "-.03em", maxWidth: 900 }}>
            Redefining<br />Luxury Living<br /><em style={{ color: "#8B7355" }}>in Nairobi</em>
          </h2>
        </div>
        <div className="about-grid section-pad" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 1400, margin: "0 auto", padding: "60px 6vw 0" }}>
          <div style={{ paddingRight: "6vw", paddingBottom: 80 }}>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: "#555", fontWeight: 300, marginBottom: 28, maxWidth: 520 }}>
              HavenRise Realtors is Nairobi's premier real estate agency, specialising in luxury properties and bespoke real estate solutions. We represent a carefully curated portfolio of 59 off-plan and ready developments across Nairobi's most desirable neighbourhoods.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: "#555", fontWeight: 300, marginBottom: 48, maxWidth: 520 }}>
              From the iconic A-One Pandora in Lavington to Balkis Residences in Riverside, Amethyst Springs in Kilimani, OSTREA Karen Villas, and Luna Oak in Kilimani — we don't just sell properties, we curate lifestyles.
            </p>
            <blockquote style={{ borderLeft: "2px solid #8B7355", paddingLeft: 24, marginBottom: 48 }}>
              <p className="serif" style={{ fontSize: 22, fontWeight: 300, color: "#1a1a1a", lineHeight: 1.55, fontStyle: "italic" }}>
                "Your home is more than four walls — it's where your story unfolds."
              </p>
            </blockquote>
            <div className="about-vals" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, marginBottom: 52 }}>
              {[
                { icon: "◈", title: "Trust First",      desc: "Every relationship we build is grounded in transparency and integrity." },
                { icon: "◈", title: "Curated Quality",  desc: "We handpick only properties that meet our exacting standards." },
                { icon: "◈", title: "Client-Centred",   desc: "Your goals drive every decision our agents make on your behalf." },
                { icon: "◈", title: "Deep Local Roots", desc: "Intimate knowledge of Nairobi's premium neighbourhoods." },
              ].map(v => (
                <div key={v.title} style={{ background: "#F0EDE8", padding: "24px 22px" }}>
                  <span style={{ color: "#8B7355", fontSize: 13, display: "block", marginBottom: 10 }} aria-hidden="true">{v.icon}</span>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 }}>{v.title}</h3>
                  <p style={{ fontSize: 12, color: "#888", lineHeight: 1.65, fontWeight: 300 }}>{v.desc}</p>
                </div>
              ))}
            </div>
            <Link className="ulink ulink-gold" to="/about" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, color: "#8B7355", textDecoration: "none" }}>
              Discover Our Full Story <ArrowRight />
            </Link>
          </div>
          <div className="about-right" style={{ position: "relative" }}>
            <div className="about-imgs" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gridTemplateRows: "280px 220px", gap: 8, height: 516 }}>
              <div className="about-img-wrap" style={{ gridRow: "span 2", overflow: "hidden" }}>
                <img className="about-img-hover" src="/Amethyst-springs/WhatsApp Image 2026-03-04 at 10.26.36 PM.webp" alt="Amethyst Springs Kilimani luxury apartments" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div className="about-img-wrap" style={{ overflow: "hidden" }}>
                <img className="about-img-hover" src="/Riverside/WhatsApp Image 2026-03-04 at 10.18.33 PM.webp" alt="Balkis Residences Riverside Nairobi" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ background: "#1a1a1a", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px 22px" }}>
                <p className="serif" style={{ fontSize: 36, fontWeight: 300, color: "#fff", lineHeight: 1 }}>59+</p>
                <p style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "#8B7355", marginTop: 6, fontWeight: 600 }}>Active Listings</p>
              </div>
            </div>
            <div className="about-stat-card" style={{ position: "absolute", bottom: -36, left: -28, background: "#fff", padding: "28px 30px", border: "1px solid #E8E4DF", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", zIndex: 2 }}>
              <div className="about-stat-nums" style={{ display: "flex", gap: 28 }}>
                {[["8+", "Locations"], ["59+", "Listings"], ["8+", "Projects"]].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <p className="serif" style={{ fontSize: 32, fontWeight: 300, color: "#1a1a1a", lineHeight: 1 }}>{n}</p>
                    <p style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "#8B7355", marginTop: 5, fontWeight: 600 }}>{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "absolute", top: -16, right: -16, width: 48, height: 48, borderRadius: "50%", border: "1px solid #8B7355", opacity: 0.3 }} aria-hidden="true" />
            <div style={{ position: "absolute", top: -8, right: -8, width: 16, height: 16, borderRadius: "50%", background: "#8B7355" }} aria-hidden="true" />
          </div>
        </div>
        <div style={{ borderTop: "1px solid #E8E4DF", marginTop: 80 }}>
          <div className="stats-strip" style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 6vw", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", justifyContent: "space-between" }}>
            <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#aaa", fontWeight: 500 }}>Our Projects</p>
            {["A-One Pandora", "Panorama West", "Balkis Residences", "Amethyst Springs", "Lesto Residences", "Crystal Oak", "Luna Oak", "OSTREA Karen Villas"].map(p => (
              <span key={p} style={{ fontSize: 12, color: "#bbb", fontWeight: 300, letterSpacing: ".04em", borderLeft: "1px solid #E8E4DF", paddingLeft: 24 }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROPERTIES ═══════════════════════════════════════════════ */}
      <section aria-labelledby="props-heading" className="section-pad" style={{ background: "#F0EDE8", padding: "100px 6vw" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="props-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 32 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#8B7355", marginBottom: 16, fontWeight: 600 }}>Our Collection</p>
              <h2 id="props-heading" className="serif" style={{ fontSize: "clamp(34px,4vw,52px)", fontWeight: 300, letterSpacing: "-.02em", lineHeight: 1 }}>Featured Properties</h2>
            </div>
            <div className="filter-row" style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="group" aria-label="Filter properties by type">
              {propFilters.map(f => (
                <button key={f} onClick={() => handleFilterChange(f)} aria-pressed={activeFilter === f.toLowerCase()}
                  style={{ padding: "9px 22px", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", border: "1px solid", transition: "all .2s", fontFamily: "inherit", background: activeFilter === f.toLowerCase() ? "#1a1a1a" : "transparent", color: activeFilter === f.toLowerCase() ? "#fff" : "#555", borderColor: activeFilter === f.toLowerCase() ? "#1a1a1a" : "#ccc" }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="prop-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 24 }}>
            {filtered.map((p, idx) => (
              <article
                key={p.id}
                className="prop-card"
                style={{
                  background: "#fff",
                  overflow: "hidden",
                  animationDelay: showAllProps && idx >= INITIAL_SHOW ? `${(idx - INITIAL_SHOW) * 0.07}s` : "0s",
                }}
              >
                <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
                  <img src={p.image} alt={`${p.title} — ${p.beds ? p.beds + " bed " : ""}property in ${p.location}, Nairobi`} className="prop-img" loading="lazy" decoding="async" width="800" height="560" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <span style={{ position: "absolute", top: 20, left: 20, background: p.type === "for-rent" ? "#8B7355" : "#1a1a1a", color: "#fff", fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", padding: "6px 14px", fontWeight: 600 }}>
                    {p.type === "for-rent" ? "For Rent" : "For Sale"}
                  </span>
                  {p.earlyBirdDiscount && (
                    <span style={{ position: "absolute", top: 20, right: 20, background: "#8B7355", color: "#fff", fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", padding: "5px 10px", fontWeight: 600 }}>
                      Early Bird
                    </span>
                  )}
                </div>
                <div style={{ padding: "28px 28px 32px" }}>
                  <p style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#aaa", marginBottom: 6, fontWeight: 500 }}>{p.project || p.propertyType}</p>
                  <h3 style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.3, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: "#8B7355", letterSpacing: ".05em", marginBottom: 20, display: "flex", alignItems: "center", gap: 5 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    {p.location}, Nairobi
                  </p>
                  <div style={{ height: 1, background: "#F0EDE8", marginBottom: 20 }} />
                  <div className="prop-stats" style={{ display: "flex", gap: 24, marginBottom: 24 }}>
                    {[{ v: p.beds ?? "—", l: "Beds" }, { v: p.baths ?? "—", l: "Baths" }, { v: p.sqm ? `${p.sqm}` : "—", l: "Sq m" }].map(s => (
                      <div key={s.l}>
                        <p style={{ fontSize: 16, fontWeight: 600 }}>{s.v}</p>
                        <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{s.l}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p className="serif" style={{ fontSize: 20, fontWeight: 400 }}>{p.price}</p>
                    <Link to={`/property/${p.id}`} className="ulink" style={{ fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600, color: "#1a1a1a", textDecoration: "none" }} aria-label={`View ${p.title} details`}>
                      View →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 56, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            {hasMore && (
              <button
                onClick={() => setShowAllProps(v => !v)}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", color: "#1a1a1a", padding: "15px 40px", fontSize: 12, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", border: "1px solid #1a1a1a", cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1a1a1a"; }}
                aria-expanded={showAllProps}
              >
                {showAllProps ? `Show Less ↑` : `Show More (${allFiltered.length - INITIAL_SHOW} more)`}
              </button>
            )}
            <Link to="/properties" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#1a1a1a", color: "#fff", padding: "15px 40px", fontSize: 12, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", textDecoration: "none" }}>
              View All Properties <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═══════════════════════════════════════════════════════════ */}
      <section aria-labelledby="gallery-heading" className="section-pad" style={{ padding: "100px 6vw", background: "#1a1a1a" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div className="gallery-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 24 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "#8B7355", fontWeight: 600, marginBottom: 16 }}>Our Portfolio</p>
              <h2 id="gallery-heading" className="serif" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 300, color: "#fff", letterSpacing: "-.02em", lineHeight: 1 }}>Property Gallery</h2>
            </div>
            <div className="gal-tabs-row" style={{ display: "flex", gap: 6, flexWrap: "wrap" }} role="group" aria-label="Filter gallery by category">
              {galTabs.map(tab => (
                <button key={tab} onClick={() => handleTabChange(tab)} aria-pressed={galleryTab === tab}
                  style={{ padding: "8px 18px", fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", border: "1px solid", transition: "all .2s", fontFamily: "inherit", background: galleryTab === tab ? "#8B7355" : "transparent", color: galleryTab === tab ? "#fff" : "rgba(255,255,255,.4)", borderColor: galleryTab === tab ? "#8B7355" : "rgba(255,255,255,.15)" }}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="gal-cols" style={{ columns: "3 260px", gap: 10 }}>
            {visibleGal.map((img, i) => (
              <div key={img.id} className="gal-item" onClick={() => openLightbox(img)} role="button" tabIndex={0} aria-label={`Open ${img.label} in lightbox`} onKeyDown={e => e.key === "Enter" && openLightbox(img)} style={{ marginBottom: 10, breakInside: "avoid", height: galHeights[i % galHeights.length] }}>
                <img src={img.src} alt={`${img.label} — ${img.cat} property in Nairobi`} className="gal-img-el" loading="lazy" decoding="async" style={{ height: galHeights[i % galHeights.length] }} />
                <div className="gal-ov" aria-hidden="true">
                  <div>
                    <p style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 18, fontWeight: 400, color: "#fff", lineHeight: 1 }}>{img.label}</p>
                    <p style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "#8B7355", marginTop: 5 }}>{img.cat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 52 }}>
            <Link to="/properties" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 38px", background: "transparent", color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(255,255,255,.2)", transition: "border-color .2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#8B7355"} onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"}>
              View All Properties <ArrowRight />
            </Link>
          </div>
        </div>
        {lightbox && (
          <div className="lbx" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label={`Lightbox: ${lightbox.label}`}>
            <div style={{ position: "relative", maxWidth: "90vw" }} onClick={e => e.stopPropagation()}>
              <img src={lightbox.src} alt={`${lightbox.label} — full view`} style={{ maxWidth: "88vw", maxHeight: "80vh", objectFit: "contain", display: "block" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <p style={{ fontFamily: "Cormorant Garamond,serif", fontSize: 20, fontWeight: 400, color: "#fff" }}>{lightbox.label}</p>
                  <p style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "#8B7355", marginTop: 4 }}>{lightbox.cat}</p>
                </div>
                <button onClick={closeLightbox} aria-label="Close lightbox" style={{ background: "none", border: "1px solid rgba(255,255,255,.2)", color: "#fff", cursor: "pointer", padding: "8px 20px", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", fontFamily: "inherit" }}>
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ══ LOCATIONS ════════════════════════════════════════════════════════ */}
      <section aria-labelledby="locations-heading" className="section-pad" style={{ padding: "100px 6vw", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 60 }}>
          <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#8B7355", marginBottom: 16, fontWeight: 600 }}>Where We Operate</p>
          <h2 id="locations-heading" className="serif" style={{ fontSize: "clamp(34px,4vw,52px)", fontWeight: 300, letterSpacing: "-.02em" }}>Prime Nairobi Neighbourhoods</h2>
        </div>
        <div className="loc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gridTemplateRows: "auto", gap: 12 }}>
          {locationCards.map(loc => (
            <Link key={loc.name} to={`/properties?location=${encodeURIComponent(loc.name.toLowerCase())}`} className="loc-card" data-tall={loc.tall || undefined}
              style={{ position: "relative", overflow: "hidden", display: "block", textDecoration: "none", height: loc.tall ? 532 : 260, ...(loc.tall ? { gridRow: "span 2" } : {}) }}>
              <img src={loc.img} alt={`${loc.name} Nairobi — ${loc.description}`} loading="lazy" decoding="async" width="800" height="520" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.1) 50%,transparent 100%)" }} aria-hidden="true" />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
                <h3 style={{ fontFamily: "Cormorant Garamond,serif", fontSize: loc.tall ? 32 : 24, fontWeight: 400, color: "#fff", marginBottom: 4 }}>{loc.name}</h3>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,.65)", letterSpacing: ".1em", textTransform: "uppercase" }}>{loc.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ FULL-BLEED QUOTE ══════════════════════════════════════════════════ */}
      <section style={{ position: "relative", height: 520, overflow: "hidden" }} aria-labelledby="quote-heading">
        <img src="/Lesto/WhatsApp Image 2026-03-04 at 10.41.42 PM.webp" alt="Lesto Residences Westlands — luxury apartments Nairobi" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,6,.62)" }} aria-hidden="true" />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 6vw" }}>
          <blockquote>
            <p style={{ fontSize: 12, letterSpacing: ".25em", textTransform: "uppercase", color: "rgba(255,255,255,.55)", marginBottom: 20 }}>Our Promise</p>
            <h2 id="quote-heading" className="serif" style={{ fontSize: "clamp(28px,5vw,60px)", fontWeight: 300, color: "#fff", lineHeight: 1.15, letterSpacing: "-.02em", maxWidth: 760 }}>
              "Every home we represent reflects our commitment to <em>exceptional quality</em>"
            </h2>
          </blockquote>
        </div>
      </section>

      {/* ══ WHY US ════════════════════════════════════════════════════════════ */}
      <section aria-labelledby="why-heading" className="section-pad" style={{ padding: "100px 6vw", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 72 }}>
          <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#8B7355", marginBottom: 16, fontWeight: 600 }}>Why Choose Us</p>
          <h2 id="why-heading" className="serif" style={{ fontSize: "clamp(34px,4vw,52px)", fontWeight: 300, letterSpacing: "-.02em" }}>The HavenRise Difference</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 40 }}>
          {[
            { n: "01", title: "Verified Listings",     desc: "Every property is thoroughly vetted and authenticated before listing." },
            { n: "02", title: "24/7 Support",           desc: "Round-the-clock assistance from our dedicated team of licensed professionals." },
            { n: "03", title: "Transparent Pricing",    desc: "Competitive, honest rates with zero hidden fees or surprise costs." },
            { n: "04", title: "Flexible Payment Plans", desc: "From 20% down to flexible installments — options tailored to your budget." },
          ].map(f => (
            <div key={f.n} style={{ borderTop: "1px solid #E8E4DF", paddingTop: 32 }}>
              <p className="serif" style={{ fontSize: 44, fontWeight: 300, color: "#E8E4DF", lineHeight: 1, marginBottom: 20 }} aria-hidden="true">{f.n}</p>
              <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══════════════════════════════════════════════════════ */}
      <section aria-labelledby="testimonials-heading" className="section-pad" style={{ background: "#1a1a1a", padding: "100px 6vw" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ marginBottom: 60 }}>
            <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#8B7355", marginBottom: 16, fontWeight: 600 }}>Client Stories</p>
            <h2 id="testimonials-heading" className="serif" style={{ fontSize: "clamp(34px,4vw,52px)", fontWeight: 300, color: "#fff", letterSpacing: "-.02em" }}>Trusted by Clients</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {testimonials.map(t => (
              <article key={t.name} style={{ background: "#242424", padding: "36px", borderTop: "2px solid #8B7355" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 24 }} aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#8B7355", fontSize: 14 }} aria-hidden="true">★</span>)}
                </div>
                <blockquote>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", lineHeight: 1.8, fontWeight: 300, marginBottom: 28, fontStyle: "italic" }}>"{t.text}"</p>
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <img src={t.img} alt={`Photo of ${t.name}`} loading="lazy" decoding="async" width="44" height="44" style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: "#8B7355", letterSpacing: ".05em", marginTop: 2 }}>{t.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════════════ */}
      <section aria-label="Company statistics" style={{ borderBottom: "1px solid #E8E4DF" }}>
        <dl className="four-stat" style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {[["59+", "Active Listings"], ["8+", "Prime Locations"], ["8+", "Landmark Projects"]].map(([num, label]) => (
            <div key={label} style={{ padding: "60px 40px", textAlign: "center", borderRight: "1px solid #E8E4DF" }}>
              <dd className="serif" style={{ fontSize: 52, fontWeight: 300, lineHeight: 1 }}>{num}</dd>
              <dt style={{ fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "#8B7355", marginTop: 10, fontWeight: 600 }}>{label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ══ CONTACT FORM ═════════════════════════════════════════════════════ */}
      <section id="contact" aria-labelledby="contact-heading" className="section-pad" style={{ background: "#F0EDE8", padding: "100px 6vw" }}>
        <div className="contact-grid two-col" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#8B7355", marginBottom: 20, fontWeight: 600 }}>Let's Talk</p>
            <h2 id="contact-heading" className="serif" style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 24 }}>
              Find Your<br /><em>Perfect Home</em>
            </h2>
            <div style={{ width: 40, height: 1, background: "#8B7355", marginBottom: 28 }} aria-hidden="true" />
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, fontWeight: 300, marginBottom: 40 }}>
              Whether you're buying, renting, or investing — our expert team is ready to guide you to the right property.
            </p>
            <address style={{ fontStyle: "normal", display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Phone",  val: "+254728686089",                                  href: "tel:+254728686089" },
                { label: "Email",  val: "havenriserealtors@gmail.com",                    href: "mailto:havenriserealtors@gmail.com" },
                { label: "Office", val: "Ciata City Mall, Ridgeways, Block B, 2nd Floor", href: "https://www.google.com/maps/search/?api=1&query=Ciata+City+Mall+Ridgeways+Nairobi" },
              ].map(c => (
                <div key={c.label}>
                  <p style={{ fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "#8B7355", fontWeight: 600 }}>{c.label}</p>
                  <a href={c.href} style={{ fontSize: 14, marginTop: 3, display: "block", color: "#1a1a1a", textDecoration: "none" }}>{c.val}</a>
                </div>
              ))}
            </address>
          </div>
          <div style={{ background: "#fff", padding: "48px 44px" }}>
            {formStatus === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }} role="alert">
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#f0fdf4", border: "1px solid #86efac", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24 }} aria-hidden="true">✓</div>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 300, marginBottom: 12 }}>Message Sent</h3>
                <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                <button onClick={() => setFormStatus(null)} style={{ marginTop: 28, fontSize: 12, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 600, color: "#8B7355", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Send Another →</button>
              </div>
            ) : (
              <form onSubmit={handleForm} noValidate>
                <fieldset style={{ border: "none", marginBottom: 24, padding: 0 }}>
                  <legend style={{ fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "#999", marginBottom: 14, fontWeight: 600 }}>I am a</legend>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {["Buyer", "Tenant", "Agent", "Other"].map(role => (
                      <button key={role} type="button" onClick={() => handleRoleSelect(role)} aria-pressed={formData.role === role}
                        style={{ padding: "11px 8px", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500, cursor: "pointer", border: "1px solid", fontFamily: "inherit", transition: "all .15s", background: formData.role === role ? "#1a1a1a" : "transparent", color: formData.role === role ? "#fff" : "#999", borderColor: formData.role === role ? "#1a1a1a" : "#ddd" }}>
                        {role}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset style={{ border: "none", marginBottom: 24, padding: 0 }}>
                  <legend style={{ fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "#999", marginBottom: 14, fontWeight: 600, display: "block" }}>I want to</legend>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[{ v: "Buy", label: "🏠  Buy" }, { v: "Rent", label: "🔑  Rent" }].map(({ v, label }) => (
                      <button key={v} type="button" onClick={() => setFormData(prev => ({ ...prev, intent: v, priceMin: "", priceMax: "" }))} aria-pressed={formData.intent === v}
                        style={{ padding: "12px 8px", fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 600, cursor: "pointer", border: "2px solid", fontFamily: "inherit", transition: "all .15s", background: formData.intent === v ? (v === "Buy" ? "#8B7355" : "#1a1a1a") : "transparent", color: formData.intent === v ? "#fff" : "#888", borderColor: formData.intent === v ? (v === "Buy" ? "#8B7355" : "#1a1a1a") : "#ddd" }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "#999", marginBottom: 12, fontWeight: 600 }}>Bedrooms</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["Any", "1", "2", "3", "4", "5", "6+"].map(b => (
                      <button key={b} type="button" onClick={() => handleFormField("bedrooms", formData.bedrooms === b ? "" : b)} aria-pressed={formData.bedrooms === b}
                        style={{ minWidth: 42, padding: "8px 10px", fontSize: 12, fontWeight: 500, cursor: "pointer", border: "1px solid", fontFamily: "inherit", transition: "all .15s", textAlign: "center", lineHeight: 1, background: formData.bedrooms === b ? "#1a1a1a" : "transparent", color: formData.bedrooms === b ? "#fff" : "#888", borderColor: formData.bedrooms === b ? "#1a1a1a" : "#ddd" }}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                {formData.intent && (() => {
                  const isBuy = formData.intent === "Buy";
                  const mins = isBuy
                    ? ["", "Under KES 5M", "KES 5M", "KES 10M", "KES 20M", "KES 40M"]
                    : ["", "Under KES 25K/mo", "KES 25K/mo", "KES 50K/mo", "KES 100K/mo", "KES 200K/mo", "KES 400K/mo"];
                  const maxs = isBuy
                    ? ["", "KES 10M", "KES 20M", "KES 40M", "KES 80M", "No limit"]
                    : ["", "KES 25K/mo", "KES 50K/mo", "KES 100K/mo", "KES 200K/mo", "KES 400K/mo", "No limit"];
                  const selStyle = { width: "100%", padding: "11px 28px 11px 13px", fontSize: 13, border: "1px solid #E8E4DF", background: "#FAFAFA", color: "#1a1a1a", fontFamily: "inherit", cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23aaa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" };
                  return (
                    <div style={{ marginBottom: 24 }}>
                      <p style={{ fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "#999", marginBottom: 12, fontWeight: 600 }}>{isBuy ? "Purchase Budget" : "Monthly Rent Budget"}</p>
                      <div className="form-price-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div>
                          <label htmlFor="form-price-min" style={{ display: "block", fontSize: 10, color: "#bbb", marginBottom: 5, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500 }}>From</label>
                          <select id="form-price-min" value={formData.priceMin} onChange={e => handleFormField("priceMin", e.target.value)} style={selStyle}>
                            {mins.map(v => <option key={v} value={v}>{v || "Min…"}</option>)}
                          </select>
                        </div>
                        <div>
                          <label htmlFor="form-price-max" style={{ display: "block", fontSize: 10, color: "#bbb", marginBottom: 5, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500 }}>To</label>
                          <select id="form-price-max" value={formData.priceMax} onChange={e => handleFormField("priceMax", e.target.value)} style={selStyle}>
                            {maxs.map(v => <option key={v} value={v}>{v || "Max…"}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })()}
                {[
                  { key: "name",  label: "Full Name",     type: "text",  placeholder: "Jane Doe",         autoComplete: "name" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "jane@example.com", autoComplete: "email" },
                  { key: "phone", label: "Phone Number",  type: "tel",   placeholder: "+254 700 000 000", autoComplete: "tel" },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 20 }}>
                    <label htmlFor={`contact-${f.key}`} style={{ display: "block", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "#999", marginBottom: 8, fontWeight: 600 }}>{f.label}</label>
                    <input id={`contact-${f.key}`} type={f.type} required placeholder={f.placeholder} autoComplete={f.autoComplete} value={formData[f.key]} onChange={e => handleFormField(f.key, e.target.value)} style={{ width: "100%", padding: "13px 16px", fontSize: 14, border: "1px solid #E8E4DF", background: "#FAFAFA", color: "#1a1a1a", fontFamily: "inherit", transition: "border-color .2s" }} />
                  </div>
                ))}
                <div style={{ marginBottom: 28 }}>
                  <label htmlFor="contact-message" style={{ display: "block", fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "#999", marginBottom: 8, fontWeight: 600 }}>
                    Message <span style={{ color: "#ccc", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <textarea id="contact-message" rows={3} placeholder="Tell us what you're looking for..." value={formData.message} onChange={e => handleFormField("message", e.target.value)} style={{ width: "100%", padding: "13px 16px", fontSize: 14, border: "1px solid #E8E4DF", background: "#FAFAFA", color: "#1a1a1a", fontFamily: "inherit", resize: "vertical", transition: "border-color .2s" }} />
                </div>
                {formStatus === "error" && (
                  <p role="alert" style={{ fontSize: 13, color: "#c0392b", marginBottom: 16 }}>Something went wrong. Please try again or email us directly.</p>
                )}
                <button type="submit" disabled={formStatus === "sending" || !formData.role}
                  style={{ width: "100%", padding: "16px", background: formData.role ? "#1a1a1a" : "#ccc", color: "#fff", fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600, border: "none", cursor: formData.role ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "background .2s" }}>
                  {formStatus === "sending" ? "Sending…" : "Send Enquiry →"}
                </button>
                <p style={{ fontSize: 11, color: "#bbb", marginTop: 14, textAlign: "center" }}>We respond within 24 hours</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ════════════════════════════════════════════════════════ */}
      <section className="newsletter-section section-pad" aria-labelledby="newsletter-heading" style={{ position: "relative", padding: "100px 6vw", overflow: "hidden" }}>
        <img src="/Amethyst-springs/WhatsApp Image 2026-03-04 at 10.26.52 PM.webp" alt="Amethyst Springs Kilimani Nairobi" loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,6,.84)" }} aria-hidden="true" />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#8B7355", marginBottom: 20, fontWeight: 600 }}>Stay Updated</p>
          <h2 id="newsletter-heading" className="serif" style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 16 }}>
            Exclusive Listings<br /><em>Delivered to You</em>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", marginBottom: 40, lineHeight: 1.7 }}>
            Be first to hear about new off-plan launches, price updates, and market insights from Nairobi's most sought-after developments.
          </p>
          <form onSubmit={e => e.preventDefault()} className="newsletter-form" style={{ display: "flex", maxWidth: 480, margin: "0 auto" }}>
            <label htmlFor="newsletter-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Email address</label>
            <input id="newsletter-email" type="email" placeholder="Your email address" required autoComplete="email" style={{ flex: 1, padding: "15px 20px", fontSize: 14, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.15)", borderRight: "none", color: "#fff", fontFamily: "inherit" }} />
            <button type="submit" style={{ padding: "15px 28px", background: "#8B7355", color: "#fff", fontSize: 12, letterSpacing: ".15em", textTransform: "uppercase", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Subscribe</button>
          </form>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginTop: 16 }}>Unsubscribe at any time. No spam.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;