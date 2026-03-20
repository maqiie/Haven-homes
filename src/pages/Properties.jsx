import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { properties } from '../data/propertyData'

const LOCATIONS = [
  'All', 'Westlands', 'Kilimani', 'Lavington', 'Riverside',
  'Runda', 'Gigiri', 'Kileleshwa', 'Karen', 'Langata',
  'Parklands', 'Kiambu', 'Kitusuru', 'Loresho', 'Lower Kabete',
  'Ruiru', 'Diani',
]

const EMPTY_FILTERS = {
  search: '', propertyType: 'all', listingType: 'all',
  bedrooms: 'all', location: 'all'
}

// ── Land listings (self-contained, no images yet) ──────────────────────────
const LAND_LISTINGS = [
  { name: "Kiambu",       address: "Kiambu, Kiambu County",      featured: false, coordinates: { lat: -1.1700, lng: 36.8350 }, description: "Prime land in Kiambu, one of Nairobi's fastest-growing satellite towns. Excellent infrastructure, schools, and amenities nearby." },
  { name: "Kitusuru",     address: "Kitusuru, Nairobi",           featured: false, coordinates: { lat: -1.2300, lng: 36.7900 }, description: "Serene and leafy Kitusuru, bordering Runda. Quiet, secure environment with easy access to Westlands and the UN area." },
  { name: "Karen",        address: "Karen, Nairobi",              featured: true,  coordinates: { lat: -1.3500, lng: 36.7100 }, description: "Nairobi's most prestigious low-density suburb. Wide open spaces, top international schools, and an unmatched tranquil lifestyle." },
  { name: "Loresho",      address: "Loresho, Nairobi",            featured: false, coordinates: { lat: -1.2530, lng: 36.7780 }, description: "One of Nairobi's most established neighbourhoods. Known for generous plot sizes, mature trees, and proximity to Westlands." },
  { name: "Lavington",    address: "Lavington, Nairobi",          featured: true,  coordinates: { lat: -1.2780, lng: 36.7870 }, description: "Highly desirable mid-to-high end suburb with excellent connectivity to Westlands, the CBD, top schools, hospitals, and shopping." },
  { name: "Lower Kabete", address: "Lower Kabete, Nairobi",       featured: false, coordinates: { lat: -1.2480, lng: 36.7500 }, description: "Rapidly appreciating area on the outskirts of Nairobi with strong capital growth potential and easy access to Waiyaki Way." },
  { name: "Westlands",    address: "Westlands, Nairobi",          featured: true,  coordinates: { lat: -1.2676, lng: 36.8070 }, description: "Nairobi's premier commercial and upscale residential hub. Unmatched connectivity and strong rental and development returns." },
  { name: "Ruiru",        address: "Ruiru, Kiambu County",        featured: false, coordinates: { lat: -1.1470, lng: 36.9610 }, description: "Affordable entry point in one of Nairobi's fastest-growing satellite towns along the Thika Superhighway corridor." },
  { name: "Diani",        address: "Diani, Kwale County, Coast",  featured: true,  coordinates: { lat: -4.2800, lng: 39.5900 }, description: "Kenya's most celebrated beach destination on the South Coast. Exceptional investment potential driven by tourism and Airbnb demand." },
  { name: "Runda",        address: "Runda, Nairobi",              featured: true,  coordinates: { lat: -1.2154, lng: 36.7833 }, description: "Nairobi's most exclusive residential address. Exceptionally scarce land in a neighbourhood favoured by diplomats and executives." },
].map((loc, i) => ({
  id: 1000 + i,
  title: `Land for Sale — ${loc.name}`,
  location: loc.name,
  fullAddress: loc.address,
  price: "Contact for Pricing",
  priceValue: 0,
  beds: null,
  baths: null,
  sqm: null,
  yearBuilt: null,
  parking: null,
  type: "for-sale",
  featured: loc.featured,
  propertyType: "land",
  project: null,
  completionDate: null,
  paymentPlan: null,
  priceRange: null,
  earlyBirdDiscount: null,
  floorPlan: null,
  description: loc.description,
  features: [
    "Starting from 1/8 Acre",
    "Up to Full Acre & Beyond",
    "Multiple Plot Sizes Available",
    "Ready Title Deeds",
    "Contact for Pricing & Availability",
  ],
  video: null,
  previewImages: [],
  images: [],
  image: null,
  brochure: null,
  coordinates: loc.coordinates,
}))

// ── Icons ──────────────────────────────────────────────────────────────────
const PinIcon = () => (
  <svg width="11" height="11" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
  </svg>
)
const SearchIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
  </svg>
)
const GridIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
  </svg>
)
const ListIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
  </svg>
)
const ChevronIcon = () => (
  <svg width="10" height="6" fill="none" viewBox="0 0 10 6" aria-hidden="true">
    <path d="M1 1L5 5L9 1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

// ── Animated counter badge ─────────────────────────────────────────────────
const CountBadge = ({ count }) => {
  const prev = useRef(count)
  useEffect(() => { prev.current = count }, [count])
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: 24, height: 20, padding: '0 7px',
      background: '#8B7355', color: '#fff',
      fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
      borderRadius: 2, lineHeight: 1,
    }}>
      {count}
    </span>
  )
}

// ── Custom Select ──────────────────────────────────────────────────────────
const FilterSelect = ({ value, onChange, children, style }) => (
  <div style={{ position: 'relative', ...style }}>
    <select
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '0 36px 0 14px',
        height: 42,
        fontSize: 12,
        letterSpacing: '0.04em',
        border: '1px solid',
        borderColor: value !== 'all' && value !== '' ? '#8B7355' : '#E2DED9',
        background: value !== 'all' && value !== '' ? 'rgba(139,115,85,0.05)' : '#fff',
        color: value !== 'all' && value !== '' ? '#1a1a1a' : '#999',
        fontFamily: 'inherit',
        appearance: 'none',
        cursor: 'pointer',
        fontWeight: value !== 'all' && value !== '' ? 500 : 400,
        transition: 'all 0.2s',
        outline: 'none',
      }}
      onFocus={e => e.currentTarget.style.borderColor = '#8B7355'}
      onBlur={e => e.currentTarget.style.borderColor = value !== 'all' && value !== '' ? '#8B7355' : '#E2DED9'}
    >
      {children}
    </select>
    <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
      <ChevronIcon />
    </span>
  </div>
)

// ── Land placeholder ───────────────────────────────────────────────────────
const LandPlaceholder = ({ location }) => (
  <div style={{
    width: '100%', height: '100%',
    background: 'linear-gradient(135deg, #1a1a17 0%, #2a2720 50%, #1e1c19 100%)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Topo grid */}
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }} aria-hidden="true">
      <defs>
        <pattern id="topo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 20 Q10 10 20 20 Q30 30 40 20" fill="none" stroke="#8B7355" strokeWidth="0.8"/>
          <path d="M0 10 Q10 0 20 10 Q30 20 40 10" fill="none" stroke="#8B7355" strokeWidth="0.5"/>
          <path d="M0 30 Q10 20 20 30 Q30 40 40 30" fill="none" stroke="#8B7355" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topo)"/>
    </svg>
    {/* Radial glow */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(139,115,85,0.14) 0%, transparent 70%)',
      pointerEvents: 'none',
    }} aria-hidden="true"/>
    {/* Pin icon */}
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      style={{ color: '#8B7355', marginBottom: 12, flexShrink: 0 }} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill="currentColor" opacity="0.9"/>
    </svg>
    <p style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(139,115,85,0.9)', fontWeight: 600, marginBottom: 5 }}>
      Land — {location}
    </p>
    <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', fontWeight: 400 }}>
      ⅛ Acre &amp; Above
    </p>
  </div>
)

// ── Unified card media — image / video / land placeholder ──────────────────
const CardMedia = ({ p, className }) => {
  if (p.image) {
    return (
      <img
        src={p.image}
        alt={`${p.title} — ${p.propertyType} in ${p.location}`}
        className={className}
        loading="lazy"
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    )
  }
  if (p.video) {
    return (
      <video
        src={p.video}
        autoPlay muted loop playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    )
  }
  return <LandPlaceholder location={p.location} />
}

// ── Main component ─────────────────────────────────────────────────────────
const Properties = () => {
  const [filters, setFilters]   = useState(EMPTY_FILTERS)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy]     = useState('featured')

  const resetFilters = useCallback(() => setFilters(EMPTY_FILTERS), [])
  const setFilter    = useCallback((key, val) => setFilters(prev => ({ ...prev, [key]: val })), [])

  // Merge propertyData + local land listings once
  const allProperties = useMemo(() => [...properties, ...LAND_LISTINGS], [])

  // Counts
  const forSaleCount = useMemo(() => allProperties.filter(p => p.type === 'for-sale' && p.propertyType !== 'land').length, [allProperties])
  const forRentCount = useMemo(() => allProperties.filter(p => p.type === 'for-rent').length, [allProperties])
  const landCount    = useMemo(() => allProperties.filter(p => p.propertyType === 'land').length, [allProperties])

  const sortedProperties = useMemo(() => {
    const filtered = allProperties.filter(p => {
      const q = filters.search.toLowerCase()

      const matchBeds = filters.bedrooms === 'all'
        ? true
        : p.beds == null
          ? false
          : filters.bedrooms === '5'
            ? p.beds >= 5
            : p.beds.toString() === filters.bedrooms

      const matchListing =
        filters.listingType === 'all'      ? true :
        filters.listingType === 'land'     ? p.propertyType === 'land' :
        filters.listingType === 'for-sale' ? p.type === 'for-sale' && p.propertyType !== 'land' :
        filters.listingType === 'for-rent' ? p.type === 'for-rent' :
        true

      return (
        (p.title.toLowerCase().includes(q) ||
         p.location.toLowerCase().includes(q) ||
         (p.project || '').toLowerCase().includes(q)) &&
        (filters.propertyType === 'all' || p.propertyType === filters.propertyType) &&
        matchListing &&
        matchBeds &&
        (filters.location === 'all' || p.location.toLowerCase() === filters.location.toLowerCase())
      )
    })

    return [...filtered].sort((a, b) =>
      sortBy === 'price-low'  ? a.priceValue - b.priceValue :
      sortBy === 'price-high' ? b.priceValue - a.priceValue :
                                (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    )
  }, [allProperties, filters, sortBy])

  const hasActiveFilter = Object.values(filters).some(v => v !== '' && v !== 'all')

  const locationLabel = (p) => p.location === 'Diani' ? `${p.location}, Coast` : `${p.location}, Nairobi`

  return (
    <div style={{ fontFamily: "'Jost', 'DM Sans', sans-serif", background: '#F8F6F3', minHeight: '100vh', color: '#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .pcard { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .pcard:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(0,0,0,0.12) !important; }
        .pcard-img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); will-change: transform; }
        .pcard:hover .pcard-img { transform: scale(1.06); }
        .pcard-overlay { opacity: 0; transition: opacity 0.3s ease; }
        .pcard:hover .pcard-overlay { opacity: 1; }
        .lcard { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .lcard:hover { transform: translateX(4px); box-shadow: 0 8px 32px rgba(0,0,0,0.09) !important; }
        .lcard-img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); will-change: transform; }
        .lcard:hover .lcard-img { transform: scale(1.04); }
        .cta-btn { transition: background 0.2s, color 0.2s, letter-spacing 0.2s; }
        .cta-btn:hover { background: #8B7355 !important; letter-spacing: 0.18em !important; }
        .vtog { transition: all 0.18s ease; cursor: pointer; }
        .vtog:hover:not(.vtog-active) { background: #F0EDE8 !important; }
        .vtog-active { background: #1a1a1a !important; color: #fff !important; }
        .appear { animation: appear 0.5s ease both; }
        @keyframes appear { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .grain::after {
          content: ''; position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; opacity: 0.3;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F8F6F3; }
        ::-webkit-scrollbar-thumb { background: #D4CEBF; border-radius: 3px; }
        @media (max-width: 1100px) { .grid-3 { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 900px) {
          .filter-grid-a { grid-template-columns: 1fr 1fr !important; }
          .hero-inner { flex-direction: column !important; gap: 32px !important; }
          .hero-stats { justify-content: flex-start !important; flex-wrap: wrap !important; }
        }
        @media (max-width: 700px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .lcard { flex-direction: column !important; }
          .lcard-imgwrap { width: 100% !important; height: 260px !important; min-height: unset !important; }
          .lcard-body { padding: 22px 20px 26px !important; }
          .lcard-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
          .lcard-cta { width: 100% !important; justify-content: center !important; }
          .props-section { padding: 28px 5vw 72px !important; }
          .filter-bar { padding: 16px 5vw !important; }
          .results-wrap { padding: 14px 5vw !important; }
        }
        @media (max-width: 480px) {
          .filter-grid-a { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(36px,10vw,56px) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pcard, .lcard, .pcard-img, .lcard-img, .appear { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <header className="grain" style={{ position: 'relative', background: '#0F0E0C', padding: '160px 6vw 72px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 75% 40%, rgba(139,115,85,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true"/>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(139,115,85,0.4), transparent)' }} aria-hidden="true"/>
        <div className="hero-inner" style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <div style={{ width: 28, height: 1, background: '#8B7355' }} aria-hidden="true"/>
              <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>
                Exclusive Collection
              </span>
            </div>
            <h1 className="serif hero-title" style={{ fontSize: 'clamp(42px,5.5vw,80px)', fontWeight: 300, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.025em', marginBottom: 28 }}>
              Premium<br/>
              <em style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', fontWeight: 300 }}>Properties</em>
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', maxWidth: 400, lineHeight: 1.8, fontWeight: 300 }}>
              Nairobi's finest homes — from off-plan investments to ready-to-move-in residences.
            </p>
          </div>
          <div className="hero-stats" style={{ display: 'flex', gap: 32, flexShrink: 0, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            {[
              { n: allProperties.length, l: 'Total Listings' },
              { n: forSaleCount,         l: 'For Sale' },
              { n: forRentCount,         l: 'For Rent' },
              { n: landCount,            l: 'Land' },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'right' }}>
                <p className="serif" style={{ fontSize: 48, fontWeight: 300, color: '#fff', lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8B7355', marginTop: 4, fontWeight: 600 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══ TYPE PILLS ════════════════════════════════════════════════════ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #ECEAE6', padding: '0 6vw' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { label: 'All Properties', val: 'all',      count: allProperties.length },
            { label: 'For Sale',       val: 'for-sale', count: forSaleCount },
            { label: 'For Rent',       val: 'for-rent', count: forRentCount },
            { label: 'Land',           val: 'land',     count: landCount },
          ].map(tab => {
            const active = filters.listingType === tab.val
            return (
              <button key={tab.val} onClick={() => setFilter('listingType', tab.val)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '17px 22px', fontSize: 12,
                  fontWeight: active ? 600 : 400,
                  letterSpacing: '0.06em',
                  background: 'transparent', border: 'none',
                  borderBottom: `2px solid ${active ? '#8B7355' : 'transparent'}`,
                  color: active ? '#1a1a1a' : '#999',
                  cursor: 'pointer', fontFamily: 'inherit',
                  whiteSpace: 'nowrap', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#1a1a1a'; e.currentTarget.style.borderBottomColor = 'rgba(139,115,85,0.3)' }}}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#999'; e.currentTarget.style.borderBottomColor = 'transparent' }}}
              >
                {tab.label}
                <CountBadge count={tab.count} />
              </button>
            )
          })}
          <div style={{ flex: 1 }}/>
          <span style={{ fontSize: 11, color: '#ccc', letterSpacing: '0.06em', flexShrink: 0 }}>
            {allProperties.length} listings across {[...new Set(allProperties.map(p => p.location))].length} locations
          </span>
        </div>
      </div>

      {/* ══ STICKY FILTER BAR ═════════════════════════════════════════════ */}
      <div style={{ position: 'sticky', top: 72, zIndex: 40, background: 'rgba(248,246,243,0.97)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #ECEAE6', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div className="filter-bar" style={{ maxWidth: 1400, margin: '0 auto', padding: '16px 6vw' }}>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#bbb', pointerEvents: 'none', display: 'flex' }}>
              <SearchIcon />
            </span>
            <input
              type="search"
              placeholder="Search by name, project, or location…"
              value={filters.search}
              onChange={e => setFilter('search', e.target.value)}
              style={{
                width: '100%', paddingLeft: 40, paddingRight: 16,
                height: 42, fontSize: 13,
                border: '1px solid',
                borderColor: filters.search ? '#8B7355' : '#E2DED9',
                background: filters.search ? 'rgba(139,115,85,0.04)' : '#fff',
                color: '#1a1a1a', fontFamily: 'inherit',
                transition: 'border-color 0.2s, background 0.2s',
                outline: 'none',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#8B7355'; e.currentTarget.style.background = 'rgba(139,115,85,0.04)' }}
              onBlur={e => { if (!e.currentTarget.value) { e.currentTarget.style.borderColor = '#E2DED9'; e.currentTarget.style.background = '#fff' }}}
            />
            {filters.search && (
              <button onClick={() => setFilter('search', '')}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#bbb', cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 2 }}>
                ✕
              </button>
            )}
          </div>

          {/* Filter selects */}
          <div className="filter-grid-a" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 8 }}>
            <FilterSelect value={filters.propertyType} onChange={e => setFilter('propertyType', e.target.value)}>
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="bungalow">Bungalow</option>
              <option value="townhouse">Townhouse</option>
              <option value="land">Land</option>
            </FilterSelect>
            <FilterSelect value={filters.location} onChange={e => setFilter('location', e.target.value)}>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc === 'All' ? 'all' : loc.toLowerCase()}>{loc}</option>
              ))}
            </FilterSelect>
            <FilterSelect value={filters.bedrooms} onChange={e => setFilter('bedrooms', e.target.value)}>
              <option value="all">Any Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </FilterSelect>
            <FilterSelect value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </FilterSelect>
          </div>

          {/* Active filters + view toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, flexWrap: 'wrap', minHeight: 24 }}>
              {hasActiveFilter && (
                <>
                  <span style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.06em' }}>Active:</span>
                  {filters.search && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: 'rgba(139,115,85,0.1)', border: '1px solid rgba(139,115,85,0.25)', fontSize: 11, color: '#8B7355' }}>
                      "{filters.search}"
                      <button onClick={() => setFilter('search', '')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355', fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
                    </span>
                  )}
                  {filters.listingType !== 'all' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: 'rgba(139,115,85,0.1)', border: '1px solid rgba(139,115,85,0.25)', fontSize: 11, color: '#8B7355' }}>
                      {filters.listingType === 'for-sale' ? 'For Sale' : filters.listingType === 'for-rent' ? 'For Rent' : 'Land'}
                      <button onClick={() => setFilter('listingType', 'all')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355', fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
                    </span>
                  )}
                  {filters.propertyType !== 'all' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: 'rgba(139,115,85,0.1)', border: '1px solid rgba(139,115,85,0.25)', fontSize: 11, color: '#8B7355', textTransform: 'capitalize' }}>
                      {filters.propertyType}
                      <button onClick={() => setFilter('propertyType', 'all')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355', fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
                    </span>
                  )}
                  {filters.location !== 'all' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: 'rgba(139,115,85,0.1)', border: '1px solid rgba(139,115,85,0.25)', fontSize: 11, color: '#8B7355', textTransform: 'capitalize' }}>
                      {filters.location}
                      <button onClick={() => setFilter('location', 'all')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355', fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
                    </span>
                  )}
                  {filters.bedrooms !== 'all' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: 'rgba(139,115,85,0.1)', border: '1px solid rgba(139,115,85,0.25)', fontSize: 11, color: '#8B7355' }}>
                      {filters.bedrooms === '5' ? '5+ Beds' : `${filters.bedrooms} Bed${filters.bedrooms !== '1' ? 's' : ''}`}
                      <button onClick={() => setFilter('bedrooms', 'all')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8B7355', fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
                    </span>
                  )}
                  <button onClick={resetFilters}
                    style={{ fontSize: 11, color: '#bbb', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.06em', padding: '3px 6px', textDecoration: 'underline', textDecorationStyle: 'dashed' }}>
                    Clear all
                  </button>
                </>
              )}
            </div>
            <div style={{ display: 'flex', border: '1px solid #E2DED9', overflow: 'hidden', flexShrink: 0 }}>
              {[{ mode: 'grid', Icon: GridIcon }, { mode: 'list', Icon: ListIcon }].map(({ mode, Icon }) => (
                <button key={mode} className={`vtog${viewMode === mode ? ' vtog-active' : ''}`}
                  onClick={() => setViewMode(mode)}
                  aria-label={`${mode} view`} aria-pressed={viewMode === mode}
                  style={{ padding: '9px 13px', background: '#fff', border: 'none', color: '#bbb', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <Icon />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ RESULTS HEADER ════════════════════════════════════════════════ */}
      <div className="results-wrap" style={{ maxWidth: 1400, margin: '0 auto', padding: '18px 6vw 2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 12, color: '#aaa', letterSpacing: '0.06em' }}>
          Showing{' '}
          <strong style={{ color: '#1a1a1a', fontWeight: 600 }}>{sortedProperties.length}</strong>
          {' '}{sortedProperties.length === 1 ? 'property' : 'properties'}
          {hasActiveFilter && <em style={{ color: '#8B7355', fontStyle: 'normal' }}> — filtered</em>}
        </p>
        {sortedProperties.length > 0 && (
          <p style={{ fontSize: 11, color: '#ccc', letterSpacing: '0.06em' }}>{viewMode === 'grid' ? 'Grid' : 'List'} view</p>
        )}
      </div>

      {/* ══ LISTINGS ══════════════════════════════════════════════════════ */}
      <main className="props-section" style={{ padding: '12px 6vw 96px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {sortedProperties.length > 0 ? (
            viewMode === 'grid' ? (

              /* ── GRID VIEW ──────────────────────────────────────────── */
              <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
                {sortedProperties.map((p, i) => {
                  const isLand = p.propertyType === 'land'
                  return (
                    <article key={p.id} className="pcard appear"
                      style={{ background: '#fff', border: '1px solid #ECEAE6', overflow: 'hidden', animationDelay: `${Math.min(i, 8) * 0.05}s` }}>

                      {/* Media */}
                      <div style={{ position: 'relative', height: 272, overflow: 'hidden', background: isLand ? '#1a1a17' : '#F0EDE8' }}>
                        <CardMedia p={p} className="pcard-img" />
                        <div className="pcard-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,14,12,0.72) 0%, transparent 55%)' }} aria-hidden="true"/>

                        {/* Badges */}
                        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', flexDirection: 'column', gap: 5 }}>
                          {p.featured && (
                            <span style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.95)', color: '#1a1a1a', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
                              ✦ Featured
                            </span>
                          )}
                          <span style={{
                            padding: '4px 10px', color: '#fff', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700,
                            background: isLand ? '#5C4A32' : p.type === 'for-sale' ? '#8B7355' : '#2D2D2D',
                          }}>
                            {isLand ? 'Land' : p.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                          </span>
                          {p.earlyBirdDiscount && (
                            <span style={{ padding: '4px 10px', background: '#C8A97E', color: '#fff', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                              Early Bird
                            </span>
                          )}
                        </div>

                        {p.project && (
                          <div style={{ position: 'absolute', bottom: 14, right: 14 }}>
                            <span style={{ padding: '3px 9px', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', color: 'rgba(255,255,255,0.8)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>
                              {p.project}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ padding: '22px 22px 24px' }}>
                        <h2 className="serif" style={{ fontSize: 20, fontWeight: 400, color: '#1a1a1a', marginBottom: 7, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                          {p.title}
                        </h2>
                        <p style={{ fontSize: 11, color: '#8B7355', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4, letterSpacing: '0.04em' }}>
                          <PinIcon />{locationLabel(p)}
                        </p>

                        {/* Stats — land vs property */}
                        {isLand ? (
                          <div style={{ marginBottom: 18, padding: '12px 14px', background: '#FAFAF9', border: '1px solid #F0EDE8', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#8B7355"/>
                            </svg>
                            <div>
                              <p style={{ fontSize: 12, fontWeight: 600, color: '#1a1a1a', lineHeight: 1 }}>From ⅛ Acre & Above</p>
                              <p style={{ fontSize: 9, color: '#bbb', marginTop: 3, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Multiple Sizes Available</p>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', gap: 0, marginBottom: 18, border: '1px solid #F0EDE8' }}>
                            {[
                              { v: p.beds  ?? '—', l: 'Beds'  },
                              { v: p.baths ?? '—', l: 'Baths' },
                              { v: p.sqm   ? `${p.sqm}` : '—', l: 'Sq m' },
                            ].map((s, idx) => (
                              <div key={s.l} style={{
                                flex: 1, padding: '10px 8px', textAlign: 'center',
                                borderRight: idx < 2 ? '1px solid #F0EDE8' : 'none',
                                background: '#FAFAF9',
                              }}>
                                <p style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', lineHeight: 1 }}>{s.v}</p>
                                <p style={{ fontSize: 9, color: '#bbb', marginTop: 3, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.l}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Price + CTA */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                          <div>
                            <p className="serif" style={{ fontSize: 20, fontWeight: 400, color: '#1a1a1a', lineHeight: 1 }}>{p.price}</p>
                            <p style={{ fontSize: 9, color: '#bbb', marginTop: 3, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{p.propertyType}</p>
                          </div>
                          <Link to={`/property/${p.id}`} className="cta-btn"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: '#1a1a1a', color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                            View <ArrowIcon />
                          </Link>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>

            ) : (

              /* ── LIST VIEW ──────────────────────────────────────────── */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {sortedProperties.map((p, i) => {
                  const isLand = p.propertyType === 'land'
                  return (
                    <article key={p.id} className="lcard appear"
                      style={{ display: 'flex', background: '#fff', border: '1px solid #ECEAE6', overflow: 'hidden', animationDelay: `${Math.min(i, 8) * 0.04}s` }}>

                      {/* Media */}
                      <div className="lcard-imgwrap" style={{ position: 'relative', width: 340, minHeight: 240, flexShrink: 0, overflow: 'hidden', background: isLand ? '#1a1a17' : '#F0EDE8' }}>
                        <div style={{ position: 'absolute', inset: 0 }}>
                          <CardMedia p={p} className="lcard-img" />
                        </div>
                        <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', flexDirection: 'column', gap: 5 }}>
                          {p.featured && (
                            <span style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.95)', color: '#1a1a1a', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
                              ✦ Featured
                            </span>
                          )}
                          <span style={{
                            padding: '4px 10px', color: '#fff', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700,
                            background: isLand ? '#5C4A32' : p.type === 'for-sale' ? '#8B7355' : '#2D2D2D',
                          }}>
                            {isLand ? 'Land' : p.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="lcard-body" style={{ flex: 1, padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                            <div>
                              {p.project && (
                                <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8B7355', marginBottom: 7, fontWeight: 600 }}>{p.project}</p>
                              )}
                              <h2 className="serif" style={{ fontSize: 26, fontWeight: 400, color: '#1a1a1a', lineHeight: 1.15, letterSpacing: '-0.01em' }}>{p.title}</h2>
                            </div>
                            {p.earlyBirdDiscount && (
                              <span style={{ flexShrink: 0, padding: '4px 10px', background: '#F5EFE6', color: '#8B7355', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, border: '1px solid rgba(139,115,85,0.2)' }}>
                                Early Bird −{p.earlyBirdDiscount}
                              </span>
                            )}
                          </div>

                          <p style={{ fontSize: 12, color: '#8B7355', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <PinIcon />{locationLabel(p)}
                          </p>

                          {/* Features strip */}
                          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#888', paddingBottom: 16, borderBottom: '1px solid #F0EDE8', letterSpacing: '0.03em', flexWrap: 'wrap', alignItems: 'center' }}>
                            {isLand ? (
                              <>
                                <span><strong style={{ color: '#1a1a1a' }}>From ⅛ Acre</strong> &amp; Above</span>
                                <span style={{ color: '#E2DED9' }}>·</span>
                                <span style={{ color: '#8B7355', fontSize: 11 }}>Multiple plot sizes available</span>
                              </>
                            ) : (
                              <>
                                {p.beds  != null && <><span><strong style={{ color: '#1a1a1a' }}>{p.beds}</strong> Beds</span><span style={{ color: '#E2DED9' }}>·</span></>}
                                {p.baths != null && <><span><strong style={{ color: '#1a1a1a' }}>{p.baths}</strong> Baths</span><span style={{ color: '#E2DED9' }}>·</span></>}
                                <span><strong style={{ color: '#1a1a1a' }}>{p.sqm ?? '—'}</strong> m²</span>
                                {p.parking > 0 && <><span style={{ color: '#E2DED9' }}>·</span><span><strong style={{ color: '#1a1a1a' }}>{p.parking}</strong> Parking</span></>}
                              </>
                            )}
                          </div>

                          {p.description && (
                            <p style={{ fontSize: 12, color: '#aaa', lineHeight: 1.75, marginTop: 14, fontWeight: 300, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {p.description}
                            </p>
                          )}
                        </div>

                        <div className="lcard-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, gap: 16 }}>
                          <div>
                            <p className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#1a1a1a', lineHeight: 1 }}>{p.price}</p>
                            {p.completionDate && (
                              <p style={{ fontSize: 10, color: '#bbb', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Completion: {p.completionDate}</p>
                            )}
                          </div>
                          <Link to={`/property/${p.id}`} className="lcard-cta cta-btn"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', background: '#1a1a1a', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                            View Details <ArrowIcon />
                          </Link>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )
          ) : (

            /* ── EMPTY STATE ────────────────────────────────────────── */
            <div style={{ textAlign: 'center', padding: '100px 20px', maxWidth: 440, margin: '0 auto' }}>
              <div style={{ width: 72, height: 72, border: '1px solid #E2DED9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', background: '#fff' }}>
                <svg width="30" height="30" fill="none" stroke="#ccc" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <h2 className="serif" style={{ fontSize: 34, fontWeight: 300, color: '#1a1a1a', marginBottom: 14, letterSpacing: '-0.02em' }}>
                No properties found
              </h2>
              <p style={{ fontSize: 14, color: '#aaa', marginBottom: 36, lineHeight: 1.8, fontWeight: 300 }}>
                No listings match your current filters. Try adjusting your search criteria.
              </p>
              <button onClick={resetFilters} className="cta-btn"
                style={{ padding: '14px 40px', background: '#1a1a1a', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Properties