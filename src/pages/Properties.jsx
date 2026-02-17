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
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <section className="relative py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-neutral-400 uppercase tracking-[0.3em] text-xs mb-4 font-medium">Exclusive Collection</p>
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">
              Luxury Properties<br />
              <span className="text-neutral-300">in Nairobi</span>
            </h1>
            <p className="text-neutral-400 text-lg">
              Discover exceptional homes in Kenya's most desirable locations
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search properties..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full px-4 py-3 border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
              className="px-3 py-2 border border-neutral-300 text-sm text-neutral-900 focus:outline-none focus:border-neutral-500"
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
              className="px-3 py-2 border border-neutral-300 text-sm text-neutral-900 focus:outline-none focus:border-neutral-500"
            >
              <option value="all">Buy / Rent</option>
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="px-3 py-2 border border-neutral-300 text-sm text-neutral-900 focus:outline-none focus:border-neutral-500"
            >
              {locations.map(loc => (
                <option key={loc} value={loc.toLowerCase()}>{loc}</option>
              ))}
            </select>

            <select
              value={filters.bedrooms}
              onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
              className="px-3 py-2 border border-neutral-300 text-sm text-neutral-900 focus:outline-none focus:border-neutral-500"
            >
              <option value="all">Beds</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-neutral-300 text-sm text-neutral-900 focus:outline-none focus:border-neutral-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low</option>
              <option value="price-high">Price: High</option>
            </select>

            <button
              onClick={() => setFilters({search: '', propertyType: 'all', listingType: 'all', bedrooms: 'all', location: 'all'})}
              className="px-3 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* Results Bar */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-600">{sortedProperties.length} properties</p>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-neutral-900 text-white' : 'text-neutral-400'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-neutral-900 text-white' : 'text-neutral-400'}`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
            {sortedProperties.map((property) => (
              <div key={property.id} className={`group bg-white border border-neutral-200 hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}>
                <div className={`relative overflow-hidden bg-neutral-100 ${viewMode === 'list' ? 'md:w-96 h-64 md:h-auto' : 'h-72'}`}>
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-4 left-4">
                    {property.featured && (
                      <span className="block px-3 py-1 bg-neutral-900 text-white text-xs uppercase tracking-wider mb-2">Featured</span>
                    )}
                    <span className={`block px-3 py-1 text-white text-xs uppercase tracking-wider ${property.type === 'for-sale' ? 'bg-neutral-700' : 'bg-neutral-600'}`}>
                      {property.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-light text-xl">{property.price}</p>
                  </div>
                </div>

                <div className={viewMode === 'list' ? 'flex-1 p-6' : 'p-6'}>
                  <h3 className="font-serif text-2xl text-neutral-900 mb-2 group-hover:text-neutral-600 transition-colors">
                    {property.title}
                  </h3>
                  
                  <p className="text-neutral-500 text-sm mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {property.location}, Nairobi
                  </p>

                  <div className="flex items-center gap-4 text-sm text-neutral-600 mb-6 pb-6 border-b border-neutral-100">
                    <span>{property.beds} Beds</span>
                    <span>•</span>
                    <span>{property.baths} Baths</span>
                    <span>•</span>
                    <span>{property.sqm} m²</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500 uppercase tracking-wider">{property.propertyType}</span>
                    <Link
                      to={`/property/${property.id}`}
                      className="px-6 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedProperties.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-400 mb-4">No properties found</p>
              <button
                onClick={() => setFilters({search: '', propertyType: 'all', listingType: 'all', bedrooms: 'all', location: 'all'})}
                className="px-6 py-2 bg-neutral-900 text-white text-sm hover:bg-neutral-800 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Properties