import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPropertyById, properties } from '../data/propertyData'

// ── Land listings mirror (must match Properties.jsx) ──────────────────────
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
  beds: null, baths: null, sqm: null, yearBuilt: null, parking: null,
  type: "for-sale",
  featured: loc.featured,
  propertyType: "land",
  project: null, completionDate: null, paymentPlan: null,
  priceRange: null, earlyBirdDiscount: null, floorPlan: null,
  description: loc.description,
  features: [
    "Starting from 1/8 Acre",
    "Up to Full Acre & Beyond",
    "Multiple Plot Sizes Available",
    "Ready Title Deeds",
    "Contact for Pricing & Availability",
  ],
  video: null, previewImages: [], images: [], image: null, brochure: null,
  coordinates: loc.coordinates,
}))

// ── Land placeholder visual ────────────────────────────────────────────────
const LandHero = ({ location }) => (
  <div style={{
    width: '100%', height: '100%',
    background: 'linear-gradient(135deg, #0F0E0C 0%, #1e1c19 50%, #0F0E0C 100%)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
  }}>
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }} aria-hidden="true">
      <defs>
        <pattern id="topo-hero" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M0 30 Q15 15 30 30 Q45 45 60 30" fill="none" stroke="#8B7355" strokeWidth="0.8"/>
          <path d="M0 15 Q15 0 30 15 Q45 30 60 15" fill="none" stroke="#8B7355" strokeWidth="0.5"/>
          <path d="M0 45 Q15 30 30 45 Q45 60 60 45" fill="none" stroke="#8B7355" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#topo-hero)"/>
    </svg>
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(139,115,85,0.18) 0%, transparent 70%)',
    }} aria-hidden="true"/>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
      style={{ color: '#8B7355', marginBottom: 20 }} aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill="currentColor" opacity="0.9"/>
    </svg>
    <p style={{ fontSize: 13, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(139,115,85,0.95)', fontWeight: 600, marginBottom: 8 }}>
      Land — {location}
    </p>
    <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>
      ⅛ Acre &amp; Above · Ready Title Deeds
    </p>
  </div>
)

// ── Map toggle button ──────────────────────────────────────────────────────
const MapToggle = ({ shown, onToggle }) => (
  <button
    onClick={onToggle}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '10px 20px',
      background: shown ? '#1a1a1a' : '#fff',
      color: shown ? '#fff' : '#1a1a1a',
      border: '1px solid #1a1a1a',
      fontSize: 11, fontWeight: 600,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
      fontFamily: 'inherit',
    }}
  >
    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      {shown
        ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      }
    </svg>
    {shown ? 'Hide Map' : 'Show Map'}
  </button>
)

// ── Main component ─────────────────────────────────────────────────────────
const PropertyDetail = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in this property and would like to schedule a viewing.`
  })
  const [isSubmitting, setIsSubmitting]   = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen]   = useState(false)
  const [mapVisible, setMapVisible]       = useState(false)   // ← hidden by default

  // ── Scroll to top on every navigation ─────────────────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  // ── Resolve property ──────────────────────────────────────────────────
  const numericId = parseInt(id, 10)
  const property  =
    getPropertyById(id) ||
    LAND_LISTINGS.find(p => p.id === numericId) ||
    properties[0]

  const isLand    = property.propertyType === 'land'
  const hasImages = !isLand && property.images && property.images.length > 0

  // ── Lightbox keyboard nav ──────────────────────────────────────────────
  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e) => {
      if (e.key === 'Escape')     setLightboxOpen(false)
      if (e.key === 'ArrowRight') setSelectedImage(i => (i + 1) % property.images.length)
      if (e.key === 'ArrowLeft')  setSelectedImage(i => (i - 1 + property.images.length) % property.images.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen, property.images?.length])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert(`Thank you for your interest in ${property.title}! We'll contact you shortly.`)
    setFormData({
      name: '', email: '', phone: '',
      message: `I'm interested in this property and would like to schedule a viewing.`
    })
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const similarProperties = properties
    .filter(p => p.id !== property.id && !isLand)
    .slice(0, 3)

  return (
    <div style={{ fontFamily: "'Jost', 'DM Sans', sans-serif", background: '#F8F6F3', minHeight: '100vh', color: '#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .thumb-btn { transition: opacity 0.2s, border-color 0.2s; opacity: 0.65; }
        .thumb-btn:hover { opacity: 1; }
        .thumb-btn.active { opacity: 1; }
        .sim-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .sim-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.11) !important; }
        .sim-img { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
        .sim-card:hover .sim-img { transform: scale(1.05); }
        .cta-btn { transition: background 0.2s, letter-spacing 0.2s; }
        .cta-btn:hover { background: #8B7355 !important; letter-spacing: 0.18em !important; }
        .inp:focus { outline: none; border-color: #8B7355 !important; }
        .inp { transition: border-color 0.2s; }
        .feature-row:last-child { border-bottom: none !important; }
        .map-reveal {
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;
        }
        .map-reveal.open  { max-height: 440px; opacity: 1; }
        .map-reveal.closed { max-height: 0;    opacity: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #F8F6F3; }
        ::-webkit-scrollbar-thumb { background: #D4CEBF; border-radius: 3px; }
        @media (max-width: 1024px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .sidebar-inner { position: static !important; }
        }
        @media (max-width: 640px) {
          .gallery-main { height: 280px !important; }
          .stat-grid { grid-template-columns: repeat(2,1fr) !important; }
          .detail-cols { grid-template-columns: 1fr !important; }
          .pay-grid { grid-template-columns: 1fr !important; }
          .header-row { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .sim-grid { grid-template-columns: 1fr !important; }
          .breadcrumb { font-size: 11px !important; }
          .land-hero-wrap { height: 340px !important; }
        }
      `}</style>

      {/* ══ BREADCRUMB ════════════════════════════════════════════════════ */}
      <div style={{ background: '#fff', borderBottom: '1px solid #ECEAE6' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '14px 6vw' }}>
          <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#aaa', letterSpacing: '0.04em', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.color = '#aaa'}>Home</Link>
            <span style={{ color: '#D4CEBF' }}>›</span>
            <Link to="/properties" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.color = '#aaa'}>Properties</Link>
            <span style={{ color: '#D4CEBF' }}>›</span>
            <span style={{ color: '#1a1a1a', fontWeight: 500 }}>{property.title}</span>
          </div>
        </div>
      </div>

      {/* ══ GALLERY — properties only ═════════════════════════════════════ */}
      {hasImages && (
        <section style={{ background: '#fff', borderBottom: '1px solid #ECEAE6' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 6vw' }}>
            <div className="gallery-main" style={{ position: 'relative', height: 520, background: '#F0EDE8', overflow: 'hidden', marginBottom: 10, cursor: 'zoom-in' }}
              onClick={() => setLightboxOpen(true)}>
              <img
                src={property.images[selectedImage]}
                alt={`${property.title} — view ${selectedImage + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,14,12,0.45) 0%, transparent 40%)', pointerEvents: 'none' }} aria-hidden="true"/>
              <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', gap: 8 }}>
                {property.featured && (
                  <span style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.95)', color: '#1a1a1a', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>
                    ✦ Featured
                  </span>
                )}
                <span style={{ padding: '5px 12px', background: property.type === 'for-sale' ? '#8B7355' : '#2D2D2D', color: '#fff', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>
                  {property.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                </span>
              </div>
              <button
                onClick={e => { e.stopPropagation(); setSelectedImage(i => (i - 1 + property.images.length) % property.images.length) }}
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fff'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}>
                <svg width="18" height="18" fill="none" stroke="#1a1a1a" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button
                onClick={e => { e.stopPropagation(); setSelectedImage(i => (i + 1) % property.images.length) }}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#fff'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}>
                <svg width="18" height="18" fill="none" stroke="#1a1a1a" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
              </button>
              <div style={{ position: 'absolute', bottom: 18, right: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Click to expand</span>
                <span style={{ padding: '4px 12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: '#fff', fontSize: 11, letterSpacing: '0.1em' }}>
                  {selectedImage + 1} / {property.images.length}
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(property.images.length, 6)}, 1fr)`, gap: 8 }}>
              {property.images.slice(0, 6).map((img, idx) => (
                <button key={idx}
                  className={`thumb-btn${selectedImage === idx ? ' active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                  style={{ height: 72, background: '#F0EDE8', overflow: 'hidden', border: `2px solid ${selectedImage === idx ? '#8B7355' : 'transparent'}`, cursor: 'pointer', padding: 0 }}>
                  <img src={img} alt={`View ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ LAND HERO — land only ═════════════════════════════════════════ */}
      {isLand && (
        <section style={{ background: '#fff', borderBottom: '1px solid #ECEAE6' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 6vw' }}>
            <div className="land-hero-wrap" style={{ height: 420, position: 'relative', overflow: 'hidden' }}>
              <LandHero location={property.location} />
              <div style={{ position: 'absolute', top: 20, left: 20 }}>
                <span style={{ padding: '5px 12px', background: '#5C4A32', color: '#fff', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Land for Sale
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ LIGHTBOX ══════════════════════════════════════════════════════ */}
      {lightboxOpen && hasImages && (
        <div
          onClick={() => setLightboxOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.93)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={e => { e.stopPropagation(); setSelectedImage(i => (i - 1 + property.images.length) % property.images.length) }}
            style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', width: 52, height: 52, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <img
            src={property.images[selectedImage]}
            alt=""
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '88vw', maxHeight: '88vh', objectFit: 'contain', display: 'block' }}
          />
          <button
            onClick={e => { e.stopPropagation(); setSelectedImage(i => (i + 1) % property.images.length) }}
            style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', width: 52, height: 52, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
          <button
            onClick={() => setLightboxOpen(false)}
            style={{ position: 'absolute', top: 20, right: 24, width: 44, height: 44, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>
          <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em' }}>
            {selectedImage + 1} / {property.images.length} · ESC to close
          </div>
        </div>
      )}

      {/* ══ MAIN CONTENT + SIDEBAR ════════════════════════════════════════ */}
      <section style={{ padding: '48px 6vw 96px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48, alignItems: 'start' }}>

            {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>

              {/* Header */}
              <div>
                <div className="header-row" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, gap: 20 }}>
                  <div>
                    {property.project && (
                      <p style={{ fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8B7355', marginBottom: 10, fontWeight: 600 }}>
                        {property.project}
                      </p>
                    )}
                    <h1 className="serif" style={{ fontSize: 'clamp(28px,3.5vw,46px)', fontWeight: 400, color: '#1a1a1a', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 12 }}>
                      {property.title}
                    </h1>
                    <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#8B7355', letterSpacing: '0.03em' }}>
                      <svg width="13" height="13" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      {property.fullAddress}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p className="serif" style={{ fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1 }}>
                      {property.price}
                    </p>
                    <p style={{ fontSize: 9, color: '#aaa', marginTop: 6, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                      {isLand ? 'Land for Sale' : property.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                    </p>
                    {property.earlyBirdDiscount && (
                      <span style={{ display: 'inline-block', marginTop: 8, padding: '4px 10px', background: '#F5EFE6', color: '#8B7355', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, border: '1px solid rgba(139,115,85,0.25)' }}>
                        Early Bird −{property.earlyBirdDiscount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick stats — non-land only */}
                {!isLand && (
                  <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid #ECEAE6', borderBottom: '1px solid #ECEAE6', marginTop: 24 }}>
                    {[
                      { v: property.beds    ?? '—', l: 'Bedrooms'   },
                      { v: property.baths   ?? '—', l: 'Bathrooms'  },
                      { v: property.sqm ? `${property.sqm} m²` : '—', l: 'Floor Area' },
                      { v: property.parking ?? '—', l: 'Parking'    },
                    ].map((s, i) => (
                      <div key={s.l} style={{ padding: '20px 16px', borderRight: i < 3 ? '1px solid #ECEAE6' : 'none', textAlign: 'center' }}>
                        <p className="serif" style={{ fontSize: 32, fontWeight: 300, color: '#1a1a1a', lineHeight: 1 }}>{s.v}</p>
                        <p style={{ fontSize: 9, color: '#aaa', marginTop: 6, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{s.l}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Land plot sizes */}
                {isLand && (
                  <div style={{ marginTop: 24, padding: '20px 24px', background: '#fff', border: '1px solid #ECEAE6', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#8B7355"/>
                    </svg>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.2 }}>From ⅛ Acre &amp; Above</p>
                      <p style={{ fontSize: 11, color: '#aaa', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Multiple Plot Sizes · Ready Title Deeds</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#1a1a1a', marginBottom: 16, letterSpacing: '-0.01em' }}>
                  About This {isLand ? 'Location' : 'Property'}
                </h2>
                <div style={{ width: 32, height: 1, background: '#8B7355', marginBottom: 20 }} aria-hidden="true"/>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.9, fontWeight: 300 }}>{property.description}</p>
              </div>

              {/* Payment Plan */}
              {property.paymentPlan && (
                <div>
                  <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#1a1a1a', marginBottom: 16, letterSpacing: '-0.01em' }}>
                    Payment Plan
                  </h2>
                  <div style={{ width: 32, height: 1, background: '#8B7355', marginBottom: 24 }} aria-hidden="true"/>
                  <div className="pay-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
                    {[
                      { v: property.paymentPlan.downPayment, l: 'Down Payment' },
                      { v: property.paymentPlan.quarterly,   l: 'Quarterly'    },
                      { v: property.paymentPlan.duration,    l: 'Duration'      },
                    ].map(s => (
                      <div key={s.l} style={{ padding: '24px 20px', background: '#fff', border: '1px solid #ECEAE6', textAlign: 'center' }}>
                        <p className="serif" style={{ fontSize: 28, fontWeight: 300, color: '#1a1a1a', lineHeight: 1, marginBottom: 8 }}>{s.v}</p>
                        <p style={{ fontSize: 9, color: '#aaa', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{s.l}</p>
                      </div>
                    ))}
                  </div>
                  {property.completionDate && (
                    <p style={{ fontSize: 13, color: '#666', letterSpacing: '0.04em' }}>
                      <span style={{ fontWeight: 600, color: '#1a1a1a' }}>Completion:</span> {property.completionDate}
                    </p>
                  )}
                </div>
              )}

              {/* Property details */}
              <div>
                <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#1a1a1a', marginBottom: 16, letterSpacing: '-0.01em' }}>
                  Property Details
                </h2>
                <div style={{ width: 32, height: 1, background: '#8B7355', marginBottom: 24 }} aria-hidden="true"/>
                <div className="detail-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
                  {[
                    { l: 'Property Type', v: property.propertyType ? property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1) : '—' },
                    !isLand && { l: 'Year Built',     v: property.yearBuilt ?? '—'  },
                    !isLand && { l: 'Floor Area',     v: property.sqm ? `${property.sqm} m²` : '—' },
                    !isLand && { l: 'Parking Spaces', v: property.parking ?? '—'   },
                    { l: 'Location',      v: property.location },
                    property.priceRange && {
                      l: 'Price Range',
                      v: `KSh ${property.priceRange.min.toLocaleString()} – ${property.priceRange.max.toLocaleString()}`
                    },
                  ].filter(Boolean).map(row => (
                    <div key={row.l} className="feature-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #ECEAE6' }}>
                      <span style={{ fontSize: 12, color: '#999', letterSpacing: '0.04em' }}>{row.l}</span>
                      <span style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features & Amenities */}
              <div>
                <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#1a1a1a', marginBottom: 16, letterSpacing: '-0.01em' }}>
                  {isLand ? 'Land Details' : 'Features & Amenities'}
                </h2>
                <div style={{ width: 32, height: 1, background: '#8B7355', marginBottom: 24 }} aria-hidden="true"/>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 32px' }}>
                  {property.features.map((feature, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 18, height: 18, border: '1px solid #8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="8" fill="none" stroke="#8B7355" strokeWidth="2.5" viewBox="0 0 12 10" aria-hidden="true">
                          <path d="M1 5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: 13, color: '#555', lineHeight: 1.4 }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brochure */}
              {property.brochure && (
                <div>
                  <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#1a1a1a', marginBottom: 16, letterSpacing: '-0.01em' }}>Downloads</h2>
                  <div style={{ width: 32, height: 1, background: '#8B7355', marginBottom: 24 }} aria-hidden="true"/>
                  <a href={property.brochure} target="_blank" rel="noopener noreferrer" className="cta-btn"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '14px 28px', background: '#1a1a1a', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    </svg>
                    Download Brochure (PDF)
                  </a>
                </div>
              )}

              {/* ── MAP (hidden by default) ────────────────────────────── */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#1a1a1a', letterSpacing: '-0.01em' }}>
                    Location
                  </h2>
                  <MapToggle shown={mapVisible} onToggle={() => setMapVisible(v => !v)} />
                </div>
                <div style={{ width: 32, height: 1, background: '#8B7355', marginBottom: 24 }} aria-hidden="true"/>

                {/* Collapsed placeholder — visible when map is hidden */}
                {!mapVisible && (
                  <div style={{
                    height: 120,
                    background: '#fff',
                    border: '1px solid #ECEAE6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 14,
                    cursor: 'pointer',
                  }}
                    onClick={() => setMapVisible(true)}
                    role="button"
                    aria-label="Show map"
                  >
                    <svg width="20" height="20" fill="none" stroke="#C4B99A" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"/><path d="M8 2v16"/><path d="M16 6v16"/>
                    </svg>
                    <div>
                      <p style={{ fontSize: 13, color: '#888', fontWeight: 400, marginBottom: 2 }}>{property.fullAddress}</p>
                      <p style={{ fontSize: 11, color: '#C4B99A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                        Click "Show Map" to reveal exact location
                      </p>
                    </div>
                  </div>
                )}

                {/* Animated map reveal */}
                <div className={`map-reveal ${mapVisible ? 'open' : 'closed'}`}
                  style={{ border: mapVisible ? '1px solid #ECEAE6' : 'none' }}>
                  {/* Only render the iframe once revealed to avoid a pre-load */}
                  {mapVisible && (
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.202063174595!2d${property.coordinates.lng}!3d${property.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OSczMC44IkU!5e0!3m2!1sen!2ske!4v1234567890`}
                      width="100%"
                      height="380"
                      style={{ border: 0, display: 'block' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${property.title} location`}
                    />
                  )}
                </div>

                <p style={{ marginTop: 12, fontSize: 12, color: '#888', letterSpacing: '0.04em' }}>
                  {property.fullAddress}
                </p>
              </div>

            </div>

            {/* ── RIGHT SIDEBAR ────────────────────────────────────────── */}
            <div>
              <div className="sidebar-inner" style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Contact form */}
                <div style={{ background: '#fff', border: '1px solid #ECEAE6', padding: '36px 32px' }}>
                  <h3 className="serif" style={{ fontSize: 26, fontWeight: 400, color: '#1a1a1a', marginBottom: 8, letterSpacing: '-0.01em' }}>
                    Interested in this {isLand ? 'land' : 'property'}?
                  </h3>
                  <p style={{ fontSize: 13, color: '#aaa', marginBottom: 28, lineHeight: 1.6, fontWeight: 300 }}>
                    Fill out the form and we'll get back to you shortly.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { label: 'Full Name',     name: 'name',  type: 'text',  placeholder: 'John Doe'          },
                      { label: 'Email Address', name: 'email', type: 'email', placeholder: 'john@example.com'  },
                      { label: 'Phone Number',  name: 'phone', type: 'tel',   placeholder: '+254 123 456 789'  },
                    ].map(f => (
                      <div key={f.name}>
                        <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888', marginBottom: 7, fontWeight: 600 }}>
                          {f.label} *
                        </label>
                        <input
                          type={f.type} name={f.name}
                          value={formData[f.name]}
                          onChange={handleChange}
                          required
                          placeholder={f.placeholder}
                          className="inp"
                          style={{ width: '100%', padding: '12px 14px', border: '1px solid #E2DED9', background: '#FAFAF9', fontSize: 13, color: '#1a1a1a', fontFamily: 'inherit' }}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888', marginBottom: 7, fontWeight: 600 }}>
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required rows={4}
                        className="inp"
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #E2DED9', background: '#FAFAF9', fontSize: 13, color: '#1a1a1a', fontFamily: 'inherit', resize: 'none', lineHeight: 1.6 }}
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="cta-btn"
                      style={{ width: '100%', padding: '15px 24px', background: '#1a1a1a', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: isSubmitting ? 0.6 : 1 }}>
                      {isSubmitting ? (
                        <>
                          <svg style={{ animation: 'spin 1s linear infinite' }} width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" opacity="0.4"/>
                            <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Request Information
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                  {/* Contact info */}
                  <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid #ECEAE6', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      {
                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>,
                        text: '+254 728 686 089'
                      },
                      {
                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>,
                        text: 'havenriserealtors@gmail.com'
                      },
                    ].map((c, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <svg width="16" height="16" fill="none" stroke="#8B7355" viewBox="0 0 24 24" aria-hidden="true">{c.icon}</svg>
                        <span style={{ fontSize: 12, color: '#666', letterSpacing: '0.02em' }}>{c.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div style={{ background: '#fff', border: '1px solid #ECEAE6', padding: '24px 32px' }}>
                  <p style={{ fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#aaa', marginBottom: 14, fontWeight: 600 }}>
                    Share This {isLand ? 'Listing' : 'Property'}
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[
                      { label: 'Facebook', path: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/> },
                      { label: 'Twitter',  path: <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/> },
                      { label: 'WhatsApp', path: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/> },
                    ].map(s => (
                      <button key={s.label} aria-label={`Share on ${s.label}`}
                        style={{ flex: 1, padding: '10px 0', background: '#FAFAF9', border: '1px solid #ECEAE6', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F0EDE8'}
                        onMouseLeave={e => e.currentTarget.style.background = '#FAFAF9'}>
                        <svg width="16" height="16" fill="#666" viewBox="0 0 24 24" aria-hidden="true">{s.path}</svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ SIMILAR PROPERTIES ════════════════════════════════════════════ */}
      {!isLand && similarProperties.length > 0 && (
        <section style={{ background: '#fff', borderTop: '1px solid #ECEAE6', padding: '72px 6vw' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
              <div style={{ width: 28, height: 1, background: '#8B7355' }} aria-hidden="true"/>
              <h2 className="serif" style={{ fontSize: 36, fontWeight: 400, color: '#1a1a1a', letterSpacing: '-0.02em' }}>
                Similar Properties
              </h2>
            </div>
            <div className="sim-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {similarProperties.map(p => (
                <Link key={p.id} to={`/property/${p.id}`} className="sim-card"
                  style={{ background: '#fff', border: '1px solid #ECEAE6', overflow: 'hidden', textDecoration: 'none', display: 'block', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                  <div style={{ position: 'relative', height: 240, background: '#F0EDE8', overflow: 'hidden' }}>
                    <img src={p.images?.[0]} alt={p.title} className="sim-img"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)', padding: '32px 18px 16px' }}>
                      <p className="serif" style={{ color: '#fff', fontSize: 22, fontWeight: 300, lineHeight: 1 }}>{p.price}</p>
                    </div>
                    <div style={{ position: 'absolute', top: 12, left: 12 }}>
                      <span style={{ padding: '4px 10px', background: p.type === 'for-sale' ? '#8B7355' : '#2D2D2D', color: '#fff', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                        {p.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '20px 20px 22px' }}>
                    <h3 className="serif" style={{ fontSize: 20, fontWeight: 400, color: '#1a1a1a', marginBottom: 6, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: 11, color: '#8B7355', marginBottom: 14, letterSpacing: '0.04em' }}>
                      {p.location}, Nairobi
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#888' }}>
                      <span><strong style={{ color: '#1a1a1a' }}>{p.beds}</strong> Beds</span>
                      <span style={{ color: '#D4CEBF' }}>·</span>
                      <span><strong style={{ color: '#1a1a1a' }}>{p.baths}</strong> Baths</span>
                      <span style={{ color: '#D4CEBF' }}>·</span>
                      <span><strong style={{ color: '#1a1a1a' }}>{p.sqm}</strong> m²</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default PropertyDetail