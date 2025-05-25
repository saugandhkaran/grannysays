import React from 'react';
import StoryImage from '../../src/images/story.png';
import Link from 'next/link';
import Image from 'next/image';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-green-100 to-blue-100 py-16 md:py-24 overflow-hidden rounded-b-xl shadow-lg">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Hero Text Content */}
          <div className="md:w-1/2 text-center md:text-left z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-green-800 leading-tight mb-6 animate-fade-in-up">
              Granny Says: <br className="hidden md:block" /> Wisdom from Around the World
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto md:mx-0 animate-fade-in-up delay-200">
              Discover a treasure trove of timeless tips and tricks for food, health, gardening, and more, shared by grandmothers from every corner of the globe.
            </p>
            <Link href="/tips" className="inline-block">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in-up delay-400">
              Explore Granny's Wisdom
            </button>
            </Link>
          </div>
          {/* Hero Image */}
          <div className="md:w-1/2 flex justify-center md:justify-end z-10">
            {/* <img
              src={images.hero}
              alt="Diverse grandmothers sharing tips"
              className="w-full max-w-md md:max-w-xl h-auto object-cover rounded-3xl shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500"
              onError={(e) => { e.target.onerror = null; e.target.src = images.placeholder; }}
            /> */}
          </div>
        </div>
      </section>

      {/* Featured Topics Section */}
      <section id="topics" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-green-800 mb-12">
            Explore Timeless Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Topic Card: Food */}
            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
              {/* <img
                src={images.food}
                alt="Delicious food dishes"
                className="w-full h-48 object-cover group-hover:brightness-90 transition-all duration-300"
                onError={(e) => { e.target.onerror = null; e.target.src = images.placeholder; }}
              /> */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-700 mb-2">Food & Recipes</h3>
                <p className="text-gray-600 text-sm">
                  Delicious recipes and cooking secrets passed down through generations from grandmas worldwide.
                </p>
              </div>
            </div>

            {/* Topic Card: Health & Exercise */}
            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
              {/* <img
                src={images.health}
                alt="Grandmothers sharing health tips"
                className="w-full h-48 object-cover group-hover:brightness-90 transition-all duration-300"
                onError={(e) => { e.target.onerror = null; e.target.src = images.placeholder; }}
              /> */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-700 mb-2">Health & Wellness</h3>
                <p className="text-gray-600 text-sm">
                  Natural remedies, gentle exercises, and holistic wisdom for a healthy and fulfilling life.
                </p>
                
              </div>
            </div>

            {/* Topic Card: Gardening */}
            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
              {/* <img
                src={images.gardening}
                alt="Grandmothers gardening"
                className="w-full h-48 object-cover group-hover:brightness-90 transition-all duration-300"
                onError={(e) => { e.target.onerror = null; e.target.src = images.placeholder; }}
              /> */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-700 mb-2">Gardening Gurus</h3>
                <p className="text-gray-600 text-sm">
                  Green thumb secrets for growing beautiful gardens and bountiful harvests, shared by seasoned gardeners.
                </p>
                
              </div>
            </div>

            {/* Topic Card: Tooling & Home */}
            <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
              {/* <img
                src={images.placeholder} // Using placeholder as no specific image was generated for tooling
                alt="Tooling and home tips"
                className="w-full h-48 object-cover group-hover:brightness-90 transition-all duration-300"
              /> */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-700 mb-2">Home & Tooling</h3>
                <p className="text-gray-600 text-sm">
                  Practical advice for home repairs, clever DIY projects, and maintaining a cozy living space.
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-20 bg-green-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-center text-green-800 mb-12">
            What Our Community Says
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-green-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
              <p className="text-lg text-gray-700 italic mb-4">
                "Granny Says is a goldmine! I found the best natural remedy for my persistent cough here. Truly grateful!"
              </p>
              <p className="font-semibold text-green-700">- Maria S. from Spain</p>
            </div>
            {/* Testimonial Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-green-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
              <p className="text-lg text-gray-700 italic mb-4">
                "The gardening tips from the Japanese grandmas helped my bonsai thrive like never before. Amazing wisdom!"
              </p>
              <p className="font-semibold text-green-700">- Kenji T. from Japan</p>
            </div>
            {/* Testimonial Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-green-100 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
              <p className="text-lg text-gray-700 italic mb-4">
                "I never knew cooking could be so simple and delicious until I tried the Indian recipes. Thank you, Granny Says!"
              </p>
              <p className="font-semibold text-green-700">- Aisha K. from India</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us / Call to Action Section */}
      <section id="about" className="py-16 md:py-20 bg-gradient-to-tr from-green-100 to-blue-100 rounded-t-xl shadow-lg">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-green-800 mb-8">
            Our Mission: Preserving Wisdom
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            At Granny Says, we believe in the invaluable wisdom passed down through generations. Our mission is to create a global hub where traditional knowledge, practical tips, and heartwarming advice from grandmothers across cultures can be shared and cherished. Join our community and help us preserve this precious heritage!
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
            Share Your Granny's Wisdom
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;