import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

const restaurants = [
  {
    id: 1,
    name: 'Ocean Vista',
    description: 'Fine dining with panoramic ocean views. Experience exquisite seafood and international cuisine prepared by our world-class chefs.',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=853&q=80',
    cuisine: 'International',
    priceRange: '$$$',
    hours: '6:00 PM - 11:00 PM',
    dress: 'Smart Elegant'
  },
  {
    id: 2,
    name: 'Beach House Grill',
    description: 'Casual beachfront dining featuring fresh grilled seafood, steaks, and tropical cocktails in a relaxed atmosphere.',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=853&q=80',
    cuisine: 'Grill & Seafood',
    priceRange: '$$',
    hours: '11:00 AM - 10:00 PM',
    dress: 'Smart Casual'
  },
  {
    id: 3,
    name: 'Zen Garden',
    description: 'Contemporary Asian fusion in a serene garden setting. Experience the perfect blend of traditional and modern Asian flavors.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&h=853&q=80',
    cuisine: 'Asian Fusion',
    priceRange: '$$$',
    hours: '5:30 PM - 10:30 PM',
    dress: 'Smart Casual'
  }
];

export default function Dining() {
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
              Culinary Excellence
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Embark on a gastronomic journey through our world-class restaurants,
              where each venue offers a unique dining experience crafted by renowned chefs.
            </p>
          </div>

          {/* Restaurants */}
          <div className="space-y-24">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                  <LazyLoadImage
                    src={restaurant.image}
                    alt={restaurant.name}
                    effect="blur"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {restaurant.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {restaurant.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Cuisine
                      </h3>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {restaurant.cuisine}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Price Range
                      </h3>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {restaurant.priceRange}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Hours
                      </h3>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {restaurant.hours}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Dress Code
                      </h3>
                      <p className="mt-1 text-gray-900 dark:text-white">
                        {restaurant.dress}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/book-dining"
                      className="btn-primary w-full text-center"
                    >
                      Book Table
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
