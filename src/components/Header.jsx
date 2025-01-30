import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SunIcon, MoonIcon, Bars3Icon, XMarkIcon, 
  PhoneIcon, CalendarIcon, UserIcon 
} from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/ThemeContext";
import { logo } from "../assets/images";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Accommodations', href: '/accommodations' },
    { name: 'Dining', href: '/dining' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Book Now', href: '/book-now' },
  ];

  const quickActions = [
    { name: 'Contact', path: '/contact', icon: PhoneIcon },
    { name: 'Account', path: '/account', icon: UserIcon },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className={`font-serif text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'
            }`}>
              Private Resort
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Main Navigation Links */}
            <div className="flex items-center gap-6">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-link text-sm font-medium transition-colors duration-300 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                      : 'text-white/90 hover:text-white'
                  } ${location.pathname === link.href ? 'nav-link-active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.path}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    action.highlight
                      ? 'btn-primary'
                      : isScrolled
                      ? 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  <action.icon className="w-4 h-4" />
                  {action.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-lg"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-4">
                  {navigation.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 ${
                        location.pathname === link.href ? 'text-primary-600 dark:text-primary-400' : ''
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Quick Actions */}
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {quickActions.map((action) => (
                    <Link
                      key={action.name}
                      to={action.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                        action.highlight
                          ? 'btn-primary'
                          : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                      }`}
                    >
                      <action.icon className="w-5 h-5" />
                      {action.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
