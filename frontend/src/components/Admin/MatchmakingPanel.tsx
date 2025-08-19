import React, { useState } from 'react';
import { Trophy, Users, Shuffle, Play, Clock, CheckCircle } from 'lucide-react';
import { Event, Player, Match } from '../../types/Event';

interface MatchmakingPanelProps {
  events: Event[];
  players: Player[];
}

const MatchmakingPanel: React.FC<MatchmakingPanelProps> = ({ events, players }) => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [matches, setMatches] = useState<Match[]>([
    {
      id: 1,
      event_id: 1,
      player1_id: 1,
      player2_id: 4,
      player1_name: "Alex Johnson",
      player2_name: "Emma Wilson",
      round: "Quarter Final",
      status: "Scheduled",
      scheduled_time: "2024-04-15T10:00:00Z"
    },
    {
      id: 2,
      event_id: 1,
      player1_id: 2,
      player2_id: 3,
      player1_name: "Sarah Chen",
      player2_name: "Mike Rodriguez",
      round: "Quarter Final",
      status: "In Progress"
    }
  ]);

  const generateMatches = (eventId: number) => {
    const eventPlayers = players.filter(player => 
      player.registered_events.includes(eventId)
    );

    if (eventPlayers.length < 2) {
      alert('Not enough players registered for this event');
      return;
    }

    // Simple round-robin or elimination bracket generation
    const newMatches: Match[] = [];
    const shuffledPlayers = [...eventPlayers].sort(() => Math.random() - 0.5);

    for (let i = 0; i < shuffledPlayers.length - 1; i += 2) {
      if (shuffledPlayers[i + 1]) {
        const match: Match = {
          id: matches.length + newMatches.length + 1,
          event_id: eventId,
          player1_id: shuffledPlayers[i].id,
          player2_id: shuffledPlayers[i + 1].id,
          player1_name: shuffledPlayers[i].name,
          player2_name: shuffledPlayers[i + 1].name,
          round: "Round 1",
          status: "Scheduled"
        };
        newMatches.push(match);
      }
    }

    setMatches(prev => [...prev, ...newMatches]);
  };

  const updateMatchStatus = (matchId: number, status: Match['status']) => {
    setMatches(prev => prev.map(match => 
      match.id === matchId ? { ...match, status } : match
    ));
  };

  const getStatusBadge = (status: Match['status']) => {
    switch (status) {
      case 'Scheduled':
        return <span className="badge badge-info">Scheduled</span>;
      case 'In Progress':
        return <span className="badge badge-warning">In Progress</span>;
      case 'Completed':
        return <span className="badge badge-success">Completed</span>;
      case 'Cancelled':
        return <span className="badge badge-error">Cancelled</span>;
      default:
        return <span className="badge badge-neutral">Unknown</span>;
    }
  };

  const getStatusIcon = (status: Match['status']) => {
    switch (status) {
      case 'Scheduled':
        return <Clock className="w-4 h-4" />;
      case 'In Progress':
        return <Play className="w-4 h-4" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const selectedEventData = selectedEvent ? events.find(e => e.id === selectedEvent) : null;
  const eventMatches = selectedEvent ? matches.filter(m => m.event_id === selectedEvent) : [];
  const registeredPlayers = selectedEvent ? 
    players.filter(p => p.registered_events.includes(selectedEvent)) : [];

  return (
    <div className="space-y-6" data-theme="light">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral flex items-center">
          <Trophy className="w-7 h-7 mr-3 text-primary" />
          Tournament Matchmaking
        </h2>
      </div>

      {/* Event Selection */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title text-neutral mb-4">Select Event for Matchmaking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={`card cursor-pointer transition-all hover:shadow-md ${
                  selectedEvent === event.id 
                    ? 'bg-primary text-primary-content shadow-lg' 
                    : 'bg-base-200 hover:bg-base-300'
                }`}
                onClick={() => setSelectedEvent(event.id)}
              >
                <div className="card-body p-4">
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm opacity-80">{event.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs">{event.date}</span>
                    <span className="badge badge-sm">
                      {players.filter(p => p.registered_events.includes(event.id)).length} players
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedEventData && (
        <>
          {/* Event Details & Actions */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="card-title text-neutral">{selectedEventData.title}</h3>
                  <p className="text-neutral/70">{selectedEventData.description}</p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => generateMatches(selectedEvent!)}
                  disabled={registeredPlayers.length < 2}
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Generate Matches
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="stat bg-base-200 rounded-lg">
                  <div className="stat-figure text-primary">
                    <Users className="w-8 h-8" />
                  </div>
                  <div className="stat-title">Registered Players</div>
                  <div className="stat-value text-primary">{registeredPlayers.length}</div>
                </div>

                <div className="stat bg-base-200 rounded-lg">
                  <div className="stat-figure text-secondary">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div className="stat-title">Generated Matches</div>
                  <div className="stat-value text-secondary">{eventMatches.length}</div>
                </div>

                <div className="stat bg-base-200 rounded-lg">
                  <div className="stat-figure text-accent">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="stat-title">Completed</div>
                  <div className="stat-value text-accent">
                    {eventMatches.filter(m => m.status === 'Completed').length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registered Players */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-neutral mb-4">Registered Players</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {registeredPlayers.map((player) => (
                  <div key={player.id} className="card bg-base-200">
                    <div className="card-body p-4">
                      <h4 className="font-semibold text-neutral">{player.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`badge ${
                          player.skill_level === 'Professional' ? 'badge-error' :
                          player.skill_level === 'Advanced' ? 'badge-warning' :
                          player.skill_level === 'Intermediate' ? 'badge-info' : 'badge-success'
                        }`}>
                          {player.skill_level}
                        </span>
                        <span className="text-xs text-neutral/70">{player.preferred_category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Match Brackets */}
          {eventMatches.length > 0 && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="card-title text-neutral mb-4">Match Brackets</h3>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr className="text-neutral">
                        <th>Match</th>
                        <th>Round</th>
                        <th>Players</th>
                        <th>Status</th>
                        <th>Scheduled Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventMatches.map((match) => (
                        <tr key={match.id} className="hover">
                          <td className="font-semibold text-neutral">#{match.id}</td>
                          <td>
                            <span className="badge badge-outline badge-primary">{match.round}</span>
                          </td>
                          <td>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-neutral">{match.player1_name}</span>
                              <span className="text-neutral/50">vs</span>
                              <span className="font-medium text-neutral">{match.player2_name}</span>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(match.status)}
                              {getStatusBadge(match.status)}
                            </div>
                          </td>
                          <td className="text-neutral">
                            {match.scheduled_time ? 
                              new Date(match.scheduled_time).toLocaleString() : 
                              'TBD'
                            }
                          </td>
                          <td>
                            <div className="dropdown dropdown-end">
                              <div tabIndex={0} role="button" className="btn btn-sm btn-outline">
                                Actions
                              </div>
                              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                  <button onClick={() => updateMatchStatus(match.id, 'In Progress')}>
                                    Start Match
                                  </button>
                                </li>
                                <li>
                                  <button onClick={() => updateMatchStatus(match.id, 'Completed')}>
                                    Mark Complete
                                  </button>
                                </li>
                                <li>
                                  <button onClick={() => updateMatchStatus(match.id, 'Cancelled')}>
                                    Cancel Match
                                  </button>
                                </li>
                              </ul>
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
        </>
      )}
    </div>
  );
};

export default MatchmakingPanel;