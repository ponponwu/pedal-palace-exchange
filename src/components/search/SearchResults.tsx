
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BicycleGrid from '../bicycles/BicycleGrid';
import { Bike } from 'lucide-react';

// Sample bicycle data
const sampleBicycles = [
  {
    id: '1',
    title: 'Specialized Stumpjumper Expert',
    price: 2800,
    location: 'Seattle, WA',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3',
    category: 'Mountain Bike'
  },
  {
    id: '2',
    title: 'Trek Domane SL6',
    price: 2200,
    location: 'Portland, OR',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3',
    category: 'Road Bike'
  },
  {
    id: '3',
    title: 'Giant Revolt Advanced',
    price: 1800,
    location: 'San Francisco, CA',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3',
    category: 'Gravel Bike'
  },
  {
    id: '4',
    title: 'Cannondale Synapse',
    price: 1500,
    location: 'Los Angeles, CA',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3',
    category: 'Road Bike'
  }
];

interface SearchResultsProps {
  query: string;
  filters: {
    priceRange: string;
    type: string;
    brand: string;
    location: string;
  };
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, filters }) => {
  const { t } = useTranslation();
  const [bicycles, setBicycles] = useState(sampleBicycles);
  const [loading, setLoading] = useState(false);

  // This would use real API in production
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      // Filter bicycles based on search query and filters
      const filteredBicycles = sampleBicycles.filter((bike) => {
        // Filter by search query
        if (query && !bike.title.toLowerCase().includes(query.toLowerCase())) {
          return false;
        }
        
        // Filter by type/category
        if (filters.type && bike.category !== filters.type) {
          return false;
        }
        
        // Filter by location
        if (filters.location && !bike.location.includes(filters.location)) {
          return false;
        }
        
        // Filter by price range
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-').map(Number);
          if (bike.price < min || (max && bike.price > max)) {
            return false;
          }
        }
        
        return true;
      });
      
      setBicycles(filteredBicycles);
      setLoading(false);
    }, 500);
  }, [query, filters]);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <Bike className="h-12 w-12 text-gray-400 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (bicycles.length === 0) {
    return (
      <div className="py-12 text-center">
        <Bike className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">沒有找到符合條件的自行車</h3>
        <p className="mt-2 text-sm text-gray-500">請嘗試調整您的搜尋條件</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">找到 {bicycles.length} 輛自行車</p>
      </div>
      <BicycleGrid bicycles={bicycles.map(bike => ({
        id: bike.id,
        title: bike.title,
        price: bike.price,
        location: bike.location,
        condition: bike.condition,
        image: bike.image
      }))} />
    </div>
  );
};

export default SearchResults;
