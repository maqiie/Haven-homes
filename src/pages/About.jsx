import { Link } from "react-router-dom"

function About() {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')] bg-cover bg-center flex items-center justify-center">
        <div className="bg-black/60 absolute inset-0"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">About HavenRise</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Redefining modern real estate with luxury, trust, and innovation.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
          alt="Modern Home"
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At HavenRise, we believe everyone deserves a place they can call home.
            Our mission is to connect buyers and renters with premium properties
            through a seamless and transparent experience.
          </p>
          <p className="text-gray-600">
            We combine technology, market expertise, and exceptional service
            to deliver unmatched value in the real estate industry.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose HavenRise</h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Trusted Expertise</h3>
            <p className="text-gray-600">
              Years of industry experience helping clients make confident
              property decisions.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Premium Listings</h3>
            <p className="text-gray-600">
              Carefully curated properties that meet modern lifestyle standards.
            </p>
          </div>

          <div className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Client First Approach</h3>
            <p className="text-gray-600">
              Transparent communication and personalized support from start to finish.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-blue-600 text-white text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p>Properties Listed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">300+</h3>
            <p>Happy Clients</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">10+</h3>
            <p>Years Experience</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Find Your Dream Home?
        </h2>
        <p className="text-gray-600 mb-6">
          Browse our exclusive listings and discover premium properties today.
        </p>
        <Link
          to="/properties"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          View Properties
        </Link>
      </section>

    </div>
  )
}

export default About