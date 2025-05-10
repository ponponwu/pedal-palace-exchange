
import React, { useEffect, useState } from 'react';
import BicycleGrid from '@/components/bicycles/BicycleGrid';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

// Types
interface Bicycle {
  id: string;
  title: string;
  price: number;
  location: string;
  condition: string;
  brand: string;
  imageUrl: string;
}

// Define interface for the props
interface SearchResultsProps {
  query?: string;
  filters?: {
    priceRange: string;
    type: string;
    brand: string;
    location: string;
  };
}

const SearchResults: React.FC<SearchResultsProps> = () => {
  const { t } = useTranslation();
  const [priceRange, setPriceRange] = React.useState([0, 5000]);
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [searchParams] = useSearchParams();
  const [bicycles, setBicycles] = useState<Bicycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    conditions: [] as string[],
    priceMin: 0,
    priceMax: 5000
  });

  // Mock API call function
  const fetchBicycles = async () => {
    setLoading(true);
    
    console.log('Fetching bicycles with filters:', {
      query: searchParams.get('q'),
      type: searchParams.get('type'),
      brand: searchParams.get('brand'),
      location: searchParams.get('location'),
      priceRange: searchParams.get('price'),
      categories: selectedFilters.categories,
      conditions: selectedFilters.conditions,
      priceRange: [selectedFilters.priceMin, selectedFilters.priceMax]
    });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // This would be replaced with an actual API call in a real implementation
    // For now using mock data and filtering based on the parameters
    const mockData = [
      {
        id: '1',
        title: 'Specialized Stumpjumper Expert Carbon',
        price: 2800,
        location: 'Seattle, WA',
        condition: 'Like New',
        brand: 'Specialized',
        type: 'Mountain Bike',
        imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '2',
        title: 'Trek Fuel EX 8 29',
        price: 1900,
        location: 'Portland, OR',
        condition: 'Good',
        brand: 'Trek',
        type: 'Mountain Bike',
        imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '3',
        title: 'Canyon Neuron CF SL 8',
        price: 3200,
        location: 'Denver, CO',
        condition: 'Excellent',
        brand: 'Canyon',
        type: 'Mountain Bike',
        imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '4',
        title: 'Santa Cruz Hightower LT Carbon',
        price: 4500,
        location: 'Boulder, CO',
        condition: 'Like New',
        brand: 'Santa Cruz',
        type: 'Mountain Bike',
        imageUrl: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '5',
        title: 'Bianchi Road Bike',
        price: 3800,
        location: 'Golden, CO',
        condition: 'Excellent',
        brand: 'Bianchi',
        type: 'Road Bike',
        imageUrl: 'https://images.unsplash.com/photo-1623005329937-eb70fb656e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '6',
        title: 'Cannondale City Bike',
        price: 5200,
        location: 'Sedona, AZ',
        condition: 'Like New',
        brand: 'Cannondale',
        type: 'City Bike',
        imageUrl: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '7',
        title: 'Giant Electric Bike',
        price: 2500,
        location: 'San Francisco, CA',
        condition: 'Good',
        brand: 'Giant',
        type: 'Electric Bike',
        imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      },
    ];

    // Filter bicycles based on the filters
    let filteredBicycles = [...mockData];

    // Apply URL search params filters
    const queryParam = searchParams.get('q');
    if (queryParam) {
      filteredBicycles = filteredBicycles.filter(bike => 
        bike.title.toLowerCase().includes(queryParam.toLowerCase()) || 
        bike.brand.toLowerCase().includes(queryParam.toLowerCase())
      );
    }

    const typeParam = searchParams.get('type');
    if (typeParam) {
      filteredBicycles = filteredBicycles.filter(bike => 
        bike.type === typeParam
      );
    }

    const brandParam = searchParams.get('brand');
    if (brandParam) {
      filteredBicycles = filteredBicycles.filter(bike => 
        bike.brand.toLowerCase() === brandParam.toLowerCase()
      );
    }

    const locationParam = searchParams.get('location');
    if (locationParam) {
      filteredBicycles = filteredBicycles.filter(bike => 
        bike.location.includes(locationParam)
      );
    }

    // Apply selected filters from UI
    if (selectedFilters.categories.length > 0) {
      filteredBicycles = filteredBicycles.filter(bike => 
        selectedFilters.categories.includes(bike.type)
      );
    }

    if (selectedFilters.conditions.length > 0) {
      filteredBicycles = filteredBicycles.filter(bike => 
        selectedFilters.conditions.includes(bike.condition)
      );
    }

    // Apply price range filter
    filteredBicycles = filteredBicycles.filter(bike => 
      bike.price >= selectedFilters.priceMin && bike.price <= selectedFilters.priceMax
    );

    setBicycles(filteredBicycles);
    setLoading(false);
  };

  // Fetch bicycles when search params or selected filters change
  useEffect(() => {
    fetchBicycles();
  }, [searchParams, selectedFilters]);

  // Update price range when slider value changes
  useEffect(() => {
    setSelectedFilters(prev => ({
      ...prev,
      priceMin: priceRange[0],
      priceMax: priceRange[1]
    }));
  }, [priceRange]);

  const toggleCategoryFilter = (category: string) => {
    setSelectedFilters(prev => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category]
        };
      }
    });
  };

  const toggleConditionFilter = (condition: string) => {
    setSelectedFilters(prev => {
      if (prev.conditions.includes(condition)) {
        return {
          ...prev,
          conditions: prev.conditions.filter(c => c !== condition)
        };
      } else {
        return {
          ...prev,
          conditions: [...prev.conditions, condition]
        };
      }
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      categories: [],
      conditions: [],
      priceMin: 0,
      priceMax: 5000
    });
    setPriceRange([0, 5000]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('searchResults')}</h1>
        <Button 
          variant="outline" 
          onClick={() => setFilterVisible(!filterVisible)}
          className="lg:hidden"
        >
          {filterVisible ? t('hideFilters') : t('showFilters')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className={`${filterVisible ? 'block' : 'hidden'} lg:block`}>
          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">{t('categories')}</h3>
            <div className="space-y-2">
              {['Mountain Bike', 'Road Bike', 'City Bike', 'Electric Bike', 'Kids Bike'].map((category) => (
                <div key={category} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={category.toLowerCase().replace(' ', '-')}
                    checked={selectedFilters.categories.includes(category)}
                    onChange={() => toggleCategoryFilter(category)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={category.toLowerCase().replace(' ', '-')} className="ml-2 text-sm text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">{t('priceRange')}</h3>
            <div className="px-2">
              <Slider 
                value={priceRange} 
                max={5000} 
                step={100}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Condition Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">{t('condition')}</h3>
            <div className="space-y-2">
              {['New', 'Like New', 'Good', 'Fair', 'Poor'].map((condition) => (
                <div key={condition} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={condition.toLowerCase().replace(' ', '-')}
                    checked={selectedFilters.conditions.includes(condition)}
                    onChange={() => toggleConditionFilter(condition)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={condition.toLowerCase().replace(' ', '-')} className="ml-2 text-sm text-gray-700">
                    {condition}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Filters Button */}
          <Button variant="outline" className="w-full" onClick={resetFilters}>
            {t('resetFilters')}
          </Button>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="grid">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-sm text-gray-500">{bicycles.length} {t('resultsFound')}</span>
                {loading && <span className="ml-2 text-sm text-blue-500">{t('loading')}...</span>}
              </div>
              <TabsList>
                <TabsTrigger value="grid">{t('grid')}</TabsTrigger>
                <TabsTrigger value="list">{t('list')}</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid" className="mt-0">
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marketplace-blue"></div>
                </div>
              ) : bicycles.length > 0 ? (
                <BicycleGrid bicycles={bicycles} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">{t('noBicyclesFound')}</p>
                  <Button className="mt-4" onClick={resetFilters}>
                    {t('resetFilters')}
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              {/* List view implementation */}
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-marketplace-blue"></div>
                </div>
              ) : bicycles.length > 0 ? (
                <div className="space-y-4">
                  {bicycles.map((bicycle) => (
                    <div key={bicycle.id} className="border rounded-lg overflow-hidden flex">
                      <img 
                        src={bicycle.imageUrl} 
                        alt={bicycle.title} 
                        className="w-32 h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-medium">{bicycle.title}</h3>
                        <p className="text-lg font-bold text-marketplace-green">${bicycle.price}</p>
                        <p className="text-sm text-gray-500">{bicycle.location} • {bicycle.condition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">{t('noBicyclesFound')}</p>
                  <Button className="mt-4" onClick={resetFilters}>
                    {t('resetFilters')}
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
