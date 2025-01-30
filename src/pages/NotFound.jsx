import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="bg-white dark:bg-gray-900 pt-24">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/" className="btn-primary">
              Return Home
            </Link>
            <Link to="/accommodations" className="btn-secondary">
              View Accommodations
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
