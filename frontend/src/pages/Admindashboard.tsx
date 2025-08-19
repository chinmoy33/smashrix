import React, { useState,useEffect } from 'react';
import { Plus, Calendar, Users, Trophy, Settings, BarChart3 } from 'lucide-react';
import EventHostingModal from '../components/Admin/EventHostingModal';
import MatchmakingPanel from '../components/Admin/MatchmakingPanel';
import { Event} from '../types/Event';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { toast } from 'react-hot-toast';
import { hostService } from '../services/hostService';
import { registrationService } from '../services/registrationService';
import { Registration } from '../types/Event';
import { Edit, Trash2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const [players, setPlayers] = useState<Registration[]>([]);
  // const [players] = useState<Player[]>([
  //   {
  //     id: 1,
  //     name: "Alex Johnson",
  //     email: "alex@example.com",
  //     skill_level: "Advanced",
  //     preferred_category: "Singles",
  //     registered_events: [1],
  //     created_at: "2024-02-15T09:00:00Z"
  //   },
  //   {
  //     id: 2,
  //     name: "Sarah Chen",
  //     email: "sarah@example.com",
  //     skill_level: "Professional",
  //     preferred_category: "Doubles",
  //     registered_events: [1, 2],
  //     created_at: "2024-02-20T11:30:00Z"
  //   },
  //   {
  //     id: 3,
  //     name: "Mike Rodriguez",
  //     email: "mike@example.com",
  //     skill_level: "Intermediate",
  //     preferred_category: "Mixed Doubles",
  //     registered_events: [2],
  //     created_at: "2024-02-25T16:45:00Z"
  //   },
  //   {
  //     id: 4,
  //     name: "Emma Wilson",
  //     email: "emma@example.com",
  //     skill_level: "Advanced",
  //     preferred_category: "Singles",
  //     registered_events: [1],
  //     created_at: "2024-03-01T08:15:00Z"
  //   }
  // ]);
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser({
          username: user.user_metadata.full_name || user.email,
          avatarUrl: user.user_metadata.avatar_url,
        });
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await registrationService.getRegistrations();
        if (response.success) {
          console.log("Fetched registrations:", response.data);
          setPlayers(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching hosted events:", error);
        toast.error("Failed to fetch hosted events");
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await hostService.getHostedEvents();
        if (response.success) {
          setEvents(response.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error fetching hosted events:", error);
        toast.error("Failed to fetch hosted events");
      }
    };

    fetchEvents();
  }, []);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed");
    } else {
      toast.success("Logged out");
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleEventCreate = (newEvent: Omit<Event, 'id' | 'created_at'>) => {
    // const event: Event = {
    //   ...newEvent,
    //   id: events.length + 1,
    //   created_at: new Date().toISOString()
    // };
    // setEvents([...events, event]);
    // setIsEventModalOpen(false);
    try{
        hostService.hostEvent(newEvent as Event)
      .then(response => {
        if (response.success) {
          console.log("Event hosted successfully:", response.data);
          setEvents([...events, ...response.data]);
          setIsEventModalOpen(false);
          toast.success("Event hosted successfully");
        } else {
          toast.error(response.message);
        }
      })
      .catch(error => {
        console.error("Error hosting event:", error);
        toast.error("Failed to host event");
      });
    }
    catch(error){
      console.error("Error in handleEventCreate:", error);
      toast.error("Failed to host event");
    }
    finally{
      setIsEventModalOpen(false);
    }
    
  };

  const stats = {
    totalEvents: events.length,
    totalPlayers: players.length,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length,
    activeMatches: 12
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-primary text-primary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm opacity-90">Total Events</h3>
                <p className="text-3xl font-bold">{stats.totalEvents}</p>
              </div>
              <Calendar className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-secondary text-secondary-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm opacity-90">Total Players</h3>
                <p className="text-3xl font-bold">{stats.totalPlayers}</p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-accent text-accent-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm opacity-90">Upcoming Events</h3>
                <p className="text-3xl font-bold">{stats.upcomingEvents}</p>
              </div>
              <Trophy className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-info text-info-content shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="card-title text-sm opacity-90">Active Matches</h3>
                <p className="text-3xl font-bold">{stats.activeMatches}</p>
              </div>
              <BarChart3 className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title text-neutral">Recent Events</h2>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => setIsEventModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Host Event
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="text-neutral">
                  <th>Event</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Venue</th>
                  <th>Fee</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="hover">
                    <td>
                      <div>
                        <div className="font-semibold text-neutral">{event.title}</div>
                        <div className="text-sm text-neutral/70">{event.description}</div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-outline badge-primary">{event.category}</span>
                    </td>
                    <td className="text-neutral">{event.date} at {event.time}</td>
                    <td className="text-neutral">{event.venue}</td>
                    <td>
                      {event.free ? (
                        <span className="badge badge-success">Free</span>
                      ) : (
                        <span className="text-neutral font-semibold">${event.amount}</span>
                      )}
                    </td>
                    <td>
                      <span className="badge badge-info">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral">Event Management</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setIsEventModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Host New Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between mb-3">
                <h3 className="card-title text-neutral">{event.title}</h3>
                <span className="badge badge-primary badge-sm">{event.category}</span>
              </div>
              
              <p className="text-neutral/70 text-sm mb-4">{event.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-neutral">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  {event.date} at {event.time}
                </div>
                <div className="flex items-center text-neutral">
                  <Settings className="w-4 h-4 mr-2 text-secondary" />
                  {event.venue}
                </div>
              </div>
              
              <div className="card-actions justify-between items-center mt-4">
                <div>
                  {event.free ? (
                    <span className="badge badge-success">Free Event</span>
                  ) : (
                    <span className="text-lg font-bold text-primary">${event.amount}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-outline btn-primary">Edit</button>
                  <button className="btn btn-sm btn-outline btn-error">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200" data-theme="smashrix">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-primary">Smashrix Admin Dashboard</h1>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-sm font-semibold">A</span>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a className="text-neutral">Profile</a></li>
              <li><a className="text-neutral">Settings</a></li>
              <li><a onClick={handleLogout} className="text-error">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-base-100 shadow-lg">
          <ul className="menu p-4 space-y-2">
            <li>
              <button
                className={`${activeTab === 'overview' ? 'active bg-primary text-primary-content' : 'text-neutral hover:bg-base-200'}`}
                onClick={() => setActiveTab('overview')}
              >
                <BarChart3 className="w-5 h-5" />
                Overview
              </button>
            </li>
            <li>
              <button
                className={`${activeTab === 'events' ? 'active bg-primary text-primary-content' : 'text-neutral hover:bg-base-200'}`}
                onClick={() => setActiveTab('events')}
              >
                <Calendar className="w-5 h-5" />
                Events
              </button>
            </li>
            {/* <li>
              <button
                className={`${activeTab === 'matchmaking' ? 'active bg-primary text-primary-content' : 'text-neutral hover:bg-base-200'}`}
                onClick={() => setActiveTab('matchmaking')}
              >
                <Trophy className="w-5 h-5" />
                Matchmaking
              </button>
            </li> */}
            <li>
              <button
                className={`${activeTab === 'players' ? 'active bg-primary text-primary-content' : 'text-neutral hover:bg-base-200'}`}
                onClick={() => setActiveTab('players')}
              >
                <Users className="w-5 h-5" />
                Players
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'events' && renderEvents()}
          {/* {activeTab === 'matchmaking' && <MatchmakingPanel events={events} players={players} />} */}
          {activeTab === 'players' && (
            // <div className="card bg-base-100 shadow-lg">
            //   <div className="card-body">
            //     <h2 className="card-title text-neutral mb-4">Player Management</h2>
            //     <div className="overflow-x-auto">
            //       <table className="table table-zebra w-full">
            //         <thead>
            //           <tr className="text-neutral">
            //             <th>Name</th>
            //             <th>Email</th>
            //             <th>Skill Level</th>
            //             <th>Preferred Category</th>
            //             <th>Registered Events</th>
            //             <th>Actions</th>
            //           </tr>
            //         </thead>
            //         <tbody>
            //           {players.map((player) => (
            //             <tr key={player.id} className="hover">
            //               <td className="font-semibold text-neutral">{player.name}</td>
            //               <td className="text-neutral">{player.email}</td>
            //               <td>
            //                 <span className={`badge ${
            //                   player.skill_level === 'Professional' ? 'badge-error' :
            //                   player.skill_level === 'Advanced' ? 'badge-warning' :
            //                   player.skill_level === 'Intermediate' ? 'badge-info' : 'badge-success'
            //                 }`}>
            //                   {player.skill_level}
            //                 </span>
            //               </td>
            //               <td>
            //                 <span className="badge badge-outline badge-primary">{player.preferred_category}</span>
            //               </td>
            //               <td className="text-neutral">{player.registered_events.length} events</td>
            //               <td>
            //                 <div className="flex gap-2">
            //                   <button className="btn btn-xs btn-outline btn-info">View</button>
            //                   <button className="btn btn-xs btn-outline btn-warning">Edit</button>
            //                 </div>
            //               </td>
            //             </tr>
            //           ))}
            //         </tbody>
            //       </table>
            //     </div>
            //   </div>
            // </div>
            <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-neutral mb-4">Event Registrations</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="text-neutral">
                <th>Name(s)</th>
                <th>Phone</th>
                <th>Gender(s)</th>
                <th>Event ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((reg) => (
                <tr key={reg.id} className="hover">
                  <td className="font-semibold text-neutral">
                    {reg.player.name2 ? `${reg.player.name1} & ${reg.player.name2}` : reg.player.name1}
                  </td>
                  <td className="text-neutral">
                    {reg.phone.phone2 ? `${reg.phone.phone1}, ${reg.phone.phone2}` : reg.phone.phone1}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <span className="badge badge-outline badge-secondary">
                        {reg.gender.gender1}
                      </span>
                      {reg.gender.gender2 && (
                        <span className="badge badge-outline badge-secondary">
                          {reg.gender.gender2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-neutral">{reg.eventId}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-xs btn-outline btn-info" onClick={() => handleEdit(reg.id)}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="btn btn-xs btn-outline btn-warning" onClick={() => handleDelete(reg.id)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
          )}
        </div>
      </div>

      {/* Event Hosting Modal */}
      <EventHostingModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={handleEventCreate}
      />
    </div>
  );
};

export default AdminDashboard;