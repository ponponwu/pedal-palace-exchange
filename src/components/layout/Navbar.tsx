
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  User, 
  MessageCircle, 
  Bookmark, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-marketplace-blue mr-2"
          >
            <circle cx="5.5" cy="17.5" r="3.5"/>
            <circle cx="18.5" cy="17.5" r="3.5"/>
            <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2"/>
          </svg>
          <span className="text-xl font-bold text-gray-900">Pedal Palace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          <Link to="/search" className="px-3 py-2 text-gray-700 hover:text-marketplace-blue transition-colors">
            Browse
          </Link>
          <Link to="/favorites" className="px-3 py-2 text-gray-700 hover:text-marketplace-blue transition-colors">
            Favorites
          </Link>
          <Link to="/messages" className="px-3 py-2 text-gray-700 hover:text-marketplace-blue transition-colors">
            Messages
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link to="/search">
            <Button variant="outline" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" className="text-gray-700 hover:text-marketplace-blue">
              Sign In
            </Button>
          </Link>
          <Link to="/upload">
            <Button className="bg-marketplace-blue hover:bg-blue-600 text-white">
              Sell a Bike
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-20 animate-fade-in">
          <div className="container px-4 py-6 mx-auto">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="w-5 h-5 mr-3 text-gray-500" />
                <span className="text-gray-700">Browse Bikes</span>
              </Link>
              
              <Link 
                to="/favorites" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bookmark className="w-5 h-5 mr-3 text-gray-500" />
                <span className="text-gray-700">Favorites</span>
              </Link>
              
              <Link 
                to="/messages" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5 mr-3 text-gray-500" />
                <span className="text-gray-700">Messages</span>
              </Link>
              
              <Link 
                to="/profile" 
                className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5 mr-3 text-gray-500" />
                <span className="text-gray-700">Profile</span>
              </Link>
              
              <div className="pt-6">
                <Link to="/login">
                  <Button variant="outline" className="w-full mb-3">
                    Sign In
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button className="w-full bg-marketplace-blue hover:bg-blue-600">
                    Sell a Bike
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
