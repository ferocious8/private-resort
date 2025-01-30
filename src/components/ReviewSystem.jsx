import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/20/solid';

export function StarRating({ rating, setRating, disabled }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`h-6 w-6 ${
            star <= rating
              ? 'text-yellow-400'
              : 'text-gray-300 dark:text-gray-600'
          } ${!disabled && 'cursor-pointer'}`}
          onClick={() => !disabled && setRating(star)}
        />
      ))}
    </div>
  );
}

export function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment, date: new Date().toISOString() });
    setComment('');
    setRating(5);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating
        </label>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-lg resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows="4"
          required
          placeholder="Share your experience..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
      >
        Submit Review
      </button>
    </motion.form>
  );
}

export function ReviewList({ reviews }) {
  return (
    <div className="space-y-6">
      <AnimatePresence>
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-300 font-medium">
                    {review.author?.[0] || 'A'}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {review.author || 'Anonymous'}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <StarRating rating={review.rating} disabled />
            </div>
            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function ReviewSystem({ roomId }) {
  const [reviews, setReviews] = useState([]);

  const handleSubmitReview = (review) => {
    const newReview = {
      id: Date.now().toString(),
      ...review,
      author: 'Guest', // In a real app, this would come from authentication
    };
    setReviews(prev => [newReview, ...prev]);
  };

  return (
    <div className="space-y-8">
      <ReviewForm onSubmit={handleSubmitReview} />
      <ReviewList reviews={reviews} />
    </div>
  );
}
