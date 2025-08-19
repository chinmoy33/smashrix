import React from 'react';
import { Trophy, Users, Calendar, Target } from 'lucide-react';
import leeLinImage from '../assets/lee-lin.jpeg';
import badminton from '../assets/badminton.jpeg';
import player from '../assets/pexels-photo-1103829.jpeg'
import badminton2 from '../assets/badminton6.jpg'
import exp from '../assets/exp.jpeg'
import trophy from '../assets/trophy.jpg'
import open from '../assets/open1.jpg'

const Home: React.FC = () => {
  return (
    <section className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          // style={{
          //   backgroundImage: 'url(https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg)'
          // }}
          style={{
            backgroundImage: `url(${badminton2})`
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to <span className="text-orange-400">Smashrix</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Where Champions Are Made, One Smash at a Time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Join Our Club
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Watch Training Videos
            </button>
          </div>
        </div>
        
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                <Users size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-gray-600">Executive Members</div>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Trophy size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">BCR</div>
              <div className="text-gray-600">Venue</div>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <Calendar size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">Aug 17, 2025</div>
              <div className="text-gray-600">Founded in</div>
            </div>
            
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <Target size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1</div>
              <div className="text-gray-600">Number of indoor court</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Smashrix?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide an environment where players can develop their skills to excel in badminton
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative overflow-hidden rounded-lg mb-6">
                {/* <img 
                  src="https://images.pexels.com/photos/6944174/pexels-photo-6944174.jpeg" 
                  alt="Professional Coaching"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                /> */}
                <img 
                  src= {exp}
                  alt="Professional Coaching"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Experienced Players to guide you</h3>
              <p className="text-gray-600">This increases the skill along with having fun in playing</p>
            </div>
            
            <div className="text-center group">
              <div className="relative overflow-hidden rounded-lg mb-6">
                {/* <img 
                  src="https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg" 
                  alt="State-of-the-art Facilities"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                /> */}
                <img 
                  src={open} 
                  alt="State-of-the-art Facilities"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Open to ALL</h3>
              <p className="text-gray-600">All players whether hostellers/non-hostellers are warmly welcomed to join us</p>
            </div>
            
            <div className="text-center group">
              <div className="relative overflow-hidden rounded-lg mb-6">
                {/* <img 
                  src="https://images.pexels.com/photos/6551415/pexels-photo-6551415.jpeg" 
                  alt="Community Events"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                /> */}
                <img 
                  src={trophy} 
                  alt="Community Events"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Events</h3>
              <p className="text-gray-600">Join tournaments and social events throughout the year</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;