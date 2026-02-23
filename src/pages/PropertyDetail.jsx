import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const PropertyDetail = () => {
  const { id } = useParams()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in this property and would like to schedule a viewing.`
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  // Property data (in real app, fetch based on id)
  const properties = {
    1: {
      id: 1,
      title: "Modern Waterfront Villa",
      location: "Lavington",
      fullAddress: "123 Riverside Drive, Lavington, Nairobi",
      price: "KSh 24,500,000",
      beds: 4,
      baths: 3,
      sqm: 320,
      yearBuilt: 2022,
      parking: 3,
      type: "for-sale",
      propertyType: "Villa",
      description: "Stunning modern villa featuring floor-to-ceiling windows, open-plan living spaces, and breathtaking waterfront views. This architectural masterpiece combines contemporary design with luxurious finishes throughout. The property includes a spacious master suite, gourmet kitchen with premium appliances, private garden, and infinity pool overlooking the water.",
      features: [
        "Swimming Pool",
        "Garden",
        "Modern Kitchen",
        "Master En-suite",
        "Walk-in Closets",
        "Balcony",
        "Security System",
        "Backup Generator",
        "Borehole Water",
        "Fiber Internet",
        "Landscaped Garden",
        "Double Glazed Windows"
      ],
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"
      ],
      coordinates: { lat: -1.2921, lng: 36.8219 }
    },
    2: {
      id: 2,
      title: "Downtown Penthouse",
      location: "Westlands",
      fullAddress: "45 Parklands Avenue, Westlands, Nairobi",
      price: "KSh 42,000,000",
      beds: 3,
      baths: 3,
      sqm: 280,
      yearBuilt: 2023,
      parking: 2,
      type: "for-sale",
      propertyType: "Apartment",
      description: "Exclusive penthouse apartment in the heart of Westlands. This sophisticated residence offers panoramic city views, premium finishes, and access to world-class amenities. Features include a spacious terrace, modern kitchen, and luxurious bathrooms with Italian fixtures.",
      features: [
        "Rooftop Terrace",
        "City Views",
        "Gym Access",
        "Swimming Pool",
        "Concierge Service",
        "Secure Parking",
        "High-speed Elevator",
        "24/7 Security",
        "Modern Kitchen",
        "Air Conditioning",
        "Smart Home System",
        "Backup Power"
      ],
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
      ],
      coordinates: { lat: -1.2676, lng: 36.8070 }
    },
    3: {
      id: 3,
      title: "Suburban Family Home",
      location: "Kileleshwa",
      fullAddress: "78 Forest Lane, Kileleshwa, Nairobi",
      price: "KSh 8,750,000",
      beds: 5,
      baths: 4,
      sqm: 410,
      yearBuilt: 2020,
      parking: 2,
      type: "for-sale",
      propertyType: "Bungalow",
      description: "Spacious family home in the quiet suburb of Kileleshwa. Perfect for families seeking comfort and tranquility. The property features large living areas, modern kitchen, private garden, and ample parking.",
      features: [
        "Large Garden",
        "Family Room",
        "Modern Kitchen",
        "Master Suite",
        "Guest Room",
        "Laundry Room",
        "Security Gate",
        "Borehole",
        "Perimeter Wall",
        "Children's Play Area"
      ],
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80"
      ],
      coordinates: { lat: -1.2884, lng: 36.7870 }
    }
  }

  const property = properties[id] || properties[1]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert(`Thank you for your interest in ${property.title}! We'll contact you shortly.`)
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: `I'm interested in this property and would like to schedule a viewing.`
    })
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Link to="/" className="hover:text-neutral-900">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-neutral-900">Properties</Link>
            <span>/</span>
            <span className="text-neutral-900">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Main Image */}
          <div className="mb-4">
            <div className="relative h-[500px] bg-neutral-100 overflow-hidden">
              <img
                src={property.images[selectedImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              <button
                onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : property.images.length - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImage(selectedImage < property.images.length - 1 ? selectedImage + 1 : 0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/70 text-white text-sm">
                {selectedImage + 1} / {property.images.length}
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-24 bg-neutral-100 overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-neutral-900' : 'border-transparent hover:border-neutral-300'
                }`}
              >
                <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Property Details & Contact Form */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-serif text-neutral-900 mb-2">{property.title}</h1>
                    <p className="text-neutral-600 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {property.fullAddress}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-light text-neutral-900">{property.price}</p>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider mt-1">
                      {property.type === 'for-sale' ? 'For Sale' : 'For Rent'}
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-4 gap-6 py-8 border-y border-neutral-200">
                  <div>
                    <p className="text-2xl font-light text-neutral-900 mb-1">{property.beds}</p>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider">Bedrooms</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-neutral-900 mb-1">{property.baths}</p>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider">Bathrooms</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-neutral-900 mb-1">{property.sqm}</p>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider">Sq Meters</p>
                  </div>
                  <div>
                    <p className="text-2xl font-light text-neutral-900 mb-1">{property.parking}</p>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider">Parking</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-serif text-neutral-900 mb-4">About This Property</h2>
                <p className="text-neutral-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Property Details */}
              <div>
                <h2 className="text-2xl font-serif text-neutral-900 mb-6">Property Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex justify-between py-3 border-b border-neutral-200">
                    <span className="text-neutral-600">Property Type</span>
                    <span className="text-neutral-900 font-medium">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-neutral-200">
                    <span className="text-neutral-600">Year Built</span>
                    <span className="text-neutral-900 font-medium">{property.yearBuilt}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-neutral-200">
                    <span className="text-neutral-600">Floor Area</span>
                    <span className="text-neutral-900 font-medium">{property.sqm} m²</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-neutral-200">
                    <span className="text-neutral-600">Parking Spaces</span>
                    <span className="text-neutral-900 font-medium">{property.parking}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-serif text-neutral-900 mb-6">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-neutral-700">
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-2xl font-serif text-neutral-900 mb-6">Location</h2>
                <div className="h-96 bg-neutral-200 border border-neutral-300">
                  <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.202063174595!2d${property.coordinates.lng}!3d${property.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OSczMC44IkU!5e0!3m2!1sen!2ske!4v1234567890`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location"
                  ></iframe>
                </div>
                <p className="mt-4 text-neutral-600">{property.fullAddress}</p>
              </div>
            </div>

            {/* Sidebar - Contact Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white border border-neutral-200 p-8">
                  <h3 className="text-2xl font-serif text-neutral-900 mb-2">Interested in this property?</h3>
                  <p className="text-neutral-600 mb-6">Fill out the form and we'll get back to you shortly.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm text-neutral-700 mb-2 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm text-neutral-700 mb-2 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm text-neutral-700 mb-2 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-500 transition-colors"
                        placeholder="+254 123 456 789"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm text-neutral-700 mb-2 font-medium">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 border border-neutral-300 text-neutral-900 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                        placeholder="I'm interested in scheduling a viewing..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Request Information
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Contact Info */}
                  <div className="mt-8 pt-8 border-t border-neutral-200 space-y-4">
                    <div className="flex items-center gap-3 text-neutral-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+254728686089</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>havenrise.realty25@gmail.com</span>
                    </div>
                  </div>
                </div>

                {/* Share */}
                <div className="mt-6 bg-neutral-100 border border-neutral-200 p-6">
                  <p className="text-sm text-neutral-600 mb-3 font-medium uppercase tracking-wider">Share This Property</p>
                  <div className="flex gap-2">
                    <button className="flex-1 p-3 bg-white border border-neutral-300 hover:bg-neutral-50 transition-colors">
                      <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="flex-1 p-3 bg-white border border-neutral-300 hover:bg-neutral-50 transition-colors">
                      <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button className="flex-1 p-3 bg-white border border-neutral-300 hover:bg-neutral-50 transition-colors">
                      <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-neutral-900 mb-8">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.values(properties).filter(p => p.id !== property.id).slice(0, 3).map((similarProp) => (
              <Link
                key={similarProp.id}
                to={`/property/${similarProp.id}`}
                className="group bg-white border border-neutral-200 hover:shadow-xl transition-all"
              >
                <div className="relative h-64 bg-neutral-100 overflow-hidden">
                  <img
                    src={similarProp.images[0]}
                    alt={similarProp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-light text-xl">{similarProp.price}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-neutral-900 mb-2">{similarProp.title}</h3>
                  <p className="text-neutral-500 text-sm mb-4">{similarProp.location}, Nairobi</p>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <span>{similarProp.beds} Beds</span>
                    <span>•</span>
                    <span>{similarProp.baths} Baths</span>
                    <span>•</span>
                    <span>{similarProp.sqm} m²</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PropertyDetail