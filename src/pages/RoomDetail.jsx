import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { CalendarIcon, WifiIcon, TvIcon, HomeIcon } from '@heroicons/react/24/outline';

const rooms = {
  1: {
    id: 1,
    name: 'Ocean View Villa',
    description: 'Experience ultimate luxury in our Ocean View Villa. This spacious accommodation features a private infinity pool overlooking the crystal-clear waters, a fully-equipped kitchen, and a dedicated butler service. Perfect for those seeking privacy and unparalleled comfort.',
    price: 599,
    type: 'villa',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80'
    ],
    amenities: [
      'Ocean View',
      'Private Pool',
      'Butler Service',
      'Wi-Fi',
      'Air Conditioning',
      'King Size Bed',
      'Private Terrace',
      'Mini Bar',
      'Room Service',
      'Spa Bath'
    ],
    size: '200 sq m',
    maxOccupancy: 4
  },
  2: {
    id: 2,
    name: 'Garden Suite',
    description: 'Immerse yourself in tranquility in our Garden Suite. Surrounded by lush tropical gardens, this suite offers a peaceful retreat with its outdoor bath, private meditation area, and direct access to our world-class spa facilities.',
    price: 399,
    type: 'suite',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80'
    ],
    amenities: [
      'Garden View',
      'Outdoor Bath',
      'Spa Access',
      'Wi-Fi',
      'Air Conditioning',
      'Queen Size Bed',
      'Meditation Area',
      'Mini Bar',
      'Room Service',
      'Rain Shower'
    ],
    size: '120 sq m',
    maxOccupancy: 2
  },
  3: {
    id: 3,
    name: 'Beachfront Bungalow',
    description: 'Step directly onto pristine white sands from your Beachfront Bungalow. This luxurious accommodation features a private terrace with stunning sunset views, a champagne bar, and exclusive beach amenities. The perfect choice for beach lovers seeking luxury.',
    price: 799,
    type: 'bungalow',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80'
    ],
    amenities: [
      'Beachfront',
      'Private Terrace',
      'Champagne Bar',
      'Wi-Fi',
      'Air Conditioning',
      'King Size Bed',
      'Beach Service',
      'Mini Bar',
      'Room Service',
      'Outdoor Shower'
    ],
    size: '150 sq m',
    maxOccupancy: 3
  },
  4: {
    id: 4,
    name: 'Royal Penthouse',
    description: 'Experience the pinnacle of luxury in our Royal Penthouse. Located at the top floor, it offers breathtaking panoramic views, a private helipad, personal chef service, and the ultimate in privacy and sophistication.',
    price: 999,
    type: 'penthouse',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80'
    ],
    amenities: [
      'Panoramic View',
      'Private Chef',
      'Helipad Access',
      'Wi-Fi',
      'Air Conditioning',
      'Master Suite',
      'Private Bar',
      'Butler Service',
      'Room Service',
      'Private Pool'
    ],
    size: '300 sq m',
    maxOccupancy: 6
  }
};

export default function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms[id];
  const [selectedImage, setSelectedImage] = useState(0);

  if (!room) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold dark:text-white">Room not found</h2>
        <Link to="/accommodations" className="btn-primary mt-4">
          View All Accommodations
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Room Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {room.name}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <HomeIcon className="h-5 w-5" />
                {room.size}
              </span>
              <span>•</span>
              <span>Up to {room.maxOccupancy} guests</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                <LazyLoadImage
                  src={room.gallery[selectedImage]}
                  alt={`${room.name} view ${selectedImage + 1}`}
                  effect="blur"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {room.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-16 aspect-h-9 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <LazyLoadImage
                      src={image}
                      alt={`${room.name} view ${index + 1}`}
                      effect="blur"
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Section */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl h-fit lg:sticky lg:top-24">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  ${room.price}
                  <span className="text-base font-normal text-gray-600 dark:text-gray-400">
                    /night
                  </span>
                </h2>
              </div>

              <button
                onClick={() => navigate('/book-now')}
                className="w-full btn-primary"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Room Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About this room
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {room.description}
              </p>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <WifiIcon className="h-5 w-5" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
