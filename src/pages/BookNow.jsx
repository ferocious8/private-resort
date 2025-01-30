import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { WifiIcon, TvIcon, HomeIcon, SparklesIcon } from '@heroicons/react/24/outline';

import oceanView from '../assets/images/rooms/ocean-view.jpg';
import gardenSuite from '../assets/images/rooms/garden-suite.jpg';
import beachfront from '../assets/images/rooms/beachfront.jpg';
import penthouse from '../assets/images/rooms/penthouse.jpg';

const rooms = [
  { 
    id: 1, 
    name: 'Ocean View Villa', 
    price: 599,
    image: oceanView,
    description: 'Luxurious villa with panoramic ocean views',
    amenities: ['Ocean View', 'King Bed', 'Private Pool', 'WiFi'],
    maxGuests: 4
  },
  { 
    id: 2, 
    name: 'Garden Suite', 
    price: 399,
    image: gardenSuite,
    description: 'Peaceful suite surrounded by tropical gardens',
    amenities: ['Garden View', 'Queen Bed', 'Balcony', 'WiFi'],
    maxGuests: 3
  },
  { 
    id: 3, 
    name: 'Beachfront Bungalow', 
    price: 799,
    image: beachfront,
    description: 'Direct beach access with private terrace',
    amenities: ['Beach Access', 'King Bed', 'Private Terrace', 'WiFi'],
    maxGuests: 4
  },
  { 
    id: 4, 
    name: 'Royal Penthouse', 
    price: 999,
    image: penthouse,
    description: 'Ultimate luxury with panoramic resort views',
    amenities: ['360° Views', 'King Bed', 'Private Pool', 'Butler Service'],
    maxGuests: 6
  }
];

const getAmenityIcon = (amenity) => {
  switch (amenity.toLowerCase()) {
    case 'wifi':
      return <WifiIcon className="w-5 h-5" />;
    case 'tv':
      return <TvIcon className="w-5 h-5" />;
    default:
      return <SparklesIcon className="w-5 h-5" />;
  }
};

export default function BookNow() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomType: '',
    checkIn: null,
    checkOut: null,
    guests: '2'
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (formData.checkIn && formData.checkOut && formData.roomType) {
      const days = Math.ceil(
        (formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24)
      );
      const room = rooms.find(r => r.id.toString() === formData.roomType);
      setTotalPrice(room ? room.price * days : 0);
    }
  }, [formData.checkIn, formData.checkOut, formData.roomType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.roomType && formData.checkIn && formData.checkOut) {
      navigate(`/booking/${formData.roomType}`, {
        state: {
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests,
          totalPrice
        }
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 pt-24">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Book Your Stay
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience luxury and tranquility at our private resort
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    currentStep >= step 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`h-1 w-16 mx-2 ${
                      currentStep > step ? 'bg-primary-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Type
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, roomType: e.target.value }));
                      setCurrentStep(2);
                    }}
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">Select a room</option>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} - ${room.price}/night
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Check-in Date
                  </label>
                  <DatePicker
                    selected={formData.checkIn}
                    onChange={(date) => {
                      setFormData((prev) => ({ ...prev, checkIn: date }));
                      setCurrentStep(2);
                    }}
                    selectsStart
                    startDate={formData.checkIn}
                    endDate={formData.checkOut}
                    minDate={new Date()}
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholderText="Select date"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Check-out Date
                  </label>
                  <DatePicker
                    selected={formData.checkOut}
                    onChange={(date) => {
                      setFormData((prev) => ({ ...prev, checkOut: date }));
                      setCurrentStep(3);
                    }}
                    selectsEnd
                    startDate={formData.checkIn}
                    endDate={formData.checkOut}
                    minDate={formData.checkIn || new Date()}
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholderText="Select date"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, guests: e.target.value }))
                    }
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {totalPrice > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Total Price
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Including all taxes and fees
                      </p>
                    </div>
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                      ${totalPrice}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3 text-lg"
                  disabled={!formData.roomType || !formData.checkIn || !formData.checkOut}
                >
                  Proceed to Booking
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="object-cover w-full h-64"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {room.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {room.description}
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      ${room.price}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        /night
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      >
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{amenity}</span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Max {room.maxGuests} guests
                    </span>
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, roomType: room.id.toString() }));
                        document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
                        setCurrentStep(2);
                      }}
                      className="btn-secondary py-2 px-6"
                    >
                      Select Room
                    </button>
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
