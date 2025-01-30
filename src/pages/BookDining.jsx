import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const restaurants = [
  {
    id: 1,
    name: 'Ocean Vista',
    description: 'Fine dining with panoramic ocean views',
    cuisine: 'International',
    priceRange: '$$$',
    maxGuests: 8
  },
  {
    id: 2,
    name: 'Beach House Grill',
    description: 'Casual beachfront dining experience',
    cuisine: 'Seafood & Grill',
    priceRange: '$$',
    maxGuests: 10
  },
  {
    id: 3,
    name: 'Zen Garden',
    description: 'Asian fusion in a serene garden setting',
    cuisine: 'Asian Fusion',
    priceRange: '$$$',
    maxGuests: 6
  }
];

export default function BookDining() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantId: '',
    date: null,
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the booking submission
    navigate('/booking-confirmation', {
      state: {
        booking: {
          ...formData,
          type: 'dining',
          bookingId: Math.random().toString(36).substr(2, 9),
          restaurantName: restaurants.find(rest => rest.id.toString() === formData.restaurantId)?.name
        }
      }
    });
  };

  const availableTimes = [
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
  ];

  return (
    <div className="bg-white dark:bg-gray-900 pt-24">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Reserve a Table
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience exceptional dining at our world-class restaurants
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Restaurant
                  </label>
                  <select
                    value={formData.restaurantId}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, restaurantId: e.target.value }))
                    }
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">Select a restaurant</option>
                    {restaurants.map((rest) => (
                      <option key={rest.id} value={rest.id}>
                        {rest.name} - {rest.priceRange}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <DatePicker
                    selected={formData.date}
                    onChange={(date) =>
                      setFormData((prev) => ({ ...prev, date }))
                    }
                    minDate={new Date()}
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholderText="Select date"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, time: e.target.value }))
                    }
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">Select a time</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, guests: e.target.value }))
                    }
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))
                    }
                    rows={3}
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Any dietary requirements or special occasions?"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3"
                  disabled={!formData.restaurantId || !formData.date || !formData.time}
                >
                  Reserve Table
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurants.map((rest) => (
              <motion.div
                key={rest.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {rest.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {rest.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Cuisine: {rest.cuisine}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Price Range: {rest.priceRange}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Max Party Size: {rest.maxGuests}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, restaurantId: rest.id.toString() }));
                    document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full btn-secondary mt-4"
                >
                  Select Restaurant
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
