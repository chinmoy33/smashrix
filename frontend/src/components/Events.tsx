import React from 'react';
import { Calendar, Clock, MapPin, Trophy, Users, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { hostService } from '../services/hostService';
import { toast } from 'react-hot-toast';
import { Event } from '../types/Event';
import { registrationService } from '../services/registrationService.ts';
import { SinglesPlayer,DoublesPlayer } from '../types/Event.ts';
import {Category} from '../types/Event.ts';
import RegistrationModal from './RegistrationModal';
import EmptyEventsPlaceholder from './EmptyEventsPlaceholder.tsx';

interface EventDetails {
  id: bigint;
  category: Category;
}

const Events: React.FC = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState<EventDetails|null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await hostService.getHostedEvents();
        if (response.success) {
          setUpcomingEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching hosted events:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterSingle = (id:bigint,newRegister: Omit<SinglesPlayer, 'id' | 'created_at'>) => {
     
      try{
        setLoading(true);
          registrationService.registerEvent(id,newRegister as SinglesPlayer)
        .then(response => {
          if (response.success) {
            console.log("You have been registered successfully:", response.data)
            setIsRegistrationModalOpen(false);
            toast.success("Registered successfully");
          } else {
            toast.error(response.message);
          }
        })
        .catch(error => {
          console.error("Error registering in event:", error);
          toast.error("Please Register again!");
        });
      }
      catch(error){
        console.error("Error in handleEventCreate:", error);
        toast.error("Please Register again!");
      }
      finally{
        setIsRegistrationModalOpen(false);
        setLoading(false);
      }
      
    };

    const handleRegisterDouble = (id:bigint,newRegister: Omit<DoublesPlayer, 'id' | 'created_at'>) => {
      
      try{
        setLoading(true);
          registrationService.registerEvent(id,newRegister as DoublesPlayer)
        .then(response => {
          if (response.success) {
            console.log("You have been registered successfully:", response.data)
            setIsRegistrationModalOpen(false);
            toast.success("Registered successfully");
          } else {
            toast.error(response.message);
          }
        })
        .catch(error => {
          console.error("Error registering in event:", error);
          toast.error("Failed to Register for event");
        });
      }
      catch(error){
        console.error("Error in handleEventCreate:", error);
        toast.error("Failed to register for event");
      }
      finally{
        setIsRegistrationModalOpen(false);
        setLoading(false);
      }
      
    };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Tournament':
        return 'text-orange-600';
      case 'Training Camp':
        return 'text-blue-600';
      case 'Social Event':
        return 'text-purple-600';
      case 'Masterclass':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <section className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Events & Tournaments</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our exciting events and tournaments throughout the year. From competitive championships 
            to social gatherings, there's something for every badminton enthusiast!
          </p>
        </div>

        {/* Upcoming Events */}
        
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Calendar className="mr-3 text-orange-600" size={32} />
            Upcoming Events
          </h3>
          {loading ? (
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary mx-auto mb-4"></div>
                <p className="text-gray-400">Loading Event Details...It may take a while!</p>
            </div>) :
          upcomingEvents.length === 0 ? (
            <EmptyEventsPlaceholder />
          ):(
          <div className="grid lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* <div className="relative">
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {event.level}
                  </div>
                </div> */}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900 flex-1">{event.title}</h4>
                    <span className={`text-sm font-semibold ${getTypeColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2 text-orange-600" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-2 text-blue-600" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-2 text-green-600" />
                      {event.venue}
                    </div>
                    {/* <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2 text-purple-600" />
                      {event.participants} participants
                    </div> */}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-lg font-bold text-orange-600">
                      {event.amount !== 0 ? `₹${event.amount.toFixed(2)}` : 'Free'}
                    </div>
                    {/* <div className="flex items-center text-yellow-600">
                      <Trophy size={16} className="mr-1" />
                      <span className="text-sm font-medium">{event.prize}</span>
                    </div> */}
                  </div>
                  
                  <button onClick={() => {setEventDetails({id:event.id,category:event.category});setIsRegistrationModalOpen(true)}} className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200">
                    Register Now
                  </button>
                </div>
              </div>
            ))}
          </div>)}
        </div>

        
        <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSubmit={eventDetails?.category==="Singles" ? handleRegisterSingle : handleRegisterDouble}
        eventDetails={eventDetails}
      />
      </div>
    </section>
  );
};

export default Events;