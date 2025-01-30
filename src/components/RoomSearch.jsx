import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function RoomSearch({ onSearch }) {
  const [filters, setFilters] = useState({
    search: '',
    priceRange: [0, 1000],
    type: 'all',
    amenities: []
  });

  const amenitiesList = [
    'Wi-Fi',
    'Air Conditioning',
    'Ocean View',
    'Garden View',
    'Private Pool',
    'Spa Access',
    'Butler Service',
    'Beachfront'
  ];

  const roomTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'villa', label: 'Villa' },
    { value: 'suite', label: 'Suite' },
    { value: 'bungalow', label: 'Bungalow' },
    { value: 'penthouse', label: 'Penthouse' }
  ];

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  useEffect(() => {
    onSearch(filters);
  }, [filters, onSearch]);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search rooms..."
            className="block w-full rounded-lg border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Price Range (per night)
          </label>
          <div className="mt-2 space-y-4">
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({
                ...filters,
                priceRange: [0, parseInt(e.target.value)]
              })}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Room Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Room Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="mt-2 block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            {roomTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Amenities
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {amenitiesList.map((amenity) => (
            <button
              key={amenity}
              onClick={() => handleAmenityToggle(amenity)}
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filters.amenities.includes(amenity)
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800/30 dark:text-gray-400 dark:hover:bg-gray-800/50'
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
