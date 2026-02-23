import { useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { properties } from '../data/propertyData'

const LOCATIONS = ['All', 'Westlands', 'Kilimani', 'Lavington', 'Kileleshwa', 'Runda', 'Langata','Kiambu Road', 'Karen', 'Ruiru']
const EMPTY_FILTERS = { search: '', propertyType: 'all', listingType: 'all', bedrooms: 'all', location: 'all' }

const LocationPin = () => (
  <svg width="13" height="13" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
  </svg>
)

const Properties = () => {
  const [filters,  setFilters]  = useState(EMPTY_FILTERS)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy,   setSortBy]   = useState('featured')

  const resetFilters = useCallback(() => setFilters(EMPTY_FILTERS), [])
  const setFilter    = useCallback((key, val) => setFilters(prev => ({ ...prev, [key]: val })), [])

  const sortedProperties = useMemo(() => {
    const filtered = properties.filter(p => {
      const q = filters.search.toLowerCase()
      return (
        (p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)) &&
        (filters.propertyType === 'all' || p.propertyType === filters.propertyType) &&
        (filters.listingType  === 'all' || p.type         === filters.listingType) &&
        (filters.bedrooms     === 'all' || p.beds.toString() === filters.bedrooms) &&
        (filters.location     === 'all' || p.location.toLowerCase() === filters.location.toLowerCase())
      )
    })
    return [...filtered].sort((a, b) =>
      sortBy === 'price-low'  ? a.priceValue - b.priceValue :
      sortBy === 'price-high' ? b.priceValue - a.priceValue :
                                b.featured   - a.featured
    )
  }, [filters, sortBy])

  const hasActiveFilter = Object.values(filters).some(v => v !== '' && v !== 'all')

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#F9F7F4', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');

        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* Image hover */
        .prop-img { transition: transform 0.6s ease; will-change: transform; }
        .prop-card:hover .prop-img { transform: scale(1.04); }

        /* Card shadow on hover */
        .prop-card { transition: box-shadow 0.3s ease; }
        .prop-card:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.10) !important; }

        /* Form focus */
        input:focus, select:focus { outline: none; border-color: #8B7355 !important; }

        /* Select arrow styling */
        .filter-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23aaa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 32px !important;
          cursor: pointer;
        }
        .filter-select:focus { border-color: #8B7355 !important; }

        /* View toggle */
        .view-btn       { padding: 9px; border: 1px solid #E8E4DF; background: #fff; cursor: pointer; color: #bbb; transition: all 0.2s; }
        .view-btn.active { background: #1a1a1a; border-color: #1a1a1a; color: #fff; }
        .view-btn:hover:not(.active) { border-color: #8B7355; color: #8B7355; }

        /* Fade-in on mount */
        .fade-in { animation: fadeIn 0.4s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        /* ══════════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ══════════════════════════════════════ */

        /* xl */
        @media (max-width: 1200px) {
          .prop-grid-view { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* lg */
        @media (max-width: 1024px) {
          .filter-row-1 { grid-template-columns: 1fr 1fr 1fr !important; }
          .filter-row-2 { grid-template-columns: 1fr 1fr 1fr !important; }
          .hero-title   { font-size: clamp(38px, 7vw, 64px) !important; }
        }

        /* md */
        @media (max-width: 768px) {
          .prop-grid-view  { grid-template-columns: 1fr 1fr !important; }
          .filter-row-1    { grid-template-columns: 1fr 1fr !important; }
          .filter-row-2    { grid-template-columns: 1fr 1fr !important; }
          .list-card       { flex-direction: column !important; }
          .list-img-wrap   { width: 100% !important; height: 260px !important; flex-shrink: unset !important; }
          .list-content    { padding: 24px 20px 28px !important; }
          .list-bottom     { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .list-view-btn   { width: 100% !important; text-align: center !important; justify-content: center !important; }
          /* Sticky filter offset matches md navbar height (64px) */
          .filter-sticky   { top: 64px !important; }
        }

        /* sm */
        @media (max-width: 640px) {
          .prop-grid-view  { grid-template-columns: 1fr !important; }
          .filter-row-1    { grid-template-columns: 1fr 1fr !important; }
          .filter-row-2    { grid-template-columns: 1fr 1fr !important; }
          .hero-section    { padding: 120px 5vw 56px !important; }
          .props-section   { padding: 40px 5vw !important; }
          .filter-sticky   { top: 60px !important; }
          .results-bar     { padding: 12px 5vw !important; }
          .results-count   { font-size: 12px !important; }
          .filter-inner    { padding: 16px 5vw !important; }
        }

        /* xs */
        @media (max-width: 420px) {
          .filter-row-1    { grid-template-columns: 1fr !important; }
          .filter-row-2    { grid-template-columns: 1fr !important; }
          .filter-sticky   { top: 56px !important; }
          .hero-section    { padding: 112px 4vw 48px !important; }
          .props-section   { padding: 32px 4vw !important; }
          .filter-inner    { padding: 14px 4vw !important; }
          .card-price      { font-size: 22px !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .prop-img, .fade-in { transition: none !important; animation: none !important; }
        }
      `}</style>

      {/* ══ HERO — padded to clear fixed navbar (72px) ════════ */}
      <section className="hero-section" style={{ position: 'relative', padding: '160px 6vw 80px', background: '#1a1a1a', overflow: 'hidden' }}>
        {/* Subtle texture overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(139,115,85,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} aria-hidden="true" />
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Exclusive Collection</p>
          </div>
          <h1 className="serif hero-title" style={{ fontSize: 'clamp(44px,6vw,76px)', fontWeight: 300, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 24 }}>
            Luxury Properties<br />
            <em style={{ color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>in Nairobi</em>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 480, lineHeight: 1.75, fontWeight: 300 }}>
            Discover exceptional homes in Kenya's most desirable neighbourhoods
          </p>
        </div>
      </section>

      {/* ══ STICKY FILTER BAR — top:72px clears the fixed navbar ═ */}
      <section className="filter-sticky" style={{ position: 'sticky', top: 72, zIndex: 40, background: '#fff', borderBottom: '1px solid #E8E4DF', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div className="filter-inner" style={{ maxWidth: 1400, margin: '0 auto', padding: '20px 6vw' }}>

          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#bbb', pointerEvents: 'none' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
            <input
              type="search"
              placeholder="Search by name or location..."
              value={filters.search}
              onChange={e => setFilter('search', e.target.value)}
              style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 11, paddingBottom: 11, fontSize: 14, border: '1px solid #E8E4DF', background: '#FAFAFA', color: '#1a1a1a', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
            />
          </div>

          {/* Filter row 1: Type, Listing, Location */}
          <div className="filter-row-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 10 }}>
            <select className="filter-select"
              value={filters.propertyType}
              onChange={e => setFilter('propertyType', e.target.value)}
              style={{ padding: '10px 32px 10px 12px', fontSize: 13, border: '1px solid #E8E4DF', background: '#fff', color: filters.propertyType !== 'all' ? '#1a1a1a' : '#888', fontFamily: 'inherit', transition: 'border-color 0.2s' }}>
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="townhouse">Townhouse</option>
              <option value="villa">Villa</option>
            </select>

            <select className="filter-select"
              value={filters.listingType}
              onChange={e => setFilter('listingType', e.target.value)}
              style={{ padding: '10px 32px 10px 12px', fontSize: 13, border: '1px solid #E8E4DF', background: '#fff', color: filters.listingType !== 'all' ? '#1a1a1a' : '#888', fontFamily: 'inherit', transition: 'border-color 0.2s' }}>
              <option value="all">Buy or Rent</option>
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
            </select>

            <select className="filter-select"
              value={filters.location}
              onChange={e => setFilter('location', e.target.value)}
              style={{ padding: '10px 32px 10px 12px', fontSize: 13, border: '1px solid #E8E4DF', background: '#fff', color: filters.location !== 'all' ? '#1a1a1a' : '#888', fontFamily: 'inherit', transition: 'border-color 0.2s' }}>
              {LOCATIONS.map(loc => <option key={loc} value={loc.toLowerCase()}>{loc}</option>)}
            </select>
          </div>

          {/* Filter row 2: Bedrooms, Sort, Reset */}
          <div className="filter-row-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <select className="filter-select"
              value={filters.bedrooms}
              onChange={e => setFilter('bedrooms', e.target.value)}
              style={{ padding: '10px 32px 10px 12px', fontSize: 13, border: '1px solid #E8E4DF', background: '#fff', color: filters.bedrooms !== 'all' ? '#1a1a1a' : '#888', fontFamily: 'inherit', transition: 'border-color 0.2s' }}>
              <option value="all">Any Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>

            <select className="filter-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ padding: '10px 32px 10px 12px', fontSize: 13, border: '1px solid #E8E4DF', background: '#fff', color: '#888', fontFamily: 'inherit', transition: 'border-color 0.2s' }}>
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>

            <button
              onClick={resetFilters}
              disabled={!hasActiveFilter}
              style={{ padding: '10px 12px', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', background: hasActiveFilter ? '#1a1a1a' : '#F0EDE8', color: hasActiveFilter ? '#fff' : '#bbb', border: 'none', cursor: hasActiveFilter ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'background 0.2s' }}
              onMouseEnter={e => hasActiveFilter && (e.currentTarget.style.background = '#8B7355')}
              onMouseLeave={e => hasActiveFilter && (e.currentTarget.style.background = '#1a1a1a')}>
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      {/* ══ RESULTS BAR ═══════════════════════════════════════════ */}
      <div className="results-bar" style={{ maxWidth: 1400, margin: '0 auto', padding: '16px 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p className="results-count" style={{ fontSize: 13, color: '#aaa', letterSpacing: '0.03em' }}>
          <span style={{ color: '#1a1a1a', fontWeight: 600 }}>{sortedProperties.length}</span>
          {' '}{sortedProperties.length === 1 ? 'property' : 'properties'} found
          {hasActiveFilter && <span style={{ color: '#8B7355' }}> · filtered</span>}
        </p>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className={`view-btn${viewMode === 'grid' ? ' active' : ''}`} onClick={() => setViewMode('grid')} aria-label="Grid view" aria-pressed={viewMode === 'grid'}>
            <svg width="17" height="17" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>
          </button>
          <button className={`view-btn${viewMode === 'list' ? ' active' : ''}`} onClick={() => setViewMode('list')} aria-label="List view" aria-pressed={viewMode === 'list'}>
            <svg width="17" height="17" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ══ PROPERTY LISTINGS ══════════════════════════════════════ */}
      <section className="props-section" style={{ padding: '8px 6vw 80px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {sortedProperties.length > 0 ? (
            viewMode === 'grid' ? (

              /* ── GRID VIEW ── */
              <div className="prop-grid-view" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                {sortedProperties.map((p, i) => (
                  <article key={p.id} className="prop-card fade-in"
                    style={{ background: '#fff', border: '1px solid #E8E4DF', overflow: 'hidden', animationDelay: `${Math.min(i, 5) * 0.06}s` }}>
                    {/* Image */}
                    <div style={{ position: 'relative', height: 280, overflow: 'hidden', background: '#F0EDE8', flexShrink: 0 }}>
                      <img src={p.image} alt={`${p.title} — ${p.propertyType} in ${p.location}`}
                        className="prop-img"
                        loading="lazy" decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      {/* Badges */}
                      <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {p.featured && (
                          <span style={{ padding: '5px 12px', background: '#1a1a1a', color: '#fff', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>Featured</span>
                        )}
                        <span style={{ padding: '5px 12px', background: p.type === 'for-sale' ? '#8B7355' : '#555', color: '#fff', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                          {p.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '24px 22px 28px' }}>
                      <h2 className="serif" style={{ fontSize: 21, fontWeight: 400, color: '#1a1a1a', marginBottom: 8, lineHeight: 1.2 }}>{p.title}</h2>
                      <p style={{ fontSize: 12, color: '#8B7355', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 5, letterSpacing: '0.03em' }}>
                        <LocationPin />{p.location}, Nairobi
                      </p>
                      <div style={{ height: 1, background: '#F0EDE8', marginBottom: 16 }} />
                      <div style={{ display: 'flex', gap: 18, marginBottom: 20, fontSize: 12, color: '#999', letterSpacing: '0.03em' }}>
                        <span>{p.beds} Beds</span>
                        <span style={{ color: '#E8E4DF' }}>|</span>
                        <span>{p.baths} Baths</span>
                        <span style={{ color: '#E8E4DF' }}>|</span>
                        <span>{p.sqm} m²</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
                        <div>
                          {/* FIX: template literal now correctly inside {``} */}
                          <p className="serif card-price" style={{ fontSize: 24, fontWeight: 400, color: '#1a1a1a', lineHeight: 1 }}>{p.price}</p>
                          <p style={{ fontSize: 9, color: '#bbb', marginTop: 4, letterSpacing: '0.14em', textTransform: 'uppercase' }}>{p.propertyType}</p>
                        </div>
                        <Link to={`/property/${p.id}`}
                          style={{ flexShrink: 0, padding: '11px 22px', background: '#1a1a1a', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s', display: 'inline-block', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#8B7355'}
                          onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                          View →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

            ) : (

              /* ── LIST VIEW ── */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {sortedProperties.map((p, i) => (
                  <article key={p.id} className="prop-card list-card fade-in"
                    style={{ display: 'flex', background: '#fff', border: '1px solid #E8E4DF', overflow: 'hidden', animationDelay: `${Math.min(i, 5) * 0.06}s` }}>

                    {/* Image — explicit min-height so it never collapses */}
                    <div className="list-img-wrap"
                      style={{ position: 'relative', width: 380, minHeight: 260, flexShrink: 0, overflow: 'hidden', background: '#F0EDE8' }}>
                      <img src={p.image} alt={`${p.title} — ${p.propertyType} in ${p.location}`}
                        className="prop-img"
                        loading="lazy" decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
                      <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {p.featured && (
                          <span style={{ padding: '5px 12px', background: '#1a1a1a', color: '#fff', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>Featured</span>
                        )}
                        <span style={{ padding: '5px 12px', background: p.type === 'for-sale' ? '#8B7355' : '#555', color: '#fff', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                          {p.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="list-content" style={{ flex: 1, padding: '28px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                      <div>
                        <p style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#bbb', marginBottom: 8, fontWeight: 600 }}>{p.propertyType}</p>
                        <h2 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#1a1a1a', marginBottom: 10, lineHeight: 1.15 }}>{p.title}</h2>
                        <p style={{ fontSize: 13, color: '#8B7355', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.03em' }}>
                          <LocationPin />{p.location}, Nairobi
                        </p>
                        <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#999', paddingBottom: 18, borderBottom: '1px solid #F0EDE8', letterSpacing: '0.03em' }}>
                          <span>{p.beds} Beds</span>
                          <span style={{ color: '#E8E4DF' }}>|</span>
                          <span>{p.baths} Baths</span>
                          <span style={{ color: '#E8E4DF' }}>|</span>
                          <span>{p.sqm} m²</span>
                        </div>
                      </div>
                      <div className="list-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <p className="serif" style={{ fontSize: 30, fontWeight: 400, color: '#1a1a1a', lineHeight: 1 }}>{p.price}</p>
                        <Link to={`/property/${p.id}`} className="list-view-btn"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', background: '#1a1a1a', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#8B7355'}
                          onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                          View Details
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )
          ) : (

            /* ── EMPTY STATE ── */
            <div style={{ textAlign: 'center', padding: '96px 20px', maxWidth: 480, margin: '0 auto' }}>
              <div style={{ width: 64, height: 64, border: '1px solid #E8E4DF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                <svg width="28" height="28" fill="none" stroke="#ccc" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <h2 className="serif" style={{ fontSize: 32, fontWeight: 300, color: '#1a1a1a', marginBottom: 12, letterSpacing: '-0.02em' }}>No properties found</h2>
              <p style={{ fontSize: 14, color: '#aaa', marginBottom: 36, lineHeight: 1.7, fontWeight: 300 }}>
                No listings match your current filters. Try broadening your search.
              </p>
              <button onClick={resetFilters}
                style={{ padding: '14px 36px', background: '#1a1a1a', color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#8B7355'}
                onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}>
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Properties