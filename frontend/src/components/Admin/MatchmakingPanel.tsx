import React, { useState,useEffect} from "react";
import {registrationService} from "../../services/registrationService"
import { toast } from 'react-hot-toast';
import {matchService} from "../../services/matchService.ts"
import {Hash} from "lucide-react"

// Team type
type Team = {
  id: bigint; 
  player: {name1: string, name2?: string};
  gender: {gender1: string, gender2?: string};
  phone: {phone1: string, phone2?: string};
  eventId: bigint;
  eligible:boolean;
};

// Match type
type Match = {
  id?:bigint;
  team1: Team;
  team2?: Team; // undefined if odd team out (BYE)
  category: "Boys" | "Girls" | "Mixed";
  completed?:boolean;
};

const Matchmaking = ({ initialTeams }: { initialTeams: Team[] }) => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [matches, setMatches] = useState<Match[]>([]);
  const [filter, setFilter] = useState<"all" | "boys" | "girls" | "mixed" | "completed" | "not completed">("all");
  const [search, setSearch] = useState("");
  const [searchTeam, setSearchTeam] = useState("");
  const [loading,setLoading] = useState(false);

    useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await matchService.getMatches();
        if(response.success)
        {
          setMatches(response.data as Match[]);
        }
      } catch (err) {
        console.error("Error fetching matches:", err);
        toast.error("Failed to load matches");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);



    const filteredTeams = teams.filter((team) => {
      const searchLower = searchTeam.toLowerCase();

      // if no search term, show all teams
      if (!searchLower) return true;

      // match against name1 and name2
      const inTeam =
        team.player.name1.toLowerCase().includes(searchLower) ||
        (team.player.name2?.toLowerCase() ?? "").includes(searchLower);

      return inTeam;
    });
  
    const filteredMatches = matches.filter((match) => {
      // search filter
      const searchLower = search.toLowerCase();
      const inTeam1 =
        match.team1.player.name1.toLowerCase().includes(searchLower) ||
        (match.team1.player.name2?.toLowerCase() ?? "").includes(searchLower);
      const inTeam2 =
        match.team2 &&
        (match.team2.player.name1.toLowerCase().includes(searchLower) ||
          (match.team2.player.name2?.toLowerCase() ?? "").includes(searchLower));
  
      if (search && !inTeam1 && !inTeam2) return false;
  
      // gender filter
      if (filter === "boys") {
        return (
          match.team1.gender.gender1 === "Male" &&
          (!match.team1.gender.gender2 || match.team1.gender.gender2 === "Male") &&
          (!match.team2 ||
            (match.team2.gender.gender1 === "Male" &&
              (!match.team2.gender.gender2 || match.team2.gender.gender2 === "Male")))
        );
      }
  
      if (filter === "girls") {
        return (
          match.team1.gender.gender1 === "Female" &&
          (!match.team1.gender.gender2 || match.team1.gender.gender2 === "Female") &&
          (!match.team2 ||
            (match.team2.gender.gender1 === "Female" &&
              (!match.team2.gender.gender2 || match.team2.gender.gender2 === "Female")))
        );
      }
  
      if (filter === "mixed") {
        const team1Mixed =
          match.team1.gender.gender1 !== match.team1.gender.gender2 &&
          match.team1.gender.gender2 !== undefined;
        const team2Mixed =
          match.team2 &&
          match.team2.gender.gender1 !== match.team2.gender.gender2 &&
          match.team2.gender.gender2 !== undefined;
  
        return team1Mixed || team2Mixed;
      }

      if (filter === "completed") {
        const teamCompleted =
          match.completed === true 

        return teamCompleted;
      }

      if (filter === "not completed") {
        const teamNotCompleted =
          match.completed === false

        return teamNotCompleted;
      }
  
      return true;
    });

    const nonByeCount = filteredMatches.filter(m => m.team2 !== undefined).length;


  const getEligibility = (teamId: bigint) => {
    const team = teams.find((t) => t.id === teamId);
    return team ? team.eligible : true; // fallback to false if not found
  };

  const getCompleted = (MatchId: bigint|undefined) => {
    const match = matches.find((m) => m.id === MatchId);
    return match ? match.completed : false; // fallback to false if not found
  }

  const toggleTeamEligibility =async (teamId: bigint) => {
    try{
      setLoading(true);
      const response = await registrationService.toggleEligibility(teamId,getEligibility(teamId));
      if(response.success)
      {
        toast.success("Eligibility status changed");
        setTeams((prev) =>
          prev.map((t) =>
            t.id === teamId ? { ...t, eligible: !t.eligible } : t
          )
        );
      }
      else{
        toast.error(response.message)
      }
    }
    catch(error)
    {
      console.error("Error changing eligibility:", error);
    }
    finally{
      setLoading(false);
    }
    
  };
  const toggleCompleted =async (matchId: bigint|undefined) => {
    try{
      setLoading(true);
      const response = await matchService.toggleCompleted(matchId,getCompleted(matchId));
      if(response.success)
      {
        toast.success("Match status changed");
        setMatches((prev) =>
          prev.map((m) =>
            m.id === matchId ? { ...m, completed: !m.completed } : m
          )
        );
      }
      else{
        toast.error(response.message)
      }
    }
    catch(error)
    {
      console.error("Error changing Match status:", error);
    }
    finally{
      setLoading(false);
    }
    
  };
  
  const generateMatches = () => {
    const eligibleTeams = teams.filter((t) => t.eligible);

    // Classification helpers
    const isMale = (team: Team) =>
      [team.gender.gender1, team.gender.gender2]
        .filter(Boolean)
        .every((g) => g?.toLowerCase() === "male");

    const isFemale = (team: Team) =>
      [team.gender.gender1, team.gender.gender2]
        .filter(Boolean)
        .every((g) => g?.toLowerCase() === "female");

    const isMixed = (team: Team) => !isMale(team) && !isFemale(team);

    // Split teams
    const maleTeams = eligibleTeams.filter(isMale);
    const femaleTeams = eligibleTeams.filter(isFemale);
    const mixedTeams = eligibleTeams.filter(isMixed);

    // Shuffle helper
    const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

    const newMatches: Match[] = [];

    const makeMatches = (group: Team[], category: "Boys" | "Girls" | "Mixed") => {
      const shuffled = shuffle(group);
      for (let i = 0; i < shuffled.length; i += 2) {
        if (i + 1 < shuffled.length) {
          newMatches.push({ team1: shuffled[i], team2: shuffled[i + 1], category });
        } else {
          newMatches.push({ team1: shuffled[i], team2: undefined, category, completed:true });
        }
      }
    };

    // Match within each group
    makeMatches(maleTeams, "Boys");
    makeMatches(femaleTeams, "Girls");
    makeMatches(mixedTeams, "Mixed");

    setMatches(newMatches);

    (async () => {
      try {
        setLoading(true);

        // Step 1: clear old matches
        await matchService.clearMatches();  // <-- implement this in your service

        // Step 2: save new matches
        await matchService.saveMatches(newMatches);

        // Step 3: reload from DB so IDs are correct
        const response = await matchService.getMatches();
        setMatches(response.data as Match[]);

        // Step 4: toast once
        toast.success("Matches generated and saved successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to generate matches");
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
  <div className="space-y-6 p-4">
    {loading ? (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Loading ...</p>
        </div>
      </div>
    ) : (
      <>
        {/* Teams selection */}
        <div className="card bg-base-100 shadow-md p-4">
          <div className="flex gap-4 items-center mb-4">
            <h2 className="text-xl font-bold mb-4">Teams</h2>
            <input
              type="text"
              placeholder="Search player..."
              className="input input-bordered input-sm w-full max-w-xs"
              value={searchTeam}
              onChange={(e) => setSearchTeam(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-scroll">
            {filteredTeams.map((team) => (
              <label
                key={team.id}
                className={`flex items-center gap-2 p-2 border rounded ${
                  team.eligible
                    ? "bg-green-100 border-green-300"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={team.eligible}
                  onChange={() => toggleTeamEligibility(team.id)}
                />
                <span className="text-sm text-neutral">
                  ({[team.player.name1, team.player.name2].filter(Boolean).join(", ")})
                </span>
              </label>
            ))}
          </div>
          <button
            className="btn btn-primary mt-4"
            onClick={() => generateMatches()}
          >
            Generate Matches
          </button>
        </div>

        {/* Matches display */}
        {matches.length > 0 && (
          <div className="space-y-4">
            <style>{`
              .force-legacy-colors * {
                color: black !important;
                background-color: white !important;
              }
            `}</style>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[{
                title: "Total Matches",
                value: nonByeCount,
                icon: <Hash className="w-6 sm:w-8 h-6 sm:h-8 opacity-80" />,
                bg: "bg-base-300 text-primary-content"
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
            <h2 className="text-xl font-bold force-legacy-colors">Matchups</h2>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Search player..."
                className="input input-bordered input-sm w-full max-w-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="select select-bordered select-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <option value="all">All</option>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="mixed">Mixed</option>
                <option value="completed">Completed</option>
                 <option value="not completed">In progress</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-scroll">
              {filteredMatches.map((match, idx) => (
                <div
                  key={idx}
                  className="card bg-base-100 shadow-md p-4 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center gap-2">
                  <h3 className="font-bold mb-2">
                    Match {idx + 1}{" "}
                    <span className="text-sm text-blue-500">
                      ({match.category})
                    </span>
                  </h3>
                  <input
                      type="checkbox"
                      className="w-6 h-6 mb-2"
                      checked={match.completed}
                      onChange={() => toggleCompleted(match.id)}
                  />
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      {match.team1.player.name1}
                    </span>
                    <span>vs</span>
                    <span className="font-semibold">
                      {match.team2 ? match.team2.player.name1 : "BYE"}
                    </span>
                  </div>
                  <div className="text-sm text-neutral">
                    {[match.team1.player.name1, match.team1.player.name2]
                      .filter(Boolean)
                      .join(", ")}
                    {match.team2
                      ? ` vs ${[match.team2.player.name1, match.team2.player.name2]
                          .filter(Boolean)
                          .join(", ")}`
                      : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    )}
  </div>
);

};

export default Matchmaking;
