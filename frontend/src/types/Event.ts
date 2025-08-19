export type Category = 'Singles' | 'Doubles' | 'Mixed Doubles';

export interface Event {
  id: bigint;
  free: boolean;
  title: string;
  description: string;
  category: Category;
  date: string;
  time: string;
  venue: string;
  amount: number;
  created_at: string;
}

// export interface Player {
//   id: number;
//   name: string;
//   email: string;
//   skill_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
//   preferred_category: Category;
//   registered_events: number[];
//   created_at: string;
// }

export interface SinglesPlayer {
  id: number;
  name1: string;
  gender1: string; 
  phone1: string;
  created_at: string;
}

export interface DoublesPlayer {
  id: number;
  name1: string;
  name2: string;
  gender1: string; 
  gender2: string;
  phone1: string;
  phone2: string;
  created_at: string;
}

export interface Registration {
  id: number; 
  player: {name1: string, name2?: string};
  gender: {gender1: string, gender2?: string};
  phone: {phone1: string, phone2?: string};
  eventId: bigint;
}

export interface Match {
  id: number;
  event_id: number;
  player1_id: number;
  player2_id: number;
  player1_name: string;
  player2_name: string;
  round: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  scheduled_time?: string;
  result?: string;
}