import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon, UserIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const rooms = {
  1: {
    id: 1,
    name: 'Ocean View Villa',
    price: 599,
  },
  2: {
    id: 2,
    name: 'Garden Suite',
    price: 399,
  },
  3: {
    id: 3,
    name: 'Beachfront Bungalow',
    price: 799,
  },
  4: {
    id: 4,
    name: 'Royal Penthouse',
    price: 999,
  },
};

export default function Booking() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const room = rooms[roomId];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: 1,
    specialRequests: '',
    checkIn: location.state?.checkIn || null,
    checkOut: location.state?.checkOut || null,
  });

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!room) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold dark:text-white">Room not found</h2>
        <button
          onClick={() => navigate('/accommodations')}
          className="btn-primary mt-4"
        >
          View All Accommodations
        </button>
      </div>
    );
  }

  const calculateTotal = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const nights = Math.ceil(
      (formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24)
    );
    return room.price * nights;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Navigate to confirmation
    navigate('/booking-confirmation', {
      state: {
        booking: {
          ...formData,
          roomName: room.name,
          totalPrice: calculateTotal(),
          bookingId: Math.random().toString(36).substr(2, 9).toUpperCase(),
        },
      },
    });
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.checkIn && formData.checkOut;
      case 2:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      default:
        return true;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 pt-24">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Booking Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Book Your Stay
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Complete your reservation for {room.name}
            </p>
          </div>

          {/* Booking Progress */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex justify-between">
              {['Dates', 'Details', 'Payment'].map((label, index) => (
                <div
                  key={label}
                  className={`flex-1 text-center ${
                    index + 1 === step
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      index + 1 === step
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                          placeholderText="Select date"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                          placeholderText="Select date"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Number of Guests
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Special Requests
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                        placeholder="Any special requests or preferences?"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Booking Summary
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Room</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {room.name}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Dates</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formData.checkIn?.toLocaleDateString()} -{' '}
                            {formData.checkOut?.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Guests</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {formData.guests}
                          </span>
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                          <div className="flex justify-between">
                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                              Total
                            </span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ${calculateTotal()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((prev) => prev - 1)}
                      className="btn-secondary"
                    >
                      Previous
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep((prev) => prev + 1)}
                      disabled={!isStepValid()}
                      className="btn-primary ml-auto"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isProcessing || !isStepValid()}
                      className="btn-primary ml-auto"
                    >
                      {isProcessing ? 'Processing...' : 'Complete Booking'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
