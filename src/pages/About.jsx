import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { StarIcon, GlobeAltIcon, HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        <div 
          className="h-[70vh] bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3')"
          }}
        >
          <div className="container-custom h-full flex items-center relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Our Story of <span className="text-primary-400">Luxury</span> & <span className="text-primary-400">Excellence</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Creating unforgettable experiences since 2010
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.img
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3"
                  alt="Resort view"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold mb-6 gradient-text">Our Vision</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    To be the epitome of luxury hospitality, where every stay becomes a cherished memory. 
                    We strive to create an environment where luxury meets nature, and where exceptional 
                    service meets genuine care for our guests.
                  </p>
                  <h2 className="text-3xl font-bold mb-6 gradient-text">Our Mission</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    To provide unparalleled experiences through personalized service, sustainable practices, 
                    and a deep commitment to both our guests and the environment. We aim to set new standards 
                    in luxury hospitality while preserving the natural beauty that surrounds us.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Our Core Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-8 text-center"
              >
                <div className="h-12 w-12 mx-auto mb-6 text-primary-600 dark:text-primary-400">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 gradient-text">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Meet the people who make luxury happen
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="relative mb-6 rounded-full overflow-hidden mx-auto w-48 h-48">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const values = [
  {
    title: 'Excellence',
    description: 'Striving for perfection in every detail of our service and amenities.',
    icon: <StarIcon className="w-full h-full" />,
  },
  {
    title: 'Sustainability',
    description: 'Committed to preserving our environment for future generations.',
    icon: <GlobeAltIcon className="w-full h-full" />,
  },
  {
    title: 'Hospitality',
    description: 'Genuine care and personalized attention for every guest.',
    icon: <HeartIcon className="w-full h-full" />,
  },
  {
    title: 'Innovation',
    description: 'Continuously evolving to exceed modern luxury standards.',
    icon: <SparklesIcon className="w-full h-full" />,
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'General Manager',
    description: 'With 15 years of luxury hospitality experience, Sarah ensures every guest receives exceptional service.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500',
  },
  {
    name: 'Michael Chen',
    role: 'Executive Chef',
    description: 'A Michelin-starred chef bringing culinary excellence to our dining experience.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Spa Director',
    description: 'Expert in holistic wellness with a passion for creating rejuvenating experiences.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500',
  },
  {
    name: 'James Wilson',
    role: 'Operations Director',
    description: 'Ensuring seamless resort operations while maintaining our high standards.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500',
  },
];
