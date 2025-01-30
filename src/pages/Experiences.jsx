import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

const experiences = [
  {
    id: 1,
    name: 'Sunset Sailing',
    description: 'Embark on a luxurious sailing adventure as you watch the sun paint the sky in brilliant hues. Enjoy champagne and canapés while our experienced crew guides you through pristine waters.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=853&q=80',
    duration: '3 hours',
    price: '$299 per couple',
    includes: ['Luxury yacht cruise', 'Champagne & canapés', 'Professional crew', 'Sunset viewing']
  },
  {
    id: 2,
    name: 'Spa Retreat',
    description: 'Immerse yourself in pure relaxation at our world-class spa. Our expert therapists combine ancient healing traditions with modern techniques for a truly transformative experience.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=853&q=80',
    duration: '2-4 hours',
    price: 'From $199',
    includes: ['Massage therapy', 'Wellness consultation', 'Access to spa facilities', 'Herbal refreshments']
  },
  {
    id: 3,
    name: 'Island Adventure',
    description: 'Discover hidden coves, pristine beaches, and vibrant coral reefs on this guided island expedition. Perfect for nature lovers and adventure seekers.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=853&q=80',
    duration: '6 hours',
    price: '$179 per person',
    includes: ['Guided tour', 'Snorkeling gear', 'Gourmet picnic lunch', 'Transportation']
  },
  {
    id: 4,
    name: 'Culinary Masterclass',
    description: 'Learn the secrets of tropical cuisine from our master chefs. This hands-on experience includes ingredient selection, cooking techniques, and wine pairing.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=853&q=80',
    duration: '4 hours',
    price: '$249 per person',
    includes: ['Cooking instruction', 'Recipe book', 'Wine pairing', 'Gourmet lunch']
  }
];

export default function Experiences() {
  return (
    <div className="bg-white dark:bg-gray-900 pt-24">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Unforgettable Experiences
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover extraordinary adventures and create lasting memories with our
              curated collection of exclusive experiences.
            </p>
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <LazyLoadImage
                    src={experience.image}
                    alt={experience.name}
                    effect="blur"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {experience.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {experience.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Duration
                      </h3>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {experience.duration}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Price
                      </h3>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {experience.price}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Includes
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                      {experience.includes.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/book-experience"
                      className="btn-primary w-full text-center"
                    >
                      Book Experience
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
