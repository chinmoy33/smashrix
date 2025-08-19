// export enum Category {
//   Singles = 'singles',
//   Doubles = 'doubles',
//   MixedDoubles = 'mixed doubles',
// }

// // Define the interface using the enum as a type
// export interface eventSchema {
//   id: number;
//   free: boolean;
//   title: string;
//   description: string;
//   category: Category;
//   date:String;
//   time:String;
//   venue:String;
//   amount: number;
//   created_at: string;
// }
export type Category = 'Singles' | 'Doubles' | 'Mixed Doubles' | 'Team Event' | 'Training' | 'Social';

export interface Event {
  id: number;
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

export interface Player {
  id: number;
  name: string;
  email: string;
  skill_level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  preferred_category: Category;
  registered_events: number[];
  created_at: string;
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