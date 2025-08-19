import React from 'react';
import { Menu, X } from 'lucide-react';
import LottieAnimation from "./LottieAnimation"
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from 'react-redux';
import { setActiveSection } from '../store/renderSlice.ts';

// interface NavbarProps {
//   activeSection: string;
//   setActiveSection: (section: string) => void;
// }

const Navbar = () => {
  const activeSection = useSelector((state) => state.render.activeSection);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'Admin', label: 'Admin'}
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
    
          <div className="flex justify-between items-center h-16">
            <LottieAnimation/>
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-600">Smashrix</h1>
            </div>
          </div>
          
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {if(item.id!="Admin"){dispatch(setActiveSection(item.id))}else{navigate("/Login");}}}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-orange-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if(item.id!="Admin")
                  {
                    dispatch(setActiveSection(item.id));
                  } 
                  else
                  {
                    navigate("/Login")
                  }
                  setIsMenuOpen(false);
                }}
                className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;