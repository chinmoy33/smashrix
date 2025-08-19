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
  // const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([{
  //     id: 1,
  //     title: "Smashrix Open Championship",
  //     date: "March 15, 2024",
  //     time: "9:00 AM - 6:00 PM",
  //     venue: "Main Arena, Smashrix Club",
  //     category: "Singles",
  //     description: "Our flagship annual tournament featuring singles and doubles competitions across multiple categories.",
  //     amount: "50",
  //   },
  //   {
  //     id: 2,
  //     title: "Junior Development Camp",
  //     date: "March 22-24, 2024",
  //     time: "10:00 AM - 4:00 PM",
  //     location: "Training Courts 1-4",
  //     type: "Training Camp",
  //     level: "Under 16",
  //     prize: "Certificate of Completion",
  //     image: "https://images.pexels.com/photos/6944174/pexels-photo-6944174.jpeg",
  //     description: "Intensive 3-day training camp focused on fundamental techniques and tactical awareness for young players.",
  //     participants: 24,
  //     registrationFee: "$150",
  //     status: "Few Spots Left"
  //   },
  //   {
  //     id: 3,
  //     title: "Mixed Doubles Social Night",
  //     date: "March 28, 2024",
  //     time: "7:00 PM - 10:00 PM",
  //     location: "Courts 5-8",
  //     type: "Social Event",
  //     level: "Intermediate",
  //     prize: "Fun & Prizes",
  //     image: "https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg",
  //     description: "Fun mixed doubles tournament followed by dinner and socializing. Perfect for meeting new playing partners!",
  //     participants: 40,
  //     registrationFee: "$25",
  //     status: "Open Registration"
  //   },
  //   {
  //     id: 4,
  //     title: "Advanced Techniques Masterclass",
  //     date: "April 5, 2024",
  //     time: "2:00 PM - 5:00 PM",
  //     location: "Training Center",
  //     type: "Masterclass",
  //     level: "Advanced",
  //     prize: "Video Analysis Session",
  //     image: "https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg",
  //     description: "Learn advanced shot techniques and strategies from our head coach Sarah Chen.",
  //     participants: 16,
  //     registrationFee: "$75",
  //     status: "Open Registration"
  //   }]);

  const pastEvents = [
    {
      title: "Winter Championship 2024",
      date: "February 10, 2024",
      participants: 96,
      winner: "Alex Thompson"
    },
    {
      title: "New Year Friendly Tournament",
      date: "January 7, 2024",
      participants: 64,
      winner: "Team Phoenix"
    },
    {
      title: "Holiday Mixed Doubles",
      date: "December 20, 2023",
      participants: 48,
      winner: "Sarah & Mike"
    }
  ];
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await hostService.getHostedEvents();
        if (response.success) {
          setUpcomingEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching hosted events:", error);
        toast.error("Failed to fetch hosted events");
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterSingle = (id:bigint,newRegister: Omit<SinglesPlayer, 'id' | 'created_at'>) => {
      // const event: Event = {
      //   ...newEvent,
      //   id: events.length + 1,
      //   created_at: new Date().toISOString()
      // };
      // setEvents([...events, event]);
      // setIsEventModalOpen(false);
      try{
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
          toast.error("Failed to Register for event");
        });
      }
      catch(error){
        console.error("Error in handleEventCreate:", error);
        toast.error("Failed to register for event");
      }
      finally{
        setIsRegistrationModalOpen(false);
      }
      
    };

    const handleRegisterDouble = (id:bigint,newRegister: Omit<DoublesPlayer, 'id' | 'created_at'>) => {
      // const event: Event = {
      //   ...newEvent,
      //   id: events.length + 1,
      //   created_at: new Date().toISOString()
      // };
      // setEvents([...events, event]);
      // setIsEventModalOpen(false);
      try{
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
      }
      
    };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open Registration':
        return 'bg-green-100 text-green-800';
      case 'Few Spots Left':
        return 'bg-yellow-100 text-yellow-800';
      case 'Registration Closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          {upcomingEvents.length === 0 ? (
            // <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-lg">
            //   <Calendar className="h-16 w-16 text-gray-400 mb-4" />
            //   <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Events Available</h3>
            //   <p className="text-lg text-gray-500 text-center">
            //     Check back soon for new events and tournaments!
            //   </p>
            // </div>
            <EmptyEventsPlaceholder 
            showCreateButton={true}
            onCreateEvent={() => console.log('Create event clicked!')}
          />
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
                      {event.amount !== null ? `$${event.amount.toFixed(2)}` : 'Free'}
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

        {/* Recent Events */}
        {/* <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Trophy className="mr-3 text-yellow-600" size={28} />
            Recent Event Winners
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-2" />
                    {event.participants} participants
                  </div>
                  <div className="flex items-center text-yellow-600 font-medium">
                    <Star size={14} className="mr-2" fill="currentColor" />
                    Winner: {event.winner}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Call to Action */}
        {/* <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-orange-600 to-blue-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Next Event?</h3>
            <p className="text-lg mb-6">
              Don't miss out on exciting tournaments and training opportunities. Register today and be part of the Smashrix community!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
                View All Events
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </div> */}
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