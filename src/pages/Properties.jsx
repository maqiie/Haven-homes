import { useState } from 'react'
import { Link } from 'react-router-dom'
import { properties } from '../data/propertyData'

const Properties = () => {
  const [filters, setFilters] = useState({
    search: '',
    propertyType: 'all',
    listingType: 'all',
    bedrooms: 'all',
    location: 'all'
  })
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('featured')

  const locations = ['All', 'Westlands', 'Kilimani', 'Lavington', 'Kileleshwa', 'Runda', 'Langata']

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         property.location.toLowerCase().includes(filters.search.toLowerCase())
    const matchesType = filters.propertyType === 'all' || property.propertyType === filters.propertyType
    const matchesListing = filters.listingType === 'all' || property.type === filters.listingType
    const matchesBeds = filters.bedrooms === 'all' || property.beds.toString() === filters.bedrooms
    const matchesLocation = filters.location === 'all' || property.location.toLowerCase() === filters.location.toLowerCase()
    
    return matchesSearch && matchesType && matchesListing && matchesBeds && matchesLocation
  })

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.priceValue - b.priceValue
      case 'price-high':
        return b.priceValue - a.priceValue
      case 'featured':
      default:
        return b.featured - a.featured
    }
  })

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#F9F7F4', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap');
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .prop-hover-img { transition: transform 0.6s ease; }
        .prop-card-wrap:hover .prop-hover-img { transform: scale(1.04); }
        input:focus, select:focus { outline: none; border-color: #8B7355 !important; }
        @media(max-width:768px) {
          .filter-grid { grid-template-columns: 1fr 1fr !important; }
          .prop-grid { grid-template-columns: 1fr !important; }
          .list-view-card { flex-direction: column !important; }
          .list-img { width: 100% !important; height: 280px !important; }
        }
      `}</style>

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', padding: '100px 6vw 80px', background: '#1a1a1a' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8B7355', marginBottom: 20, fontWeight: 600 }}>
            Exclusive Collection
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(42px,6vw,72px)', fontWeight: 300, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.02em', marginBottom: 24 }}>
            Luxury Properties<br />
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>in Nairobi</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', maxWidth: 520, lineHeight: 1.7, fontWeight: 300 }}>
            Discover exceptional homes in Kenya's most desirable locations
          </p>
        </div>
      </section>

      {/* ══ FILTERS ════════════════════════════════════════════════ */}
      <section style={{ position: 'sticky', top: 0, zIndex: 40, background: '#fff', borderBottom: '1px solid #E8E4DF' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 6vw' }}>
          {/* Search */}
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Search by property name or location..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              style={{ width: '100%', padding: '14px 18px', fontSize: 14, border: '1px solid #E8E4DF', background: '#FAFAFA', color: '#1a1a1a', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
            />
          </div>

          {/* Filter grid */}
          <div className="filter-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              style={{ padding: '10px 14px', fontSize: 13, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              <option value="all">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="bungalow">Bungalow</option>
              <option value="townhouse">Townhouse</option>
              <option value="villa">Villa</option>
            </select>

            <select
              value={filters.listingType}
              onChange={(e) => setFilters({...filters, listingType: e.target.value})}
              style={{ padding: '10px 14px', fontSize: 13, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              <option value="all">Buy / Rent</option>
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              style={{ padding: '10px 14px', fontSize: 13, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              {locations.map(loc => (
                <option key={loc} value={loc.toLowerCase()}>{loc}</option>
              ))}
            </select>

            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              style={{ padding: '10px 14px', fontSize: 13, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              <option value="all">Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '10px 14px', fontSize: 13, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <button
              onClick={() => setFilters({search: '', propertyType: 'all', listingType: 'all', bedrooms: 'all', location: 'all'})}
              style={{ padding: '10px 14px', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: '#1a1a1a', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#8B7355'}
              onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* ══ RESULTS BAR ═══════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderBottom: '1px solid #E8E4DF' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '16px 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 13, color: '#888', letterSpacing: '0.05em' }}>
            {sortedProperties.length} {sortedProperties.length === 1 ? 'property' : 'properties'} found
          </p>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{ padding: 8, background: viewMode === 'grid' ? '#1a1a1a' : 'transparent', color: viewMode === 'grid' ? '#fff' : '#bbb', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <svg style={{ width: 18, height: 18 }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{ padding: 8, background: viewMode === 'list' ? '#1a1a1a' : 'transparent', color: viewMode === 'list' ? '#fff' : '#bbb', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <svg style={{ width: 18, height: 18 }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ══ PROPERTIES ═════════════════════════════════════════════ */}
      <section style={{ padding: '60px 6vw' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {sortedProperties.length > 0 ? (
            <div className="prop-grid" style={ viewMode === 'grid' ? { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 } : { display: 'flex', flexDirection: 'column', gap: 24 }}>
              {sortedProperties.map((property) => (
                viewMode === 'grid' ? (
                  /* Grid View */
                  <div key={property.id} className="prop-card-wrap" style={{ background: '#fff', overflow: 'hidden', border: '1px solid #E8E4DF', transition: 'box-shadow 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                    <div style={{ position: 'relative', height: 300, overflow: 'hidden', background: '#F0EDE8' }}>
                      <img
                        src={property.image}
                        alt={property.title}
                        className="prop-hover-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {property.featured && (
                          <span style={{ padding: '6px 14px', background: '#1a1a1a', color: '#fff', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                            Featured
                          </span>
                        )}
                        <span style={{ padding: '6px 14px', background: property.type === 'for-sale' ? '#8B7355' : '#555', color: '#fff', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                          {property.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: '28px 24px 32px' }}>
                      <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, color: '#1a1a1a', marginBottom: 10, lineHeight: 1.2 }}>
                        {property.title}
                      </h3>
                      <p style={{ fontSize: 12, color: '#8B7355', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.03em' }}>
                        <svg style={{ width: 13, height: 13 }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {property.location}, Nairobi
                      </p>
                      <div style={{ height: 1, background: '#F0EDE8', marginBottom: 20 }} />
                      <div style={{ display: 'flex', gap: 20, marginBottom: 24, fontSize: 13, color: '#888' }}>
                        <span>{property.beds} Beds</span>
                        <span>•</span>
                        <span>{property.baths} Baths</span>
                        <span>•</span>
                        <span>{property.sqm} m²</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <p className="serif" style={{ fontSize: 26, fontWeight: 400, color: '#1a1a1a', lineHeight: 1 }}>{property.price}</p>
                          <p style={{ fontSize: 10, color: '#bbb', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{property.propertyType}</p>
                        </div>
                        <Link
                          to={`/property/${property.id}`}
                          style={{ padding: '12px 24px', background: '#1a1a1a', color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s', display: 'inline-block' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#8B7355'}
                          onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List View */
                  <div key={property.id} className="prop-card-wrap list-view-card" style={{ display: 'flex', background: '#fff', overflow: 'hidden', border: '1px solid #E8E4DF', transition: 'box-shadow 0.3s' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                    <div className="list-img" style={{ position: 'relative', width: 420, height: 'auto', flexShrink: 0, overflow: 'hidden', background: '#F0EDE8' }}>
                      <img
                        src={property.image}
                        alt={property.title}
                        className="prop-hover-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {property.featured && (
                          <span style={{ padding: '6px 14px', background: '#1a1a1a', color: '#fff', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                            Featured
                          </span>
                        )}
                        <span style={{ padding: '6px 14px', background: property.type === 'for-sale' ? '#8B7355' : '#555', color: '#fff', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                          {property.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                        </span>
                      </div>
                    </div>
                    <div style={{ flex: 1, padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
                          {property.title}
                        </h3>
                        <p style={{ fontSize: 13, color: '#8B7355', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <svg style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {property.location}, Nairobi
                        </p>
                        <div style={{ display: 'flex', gap: 24, fontSize: 14, color: '#888', paddingBottom: 20, borderBottom: '1px solid #F0EDE8' }}>
                          <span>{property.beds} Beds</span>
                          <span>•</span>
                          <span>{property.baths} Baths</span>
                          <span>•</span>
                          <span>{property.sqm} m²</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <div>
                          <p className="serif" style={{ fontSize: 32, fontWeight: 400, color: '#1a1a1a', lineHeight: 1 }}>{property.price}</p>
                          <p style={{ fontSize: 11, color: '#bbb', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{property.propertyType}</p>
                        </div>
                        <Link
                          to={`/property/${property.id}`}
                          style={{ padding: '14px 32px', background: '#1a1a1a', color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s', display: 'inline-block' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#8B7355'}
                          onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
          ) : (
            /* No Results */
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <svg style={{ width: 64, height: 64, color: '#ddd', margin: '0 auto 24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <p className="serif" style={{ fontSize: 28, fontWeight: 300, color: '#1a1a1a', marginBottom: 12 }}>No properties found</p>
              <p style={{ fontSize: 14, color: '#999', marginBottom: 32 }}>Try adjusting your filters to see more results</p>
              <button
                onClick={() => setFilters({search: '', propertyType: 'all', listingType: 'all', bedrooms: 'all', location: 'all'})}
                style={{ padding: '14px 32px', background: '#1a1a1a', color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#8B7355'}
                onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
              >
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