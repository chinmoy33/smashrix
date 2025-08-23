export interface Team {
  id: bigint; 
  player: {name1: string, name2?: string};
  gender: {gender1: string, gender2?: string};
  phone: {phone1: string, phone2?: string};
  eventId: bigint;
  eligible:boolean;
};

export interface Match {
  id?:bigint;
  team1: Team;
  team2?: Team; // undefined if odd team out (BYE)
  category: "Boys" | "Girls" | "Mixed";
  completed?:boolean;
};