import React from 'react';
import { Calendar, Plus, Sparkles, Trophy } from 'lucide-react';
import emptyEventsImage from '../assets/empty-events-illustration.jpg';

interface EmptyEventsPlaceholderProps {
  onCreateEvent?: () => void;
  showCreateButton?: boolean;
}

const EmptyEventsPlaceholder: React.FC<EmptyEventsPlaceholderProps> = () => {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center max-w-md mx-auto">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="w-48 h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-sport-orange/10 to-sport-blue/10">
            <img 
              src={emptyEventsImage} 
              alt="No events available" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Floating decorative elements */}
          <div className="absolute -top-2 -right-4 w-8 h-8 bg-sport-orange/20 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-sport-blue/20 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 -right-8 w-4 h-4 bg-sport-yellow/30 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calendar className="w-6 h-6 text-sport-orange" />
            <Sparkles className="w-5 h-5 text-sport-blue" />
            <Trophy className="w-6 h-6 text-sport-orange" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No Events Yet
          </h3>
          
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            The courts are quiet for now! Be the first to know when exciting tournaments, 
            training sessions, and social events are announced.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          
          <button className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 
                           border-2 border-sport-blue text-sport-blue font-semibold rounded-lg 
                           hover:bg-sport-blue transition-all duration-300 
                           transform hover:scale-105" disabled>
            <Calendar className="w-5 h-5 mr-2" />
            Get Notified
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-gradient-to-r from-sport-orange/5 to-sport-blue/5 
                        rounded-xl border border-sport-orange/10">
          <p className="text-xs sm:text-sm text-gray-600">
            💡 <strong>Pro tip:</strong> Join us on <a className="text-blue-500 hover:text-blue-700 hover:underline" href="https://chat.whatsapp.com/L6cGVIZO5p09Xa76PAMT0K?mode=ac_t" target="_blank" rel="noopener noreferrer">Whatsapp </a> 
            to stay updated on upcoming events and tournaments!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyEventsPlaceholder;