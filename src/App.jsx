import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './contexts/ThemeContext';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Accommodations = lazy(() => import('./pages/Accommodations'));
const RoomDetail = lazy(() => import('./pages/RoomDetail'));
const Booking = lazy(() => import('./pages/Booking'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Account = lazy(() => import('./pages/Account'));
const Dining = lazy(() => import('./pages/Dining'));
const Experiences = lazy(() => import('./pages/Experiences'));
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'));
const NotFound = lazy(() => import('./pages/NotFound'));
const BookNow = lazy(() => import('./pages/BookNow'));
const BookExperience = lazy(() => import('./pages/BookExperience'));
const BookDining = lazy(() => import('./pages/BookDining'));

// Loading component
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  );
}

export default function App() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
          <Toaster position="top-center" />
          <button
            onClick={toggleDarkMode}
            className="fixed bottom-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg z-50"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-gray-800 dark:text-white" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-800" />
            )}
          </button>
          <Header />
          <main className="flex-1">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/accommodations" element={<Accommodations />} />
                <Route path="/room/:id" element={<RoomDetail />} />
                <Route path="/booking/:roomId" element={<Booking />} />
                <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                <Route path="/book-now" element={<BookNow />} />
                <Route path="/book-experience" element={<BookExperience />} />
                <Route path="/book-dining" element={<BookDining />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dining" element={<Dining />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/account" element={<Account />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
