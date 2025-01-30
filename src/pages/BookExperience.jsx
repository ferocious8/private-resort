import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const experiences = [
  {
    id: 1,
    name: 'Sunset Sailing',
    description: 'Experience the magic of sunset on a private yacht cruise',
    price: 299,
    duration: '3 hours',
    maxGuests: 6
  },
  {
    id: 2,
    name: 'Spa Retreat',
    description: 'Indulge in a luxurious spa day with massage and treatments',
    price: 199,
    duration: '2 hours',
    maxGuests: 2
  },
  {
    id: 3,
    name: 'Island Adventure',
    description: 'Explore hidden beaches and snorkel in crystal clear waters',
    price: 249,
    duration: '6 hours',
    maxGuests: 8
  },
  {
    id: 4,
    name: 'Culinary Masterclass',
    description: 'Learn to cook local delicacies with our master chef',
    price: 179,
    duration: '3 hours',
    maxGuests: 4
  }
];

export default function BookExperience() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    experienceId: '',
    date: null,
    time: '',
    guests: '2'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the booking submission
    navigate('/booking-confirmation', {
      state: {
        booking: {
          ...formData,
          type: 'experience',
          bookingId: Math.random().toString(36).substr(2, 9),
          experienceName: experiences.find(exp => exp.id.toString() === formData.experienceId)?.name
        }
      }
    });
  };

  const availableTimes = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
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
              Book an Experience
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Create unforgettable memories with our curated experiences
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience
                  </label>
                  <select
                    value={formData.experienceId}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, experienceId: e.target.value }))
                    }
                    className="w-full rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">Select an experience</option>
                    {experiences.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.name} - ${exp.price}
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
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3"
                  disabled={!formData.experienceId || !formData.date || !formData.time}
                >
                  Book Experience
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {exp.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {exp.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Duration: {exp.duration}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Max Guests: {exp.maxGuests}
                    </p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      ${exp.price}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        /person
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, experienceId: exp.id.toString() }));
                    document.querySelector('form').scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full btn-secondary mt-4"
                >
                  Select Experience
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
