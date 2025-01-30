import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { 
  SparklesIcon, HeartIcon, StarIcon, 
  GlobeAltIcon, UserGroupIcon, ShieldCheckIcon,
  ChevronLeftIcon, ChevronRightIcon 
} from '@heroicons/react/24/outline';
import {
  heroImage1,
  heroImage2,
  heroImage3,
  room1,
  room2,
  room3,
  exp1,
} from '../assets/images';

const features = [
  {
    title: 'Luxury Experience',
    description: 'Indulge in world-class amenities and personalized butler service.',
    icon: <SparklesIcon />,
  },
  {
    title: 'Prime Location',
    description: 'Nestled in paradise with breathtaking ocean and mountain views.',
    icon: <GlobeAltIcon />,
  },
  {
    title: 'Premium Comfort',
    description: 'Meticulously designed spaces for ultimate relaxation and peace.',
    icon: <StarIcon />,
  },
];

const experiences = [
  {
    title: 'Personalized Service',
    description: 'Our dedicated staff ensures your every need is met with excellence.',
    icon: <UserGroupIcon />,
  },
  {
    title: 'Memorable Moments',
    description: 'Create lasting memories with curated experiences and activities.',
    icon: <HeartIcon />,
  },
  {
    title: 'Safe & Secure',
    description: '24/7 security and comprehensive safety measures for peace of mind.',
    icon: <ShieldCheckIcon />,
  },
];

const featuredRooms = [
  {
    id: 1,
    name: 'Ocean View Villa',
    description: 'Luxurious villa with panoramic ocean views and private infinity pool',
    price: 599,
    image: room1,
    amenities: ['Ocean View', 'Private Pool', 'Butler Service']
  },
  {
    id: 2,
    name: 'Garden Suite',
    description: 'Serene suite surrounded by lush tropical gardens and water features',
    price: 399,
    image: room2,
    amenities: ['Garden View', 'Outdoor Bath', 'Spa Access']
  },
  {
    id: 3,
    name: 'Beachfront Bungalow',
    description: 'Direct beach access with private terrace and stunning sunset views',
    price: 799,
    image: room3,
    amenities: ['Beachfront', 'Private Terrace', 'Champagne Bar']
  }
];

const testimonials = [
  {
    name: 'Sarah Thompson',
    role: 'Travel Enthusiast',
    content: 'An absolutely magical experience! The attention to detail and personalized service exceeded all expectations.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200'
  },
  {
    name: 'Michael Chen',
    role: 'Business Executive',
    content: 'The perfect blend of luxury and natural beauty. A truly remarkable getaway that rejuvenates the soul.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Lifestyle Blogger',
    content: 'Every moment was picture-perfect. The staff went above and beyond to make our stay unforgettable.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState([false, false, false]);
  
  const slides = [
    {
      image: heroImage1,
      title: "Luxury Paradise Resort",
      subtitle: "Where dreams meet reality in perfect harmony"
    },
    {
      image: heroImage2,
      title: "Unforgettable Experiences",
      subtitle: "Create memories that last a lifetime"
    },
    {
      image: heroImage3,
      title: "Ultimate Relaxation",
      subtitle: "Your perfect escape awaits"
    }
  ];

  // Preload images
  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!imagesLoaded.every(Boolean)) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[2000ms]"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center text-white px-4">
            <div className="max-w-4xl">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl mb-8 text-white/90"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    to="/book-now"
                    className="btn-primary px-8 py-3"
                  >
                    Book Your Stay
                  </Link>
                  <Link
                    to="/accommodations"
                    className="btn-secondary px-8 py-3"
                  >
                    View Rooms
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
      >
        <ChevronLeftIcon className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
      >
        <ChevronRightIcon className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <HeroSlider />

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-lg"
              >
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                  <div className="w-6 h-6 text-primary-600 dark:text-primary-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Luxury Accommodations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience unparalleled comfort in our meticulously designed rooms and suites
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <LazyLoadImage
                    src={room.image}
                    alt={room.name}
                    effect="blur"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {room.name}
                    </h3>
                    <p className="text-white/90 text-sm">
                      From ${room.price} per night
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {room.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 text-sm rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/room/${room.id}`}
                    className="inline-block w-full text-center btn-primary py-2"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Unforgettable Experiences
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Every moment at our resort is crafted to create lasting memories. From personalized
                service to curated activities, we ensure your stay is nothing short of extraordinary.
              </p>
              <div className="space-y-6">
                {experiences.map((experience, index) => (
                  <motion.div
                    key={experience.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      {experience.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {experience.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {experience.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <LazyLoadImage
                  src={exp1}
                  alt="Resort Experience"
                  effect="blur"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <StarIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      4.9/5
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Guest Rating</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Guest Experiences
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Hear what our guests have to say about their stay
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3"
            alt="Luxury Resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>
        <div className="relative container-custom">
          <div className="max-w-2xl mx-auto text-center text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-6"
            >
              Begin Your Luxury Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8 text-gray-200"
            >
              Book your stay now and discover the perfect blend of luxury, comfort, and natural beauty
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <Link
                to="/book-now"
                className="btn-primary px-8 py-4 text-lg"
              >
                Book Now
              </Link>
              <Link
                to="/contact"
                className="btn-secondary px-8 py-4 text-lg"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
