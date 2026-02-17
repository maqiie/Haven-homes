import { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [searchFilters, setSearchFilters] = useState({
    propertyType: '',
    bedrooms: '',
    location: '',
    listingType: '',
    budget: ''
  })
  const [activeLocationFilter, setActiveLocationFilter] = useState('all')

  const properties = [
    {
      id: 1,
      title: "Modern Waterfront Villa",
      location: "Lavington",
      price: "KSh 24,500,000",
      beds: 4,
      baths: 3,
      sqm: 320,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      type: "for-sale",
      featured: true,
      propertyType: "Villa"
    },
    {
      id: 2,
      title: "Downtown Penthouse",
      location: "Westlands",
      price: "KSh 42,000,000",
      beds: 3,
      baths: 3,
      sqm: 280,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      type: "for-sale",
      featured: true,
      propertyType: "Apartment"
    },
    {
      id: 3,
      title: "Suburban Family Home",
      location: "Kileleshwa",
      price: "KSh 8,750,000",
      beds: 5,
      baths: 4,
      sqm: 410,
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      type: "for-sale",
      featured: false,
      propertyType: "Bungalow"
    },
    {
      id: 4,
      title: "Contemporary Loft",
      location: "Kilimani",
      price: "KSh 11,500,000",
      beds: 2,
      baths: 2,
      sqm: 185,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      type: "for-sale",
      featured: false,
      propertyType: "Apartment"
    },
    {
      id: 5,
      title: "Mountain Retreat",
      location: "Runda",
      price: "KSh 38,000,000",
      beds: 6,
      baths: 5,
      sqm: 540,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      type: "for-sale",
      featured: true,
      propertyType: "Villa"
    },
    {
      id: 6,
      title: "Coastal Cottage",
      location: "Langata",
      price: "KSh 29,000,000",
      beds: 3,
      baths: 2,
      sqm: 240,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      type: "for-sale",
      featured: false,
      propertyType: "Townhouse"
    }
  ]

  const locations = ['All', 'Kileleshwa', 'Lavington', 'Kilimani', 'Langata', 'Ngong', 'Runda', 'Westlands']

  const filteredProperties = activeLocationFilter === 'all' 
    ? properties 
    : properties.filter(p => p.location.toLowerCase() === activeLocationFilter.toLowerCase())

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Search filters:', searchFilters)
  }

  return (
    <div className="bg-black">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
            alt="Luxury home"
            className="w-full h-full object-cover scale-105"
          />
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
          
          {/* Animated Grid Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-32">
          <div className="text-center mb-16">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full mb-8 border border-white/10 hover:bg-white/10 transition-all group">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-white text-sm font-medium tracking-wide">Premium Real Estate in Nairobi</span>
            </div>
            
            {/* Main Heading with Gradient */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-none">
              HavenRise
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                Homes
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-6 font-light tracking-wide">
              Where Luxury Meets Lifestyle
            </p>
            <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
              Discover extraordinary properties in Kenya's most exclusive neighborhoods
            </p>
          </div>

          {/* Modern Search Form */}
          <form onSubmit={handleSearch} className="bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 max-w-6xl mx-auto border border-white/10 hover:border-white/20 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Property Type */}
              <div className="text-left lg:col-span-1">
                <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
                  Type
                </label>
                <select
                  value={searchFilters.propertyType}
                  onChange={(e) => setSearchFilters({...searchFilters, propertyType: e.target.value})}
                  className="w-full px-4 py-4 border border-white/10 rounded-2xl text-white bg-white/5 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all hover:bg-white/10"
                >
                  <option value="" className="bg-gray-900">All</option>
                  <option className="bg-gray-900">Apartment</option>
                  <option className="bg-gray-900">Bungalow</option>
                  <option className="bg-gray-900">Townhouse</option>
                  <option className="bg-gray-900">Villa</option>
                  <option className="bg-gray-900">Land</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="text-left lg:col-span-1">
                <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
                  Beds
                </label>
                <select
                  value={searchFilters.bedrooms}
                  onChange={(e) => setSearchFilters({...searchFilters, bedrooms: e.target.value})}
                  className="w-full px-4 py-4 border border-white/10 rounded-2xl text-white bg-white/5 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all hover:bg-white/10"
                >
                  <option value="" className="bg-gray-900">Any</option>
                  <option className="bg-gray-900">1</option>
                  <option className="bg-gray-900">2</option>
                  <option className="bg-gray-900">3</option>
                  <option className="bg-gray-900">4</option>
                  <option className="bg-gray-900">5+</option>
                </select>
              </div>

              {/* Location */}
              <div className="text-left lg:col-span-2">
                <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
                  Location
                </label>
                <select
                  value={searchFilters.location}
                  onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                  className="w-full px-4 py-4 border border-white/10 rounded-2xl text-white bg-white/5 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all hover:bg-white/10"
                >
                  <option value="" className="bg-gray-900">All Locations</option>
                  <option className="bg-gray-900">Westlands</option>
                  <option className="bg-gray-900">Kilimani</option>
                  <option className="bg-gray-900">Lavington</option>
                  <option className="bg-gray-900">Kileleshwa</option>
                  <option className="bg-gray-900">Runda</option>
                  <option className="bg-gray-900">Langata</option>
                </select>
              </div>

              {/* For Rent/Sale */}
              <div className="text-left lg:col-span-1">
                <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
                  Listing
                </label>
                <select
                  value={searchFilters.listingType}
                  onChange={(e) => setSearchFilters({...searchFilters, listingType: e.target.value})}
                  className="w-full px-4 py-4 border border-white/10 rounded-2xl text-white bg-white/5 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all hover:bg-white/10"
                >
                  <option value="" className="bg-gray-900">Any</option>
                  <option className="bg-gray-900">For Sale</option>
                  <option className="bg-gray-900">For Rent</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="text-left lg:col-span-1">
                <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest opacity-0">
                  Search
                </label>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transform hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Stat 1 */}
            <div className="text-center group">
              <div className="mb-3">
                <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  500+
                </span>
              </div>
              <p className="text-gray-400 font-semibold uppercase tracking-wider text-sm">Properties Listed</p>
            </div>

            {/* Stat 2 */}
            <div className="text-center group">
              <div className="mb-3">
                <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  1K+
                </span>
              </div>
              <p className="text-gray-400 font-semibold uppercase tracking-wider text-sm">Happy Clients</p>
            </div>

            {/* Stat 3 */}
            <div className="text-center group">
              <div className="mb-3">
                <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                  15+
                </span>
              </div>
              <p className="text-gray-400 font-semibold uppercase tracking-wider text-sm">Years Experience</p>
            </div>

            {/* Stat 4 */}
            <div className="text-center group">
              <div className="mb-3">
                <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  98%
                </span>
              </div>
              <p className="text-gray-400 font-semibold uppercase tracking-wider text-sm">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full mb-6 border border-white/10">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="text-white text-sm font-bold uppercase tracking-widest">Featured Collection</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Exclusive
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Properties</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Handpicked luxury estates and contemporary residences in Nairobi's premier locations
            </p>
          </div>

          {/* Location Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => setActiveLocationFilter(location.toLowerCase())}
                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all transform hover:scale-105 ${
                  activeLocationFilter === location.toLowerCase()
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-xl'
                }`}
              >
                {location}
              </button>
            ))}
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, index) => (
              <div 
                key={property.id} 
                className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Property Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>
                  
                  {/* Featured Badge */}
                  {property.featured && (
                    <div className="absolute top-5 left-5 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-black uppercase rounded-full shadow-lg flex items-center gap-2 backdrop-blur-sm">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Featured
                    </div>
                  )}

                  {/* For Sale Badge */}
                  <div className="absolute top-5 right-5 px-4 py-2 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-black uppercase rounded-full shadow-lg">
                    For Sale
                  </div>

                  {/* Price Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white font-black text-3xl drop-shadow-2xl">{property.price}</p>
                  </div>
                </div>

                {/* Property Info */}
                <div className="p-7">
                  <div className="mb-5">
                    <h3 className="font-black text-2xl text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {property.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {property.location}, Nairobi
                    </p>
                  </div>

                  {/* Property Stats */}
                  <div className="flex items-center justify-between text-sm mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-white/5 rounded-xl">
                        <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">{property.beds}</p>
                        <p className="text-gray-500 text-xs">Bedrooms</p>
                      </div>
                    </div>
                    
                    <div className="w-px h-12 bg-white/10"></div>
                    
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-white/5 rounded-xl">
                        <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">{property.baths}</p>
                        <p className="text-gray-500 text-xs">Bathrooms</p>
                      </div>
                    </div>
                    
                    <div className="w-px h-12 bg-white/10"></div>
                    
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-white/5 rounded-xl">
                        <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">{property.sqm}</p>
                        <p className="text-gray-500 text-xs">Sq M</p>
                      </div>
                    </div>
                  </div>

                  {/* Property Type Badge & Button */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full">
                      {property.propertyType}
                    </span>
                    
                    <Link
                      to={`/property/${property.id}`}
                      className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transform hover:scale-105 text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-20">
            <Link
              to="/properties"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-xl shadow-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/70 transform hover:scale-105 group text-lg"
            >
              Explore All Properties
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Locations Showcase */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full mb-6 border border-white/10">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-white text-sm font-bold uppercase tracking-widest">Prime Locations</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Nairobi's Most
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Prestigious Areas</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Discover properties in the city's most sought-after neighborhoods
            </p>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Location 1 */}
            <div className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80"
                alt="Westlands"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-black text-white mb-2">Westlands</h3>
                <p className="text-gray-300 mb-4">45 Properties Available</p>
                <Link
                  to="/properties?location=westlands"
                  className="inline-flex items-center gap-2 text-cyan-400 font-bold group-hover:gap-3 transition-all"
                >
                  Explore
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Location 2 */}
            <div className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
                alt="Kilimani"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-black text-white mb-2">Kilimani</h3>
                <p className="text-gray-300 mb-4">32 Properties Available</p>
                <Link
                  to="/properties?location=kilimani"
                  className="inline-flex items-center gap-2 text-cyan-400 font-bold group-hover:gap-3 transition-all"
                >
                  Explore
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Location 3 */}
            <div className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Lavington"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-black text-white mb-2">Lavington</h3>
                <p className="text-gray-300 mb-4">28 Properties Available</p>
                <Link
                  to="/properties?location=lavington"
                  className="inline-flex items-center gap-2 text-cyan-400 font-bold group-hover:gap-3 transition-all"
                >
                  Explore
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Location 4 */}
            <div className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80"
                alt="Runda"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-black text-white mb-2">Runda</h3>
                <p className="text-gray-300 mb-4">18 Properties Available</p>
                <Link
                  to="/properties?location=runda"
                  className="inline-flex items-center gap-2 text-cyan-400 font-bold group-hover:gap-3 transition-all"
                >
                  Explore
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Location 5 */}
            <div className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Kileleshwa"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-black text-white mb-2">Kileleshwa</h3>
                <p className="text-gray-300 mb-4">25 Properties Available</p>
                <Link
                  to="/properties?location=kileleshwa"
                  className="inline-flex items-center gap-2 text-cyan-400 font-bold group-hover:gap-3 transition-all"
                >
                  Explore
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Location 6 */}
            <div className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
                alt="Langata"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-black text-white mb-2">Langata</h3>
                <p className="text-gray-300 mb-4">22 Properties Available</p>
                <Link
                  to="/properties?location=langata"
                  className="inline-flex items-center gap-2 text-cyan-400 font-bold group-hover:gap-3 transition-all"
                >
                  Explore
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full mb-6 border border-white/10">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              <span className="text-white text-sm font-bold uppercase tracking-widest">Why Choose Us</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Premium
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Services</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Experience excellence at every step of your real estate journey
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:bg-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-white mb-3">Verified Listings</h3>
              <p className="text-gray-400 leading-relaxed">Every property is thoroughly vetted and authenticated for your peace of mind</p>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:bg-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-white mb-3">24/7 Support</h3>
              <p className="text-gray-400 leading-relaxed">Round-the-clock assistance from our dedicated team of experts</p>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:bg-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-white mb-3">Best Prices</h3>
              <p className="text-gray-400 leading-relaxed">Competitive rates and transparent pricing with no hidden fees</p>
            </div>

            {/* Feature 4 */}
            <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:bg-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-black text-white mb-3">Quick Process</h3>
              <p className="text-gray-400 leading-relaxed">Streamlined procedures for faster property acquisition and transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full mb-6 border border-white/10">
              <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
              <span className="text-white text-sm font-bold uppercase tracking-widest">Client Stories</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Trusted by
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Thousands</span>
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:bg-white/10">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                  alt="Client"
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
                />
                <div>
                  <h4 className="text-white font-bold text-lg">Sarah Mitchell</h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">"HavenRise made finding our dream home effortless. Professional, responsive, and truly understanding of our needs!"</p>
            </div>

            {/* Testimonial 2 */}
            <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:bg-white/10">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                  alt="Client"
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
                />
                <div>
                  <h4 className="text-white font-bold text-lg">James Omondi</h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">"Exceptional service from start to finish. The team's expertise and dedication exceeded all expectations!"</p>
            </div>

            {/* Testimonial 3 */}
            <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:bg-white/10">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                  alt="Client"
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500"
                />
                <div>
                  <h4 className="text-white font-bold text-lg">Amina Hassan</h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">"Best real estate experience ever! They found the perfect property within our budget and handled everything seamlessly."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80"
            alt="Luxury home interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-white/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <span className="text-white text-sm font-bold uppercase tracking-widest">Start Your Journey</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Find Your
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Dream Home?</span>
            </h2>

            <p className="text-gray-300 text-xl mb-10 leading-relaxed">
              Let our expert team guide you through every step of your real estate journey. From luxury estates to cozy apartments, we have the perfect property waiting for you.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/properties"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transform hover:scale-105 group"
              >
                Browse Properties
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl text-white font-bold rounded-2xl border-2 border-white/20 hover:bg-white/20 transition-all group"
              >
                Contact Us
                <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-xl rounded-3xl p-12 border border-cyan-500/20 shadow-2xl shadow-cyan-500/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="text-4xl font-black text-white mb-4">
                Stay <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Updated</span>
              </h3>
              <p className="text-gray-400 text-lg">
                Get exclusive property listings and market insights delivered to your inbox
              </p>
            </div>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transform hover:scale-105 whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>

            <p className="text-gray-500 text-sm text-center mt-6">
              Join 10,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
            alt="Modern architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full mb-8 border border-white/10">
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm font-bold uppercase tracking-widest">About HavenRise</span>
              </div>

              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                Redefining
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Luxury Living
                </span>
              </h2>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                HavenRise Homes is Nairobi's premier real estate agency, specializing in luxury properties and bespoke real estate solutions. We don't just sell properties—we craft lifestyles.
              </p>

              <p className="text-gray-400 leading-relaxed mb-10">
                With decades of combined industry experience, our team has cultivated lasting relationships built on trust, expertise, and unparalleled service. We understand that your home is more than four walls—it's where your story unfolds.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                  <p className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">500+</p>
                  <p className="text-sm text-gray-400 font-semibold">Properties Listed</p>
                </div>
                <div className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                  <p className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">1K+</p>
                  <p className="text-sm text-gray-400 font-semibold">Happy Clients</p>
                </div>
                <div className="text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                  <p className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">15+</p>
                  <p className="text-sm text-gray-400 font-semibold">Years Excellence</p>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transform hover:scale-105 group"
              >
                Discover Our Story
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Image Side */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Luxury interior"
                  className="w-full h-[600px] object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Floating Stats Cards */}
                <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-black text-lg">Expert Team</p>
                        <p className="text-gray-300 text-xs">Licensed Professionals</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-black text-lg">Verified</p>
                        <p className="text-gray-300 text-xs">100% Authentic Listings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-500/20 rounded-full filter blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default Home