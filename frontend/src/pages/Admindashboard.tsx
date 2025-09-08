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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {Category} from '../types/Event';
import { DoublesPlayer, SinglesPlayer } from '../types/Event.ts';
import RegistrationModal from '../components/RegistrationModal';
import SearchBar from '../components/Admin/SearchBar';
import DescriptionWithReadMore from '../components/Admin/DescriptionWithReadMore.tsx';
import Sidebar from '../components/Admin/Sidebar';
import ConfirmDeleteModal from '../components/Admin/ConfirmDeleteModal.tsx';
import {teams} from '../Data/teams.ts'

interface EventDetails {
  id: bigint;
  category: Category|null;
  playerid:bigint;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [eventDetails, setEventDetails] = useState<EventDetails|null>(null);
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Registration[]>([]);
  const [refreshPlayers, setRefreshPlayers] = useState(false);
  const [refreshEvents, setRefreshEvents] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [update, setUpdate] = useState(false);
  const [eventId, setEventId] = useState<bigint|null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<bigint|null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleteEvent, setIsDeleteEvent] = useState(false);
  
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
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await hostService.getHostedEvents();
        if (response.success) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching hosted events:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchEvents();
  }, [refreshEvents]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await registrationService.getRegistrations();
        if (response.success) {
          console.log("Fetched registrations:", response.data);
          setPlayers(response.data);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [refreshPlayers]);

  
  const navigate = useNavigate();

  const refresh = () => setRefreshPlayers(prev => !prev);
  const refreshEventsFunction = () => setRefreshEvents(prev => !prev);

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

  const handleEventCreate = (id:bigint|null,newEvent: Omit<Event, 'id' | 'created_at'>) => {
    
    try{
        setLoading(true);
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
      setLoading(false);
    }
    
  };

  const handleEventUpdate = (id:bigint|null,newEvent: Omit<Event, 'id' | 'created_at'>) => {
    
    try{
        setLoading(true);
        hostService.updateEvent(id,newEvent as Event)
      .then(response => {
        if (response.success) {
          console.log("Event edited successfully:", response.data);
          setEvents(events.map(event => 
              event.id === id ? { ...event, ...response.data } : event
            ));
          refreshEventsFunction();
          setIsEventModalOpen(false);
          toast.success("Event edited successfully");
        } else {
          toast.error(response.message);
        }
      })
      .catch(error => {
        console.error("Error hosting event:", error);
        toast.error("Failed to update event");
      });
    }
    catch(error){
      console.error("Error in handleEventUpdate:", error);
      toast.error("Failed to update event");
    }
    finally{
      setIsEventModalOpen(false);
      setLoading(false);
      setUpdate(false);
    }
    
  };

  const stats = {
    totalEvents: events.length,
    totalPlayers: players.length,
  };

  const getEventName = (eventId: bigint) => {
  const event = events.find((e) => e.id === eventId);
  return event ? event.title : "Unknown Event";
};
  
  const getEventCategory = (eventId: bigint) => {
  const event = events.find((e) => e.id === eventId);
  return event ? event.category : null;
};

const handleRegisterSingle = (id:bigint,newRegister: Omit<SinglesPlayer, 'id' | 'created_at'>) => {
     
      try{
          setLoading(true);
          registrationService.updateRegistration(id,newRegister as SinglesPlayer)
        .then(response => {
          if (response.success) {
            //console.log("You have been registered successfully:", response.data)
            setPlayers(players.map(player => 
              player.id === id ? { ...player, ...response.data } : player
            ));
            refresh();
            setIsRegistrationModalOpen(false);
            toast.success("Registration updated successfully");
          } else {
            toast.error(response.message);
          }
        })
        .catch(error => {
          console.error("Error registering in event:", error);
          toast.error("update failed");
        });
      }
      catch(error){
        console.error("Error in handleEventCreate:", error);
        toast.error("update failed");
      }
      finally{
        setIsRegistrationModalOpen(false);
        setLoading(false);
      }
      
    };

    const handleRegisterDouble = (id:bigint,newRegister: Omit<DoublesPlayer, 'id' | 'created_at'>) => {
      
      try{
          setLoading(true);
          registrationService.updateRegistration(id,newRegister as DoublesPlayer)
        .then(response => {
          if (response.success) {
            //console.log("Registration updated successfully:", response.data)
            setPlayers(players.map(player => 
              player.id === id ? { ...player, ...response.data } : player
            ));
            refresh();
            setIsRegistrationModalOpen(false);
            toast.success("Registration updated successfully");
          } else {
            toast.error(response.message);
          }
        })
        .catch(error => {
          console.error("Error registering in event:", error);
          toast.error("Update failed");
        });
      }
      catch(error){
        console.error("Error in handleEventCreate:", error);
        toast.error("Update failed");
      }
      finally{
        setIsRegistrationModalOpen(false);
        setLoading(false);
      }
      
    };

  // Export to CSV
  const handleExportCSV = () => {
    setLoading(true);
    try{
      const headers = ["Name(s)", "Phone", "Gender(s)", "Event Name"];
      const rows = players.map((reg) => [
        reg.player.name2 ? `${reg.player.name1} & ${reg.player.name2}` : reg.player.name1,
        reg.phone.phone2 ? `${reg.phone.phone1}, ${reg.phone.phone2}` : reg.phone.phone1,
        reg.gender.gender2 ? `${reg.gender.gender1}, ${reg.gender.gender2}` : reg.gender.gender1,
        getEventName(reg.eventId),
      ]);

      // Escape values properly
      const escapeCSV = (value: any) => {
        if (value == null) return "";
        const str = String(value);
        return str.includes(",") ? `"${str}"` : str;
      };

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers, ...rows]
          .map((row) => row.map(escapeCSV).join(","))
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "players.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Failed to export CSV");
    }
    finally{
      setLoading(false);
    }
};


  // Export to PDF
  const handleExportPDF = () => {
    try{
      const doc = new jsPDF();

      doc.text("Player Registrations", 14, 15);

      const tableColumn = ["Name(s)", "Phone", "Gender(s)", "Event Name"];
      const tableRows = players.map((reg) => [
        reg.player.name2 ? `${reg.player.name1} & ${reg.player.name2}` : reg.player.name1,
        reg.phone.phone2 ? `${reg.phone.phone1}, ${reg.phone.phone2}` : reg.phone.phone1,
        reg.gender.gender2 ? `${reg.gender.gender1}, ${reg.gender.gender2}` : reg.gender.gender1,
        getEventName(reg.eventId),
      ]);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
      });

      doc.save("players.pdf");
    }
    catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF");
    }finally{
      setLoading(false);
    }
};

const handleDelete = async (id: bigint) => {
  try{
    setLoading(true);
    const response = await registrationService.deleteRegistration(id);
    if (response.success) {
      setPlayers(players.filter((player) => player.id !== id));
      toast.success("Registration deleted successfully");
    } else {
      toast.error(response.message);
    }
  }
  catch (error) {
    console.error("Error deleting registration:", error);
    toast.error("Failed to delete registration");
  }
  finally{
    setLoading(false);
  }
}

const handleDeleteEvent = async (id: bigint) => {
  try{
    setLoading(true);
    const response = await hostService.deleteEvent(id);
    if (response.success) {
      setEvents(events.filter((event) => event.id !== id));
      refresh();
      toast.success("Event deleted successfully");
    } else {
      toast.error(response.message);
    }
  }
  catch (error) {
    console.error("Error deleting event:", error);
    toast.error("Failed to delete event");
  }
  finally{
    setLoading(false);
    setDeleteId(null);
    setIsConfirmModalOpen(false);
  }
}

const filteredPlayers = players.filter((reg) => {
  const playerNames = reg.player.name2 
    ? `${reg.player.name1} ${reg.player.name2}`.toLowerCase() 
    : reg.player.name1.toLowerCase();
  
  const phoneNumbers = reg.phone.phone2 
    ? `${reg.phone.phone1} ${reg.phone.phone2}` 
    : reg.phone.phone1;

  return (
    playerNames.includes(searchQuery.toLowerCase()) ||
    phoneNumbers.includes(searchQuery) ||
    getEventName(reg.eventId).toLowerCase().includes(searchQuery.toLowerCase())
  );
});

  let attribute1:any;
  let attribute2:any;

  if(window.innerWidth < 1500) {
    attribute1 = "max-w-[60vw]";  
    attribute2 = "flex-col";
  }
  else {  
    attribute1 = "";
    attribute2 = "";
  }
  const renderOverview = () => (
  <div className="space-y-6">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[{
        title: "Total Events",
        value: events.length,
        icon: <Calendar className="w-6 sm:w-8 h-6 sm:h-8 opacity-80" />,
        bg: "bg-primary text-primary-content"
      }, {
        title: "Total Players",
        value: players.length,
        icon: <Users className="w-6 sm:w-8 h-6 sm:h-8 opacity-80" />,
        bg: "bg-secondary text-secondary-content"
      }].map((card, idx) => (
        <div key={idx} className={`card shadow-lg w-full ${card.bg}`}>
          <div className="card-body p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="truncate">
                <h3 className="card-title text-sm opacity-90 truncate">{card.title}</h3>
                <p className="text-2xl sm:text-3xl font-bold truncate">{card.value}</p>
              </div>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Recent Events */}
    <div className="card bg-base-100 shadow-lg w-full overflow-x-auto">
      <div className="card-body p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <h2 className="card-title text-neutral truncate">Recent Events</h2>
          <button 
            className="btn btn-primary btn-sm flex items-center whitespace-nowrap"
            onClick={() => { setUpdate(false); setEventId(null); setIsEventModalOpen(true); }}
          >
            <Plus className="w-4 h-4 mr-2" /> Host Event
          </button>
        </div>

        <div className={`overflow-x-auto ${attribute1}`}>
          <table className="table table-zebra w-full min-w-[0] sm:min-w-[500px]">
            <thead>
              <tr className="text-neutral">
                <th>Event</th>
                <th>Category</th>
                <th>Date</th>
                <th>Venue</th>
                <th>Fee</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="hover">
                  <td className="max-w-xs break-words">
                    <div className="font-semibold text-neutral">{event.title}</div>
                    <DescriptionWithReadMore text={event.description} />
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
                      <span className="text-neutral font-semibold">₹{event.amount}</span>
                    )}
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button className="btn btn-sm btn-outline btn-primary" onClick={() => { setUpdate(true); setEventId(event.id); setIsEventModalOpen(true); }}>Edit</button>
                      <button className="btn btn-sm btn-outline btn-error" onClick={()=>{setIsDeleteEvent(true);setDeleteId(event.id);setIsConfirmModalOpen(true);}}>Remove</button>
                    </div>
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

  return (
    <div className="min-h-screen bg-base-200" data-theme="smashrix">
      {/* Header */}
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-primary">Smashrix Admin Dashboard</h1>
        </div>
        <div className="flex-none">
          {/* Hamburger for mobile */}
          <button
            className="btn btn-ghost md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>

          {/* Avatar */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-sm font-semibold">A</span>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a onClick={handleLogout} className="text-error">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="w-64 min-h-screen bg-base-100 shadow-lg hidden md:block">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Mobile Top Panel */}
        <div
          className={`md:hidden fixed inset-x-0 top-0 z-50 bg-base-100 shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="p-4">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <button
              className="btn btn-sm btn-ghost mt-4"
              onClick={() => setIsSidebarOpen(false)}
            >
              Close
            </button>
          </div>
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}


        {/* Main Content */}
        {loading ? (
          <div className="flex items-center justify-center w-full min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary mx-auto mb-4"></div>
              <p className="text-gray-400">Loading Details...</p>
            </div>
          </div>
        ) : (
        <div className="flex-1 p-6">
          {activeTab === 'overview' && renderOverview()}
          {/* {activeTab === 'matchmaking' && <MatchmakingPanel initialTeams={players.map((p) => ({
                                                                            ...p,
                                                                            eligible: true,
                                                                          }))} />} */}
          {activeTab === 'matchmaking' && <MatchmakingPanel initialTeams={players}/>}
          {activeTab === 'players' && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                
                <h2 className={`card-title text-neutral mb-4 flex ${attribute2} justify-between items-center`}>
                    <span>Event Registrations</span>
                    <SearchBar 
                          placeholder="Search players, phone or event..." 
                          value={searchQuery} 
                          onChange={setSearchQuery} 
                        />
                  

                  <div className="flex items-center gap-3">
                    {/* <SearchBar 
                      placeholder="Search players, phone or event..." 
                      value={searchQuery} 
                      onChange={setSearchQuery} 
                    /> */}

                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-outline btn-primary" onClick={handleExportCSV}>
                        Export CSV
                      </button>
                      <button className="btn btn-sm btn-outline btn-secondary" onClick={handleExportPDF}>
                        Export PDF
                      </button>
                    </div>
                  </div>
                </h2>

                <div className={`overflow-x-auto ${attribute1}`}>
                  <table className="table table-sm sm:table-md table-zebra w-full">
                    <thead>
                      <tr className="text-neutral">
                        <th>Name(s)</th>
                        <th>Phone</th>
                        <th>Gender(s)</th>
                        <th>Event Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlayers.map((reg) => (
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
                          <td className="text-neutral">{getEventName(reg.eventId)}</td>
                          <td>
                            <div className="flex gap-2">
                              {/* <button className="btn btn-xs btn-outline btn-info" onClick={() => handleEdit(reg.id)}>
                                <Edit className="w-4 h-4" />
                              </button> */}
                              <button onClick={() => {setEventDetails({id:reg.eventId,category:getEventCategory(reg.eventId),playerid:reg.id});setIsRegistrationModalOpen(true)}} className="btn btn-xs btn-outline btn-info">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="btn btn-xs btn-outline btn-warning" onClick={() => {setIsDeleteEvent(false);setDeleteId(reg.id);setIsConfirmModalOpen(true);}}>
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
        </div>)}
      </div>

      {/* Event Hosting Modal */}
      <EventHostingModal
        isOpen={isEventModalOpen}
        onClose={() => {setIsEventModalOpen(false); setUpdate(false); setEventId(null);}}
        onSubmit={update===false ? handleEventCreate : handleEventUpdate}
        eventId={eventId}
      />
      {/* Event Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSubmit={eventDetails?.category==="Singles" ? handleRegisterSingle : handleRegisterDouble}
        eventDetails={eventDetails}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isConfirmModalOpen}
        onClose={() => {setIsConfirmModalOpen(false);setDeleteId(null)}}
        onConfirm={() => {
          if (isDeleteEvent && deleteId !== null) {
            handleDeleteEvent(deleteId);
          } else {
            handleDelete(deleteId);
          }
          setIsConfirmModalOpen(false);
        }}
        itemName={isDeleteEvent ? "this event" : "this player"}
        />
    </div>
  );
};

export default AdminDashboard;