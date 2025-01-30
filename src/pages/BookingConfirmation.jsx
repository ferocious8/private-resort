import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function BookingConfirmation() {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return <Navigate to="/accommodations" replace />;
  }

  return (
    <div className="bg-white dark:bg-gray-900 pt-24">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Thank you for choosing our resort. Your booking has been confirmed.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Booking Details
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Booking ID</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.bookingId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Room Type</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.roomName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Check-in</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.checkIn.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Check-out</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.checkOut.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Guest Name</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.firstName} {booking.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Number of Guests</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.guests}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {booking.phone}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${booking.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              A confirmation email has been sent to {booking.email}
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/account" className="btn-primary">
                View My Bookings
              </Link>
              <Link to="/" className="btn-secondary">
                Return to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
