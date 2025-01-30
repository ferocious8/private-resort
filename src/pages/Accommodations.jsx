import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RoomSearch from '../components/RoomSearch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const rooms = [
  {
    id: 1,
    name: 'Ocean View Villa',
    description: 'Experience ultimate luxury with panoramic ocean views.',
    price: 599,
    type: 'villa',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    amenities: ['Private Pool', 'Ocean View', 'Butler Service', 'Wi-Fi', 'Air Conditioning']
  },
  {
    id: 2,
    name: 'Garden Suite',
    description: 'Immerse yourself in tranquility surrounded by lush tropical gardens.',
    price: 399,
    type: 'suite',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    amenities: ['Garden View', 'Private Terrace', 'Spa Access', 'Wi-Fi', 'Air Conditioning']
  },
  {
    id: 3,
    name: 'Beachfront Bungalow',
    description: 'Step directly onto pristine white sands from your private paradise.',
    price: 799,
    type: 'bungalow',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    amenities: ['Beachfront', 'Private Pool', 'Butler Service', 'Wi-Fi', 'Air Conditioning']
  },
  {
    id: 4,
    name: 'Royal Penthouse',
    description: 'Experience the pinnacle of luxury with panoramic views.',
    price: 999,
    type: 'penthouse',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80',
    amenities: ['Panoramic View', 'Private Pool', 'Butler Service', 'Wi-Fi', 'Air Conditioning']
  }
];

export default function Accommodations() {
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  const handleSearch = (filters) => {
    const filtered = rooms.filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          room.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPrice = room.price >= filters.priceRange[0] && room.price <= filters.priceRange[1];
      const matchesType = filters.type === 'all' || room.type === filters.type;
      const matchesAmenities = filters.amenities.length === 0 || 
                              filters.amenities.every(amenity => 
                                room.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
                              );

      return matchesSearch && matchesPrice && matchesType && matchesAmenities;
    });

    setFilteredRooms(filtered);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Search Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Find Your Perfect Stay
            </h2>
            <RoomSearch onSearch={handleSearch} />
          </div>

          {/* Results Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-w-16 aspect-h-9">
                  <LazyLoadImage
                    src={room.image}
                    alt={room.name}
                    effect="blur"
                    className="object-cover w-full h-full"
                    wrapperClassName="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {room.name}
                    </h3>
                    <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                      ${room.price}
                      <span className="text-sm text-gray-500 dark:text-gray-400">/night</span>
                    </p>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {room.description}
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Amenities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="mt-6">
                      <Link
                        to={`/room/${room.id}`}
                        className="btn-primary w-full text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                No rooms found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
