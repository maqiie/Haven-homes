import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)

  const forSaleTypes = [
    'Apartments For Sale',
    'Bungalows For Sale',
    'Townhouses For Sale',
    'Land For Sale',
    'Commercial Property For Sale'
  ]

  const forRentTypes = [
    'Apartments For Rent',
    'Townhouses For Rent',
    'Office Spaces For Rent'
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900">HavenRise</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Homes</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>

            {/* Properties For Sale Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('sale')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
                Properties For Sale
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openDropdown === 'sale' && (
                <div className="absolute top-full left-0 mt-0 w-64 bg-white border border-gray-200 shadow-lg rounded-b-lg">
                  {forSaleTypes.map((type, index) => (
                    <Link
                      key={index}
                      to="/properties"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-0"
                    >
                      {type}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Properties To Let Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('rent')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
                Properties To Let
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {openDropdown === 'rent' && (
                <div className="absolute top-full left-0 mt-0 w-64 bg-white border border-gray-200 shadow-lg rounded-b-lg">
                  {forRentTypes.map((type, index) => (
                    <Link
                      key={index}
                      to="/properties"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors border-b border-gray-100 last:border-0"
                    >
                      {type}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contact"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/properties"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              All Properties
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar