import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { rooms } from '../data/rooms';

export default function BookNow() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomType: '',
    checkIn: null,
    checkOut: null,
    guests: '2'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.roomType && formData.checkIn && formData.checkOut) {
      navigate(`/booking/${formData.roomType}`, {
        state: {
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          guests: formData.guests
        }
      });
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-24" id="book-now">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Book Your Stay
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience luxury and tranquility at our private resort
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Type
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, roomType: e.target.value }))
                    }
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
                    onChange={(date) =>
                      setFormData((prev) => ({ ...prev, checkIn: date }))
                    }
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
                    onChange={(date) =>
                      setFormData((prev) => ({ ...prev, checkOut: date }))
                    }
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

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3"
                  disabled={!formData.roomType || !formData.checkIn || !formData.checkOut}
                >
                  Check Availability
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {room.description}
                  </p>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                    ${room.price}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      /night
                    </span>
                  </p>
                  <button
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, roomType: room.id.toString() }));
                      document.getElementById('book-now').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full btn-secondary"
                  >
                    Select Room
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
