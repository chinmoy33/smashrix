// src/services/recommendationService.ts
import axios from "axios";
import { Event, Category } from "../types/Event.ts";
import { Registration } from "../types/Event.ts";
import {Match,Team} from "../types/Match.ts"

const BACKEND_API_URL = import.meta.env.VITE_API_URL ;

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? "http://localhost:3002" // for local dev with Nginx proxy (Docker)
    : BACKEND_API_URL; // for production

const matchApi = axios.create({
  baseURL: API_BASE_URL, // direct microservice URL
});

interface matchResponse{
    success: boolean;
    message: string;
    data: Match[];
}

interface deleteResponse {
  success:boolean,
  message:string,
};

interface toggleCompletedResponse {
  success:boolean,
  message:string,
};


export const matchService = {
  async getMatches(): Promise<matchResponse> {
    const response = await matchApi.get('/api/matches/getMatches');
    return response.data;
  },
  async saveMatches(matches:Match[]): Promise<matchResponse> {
    const response = await matchApi.post(`/api/matches/saveMatches/`,{matches});
    return response.data;
  },
  async toggleCompleted(id:bigint|undefined,completed:boolean|undefined): Promise<toggleCompletedResponse> {
    const response = await matchApi.post(`/api/matches/toggleCompleted/${id}`,{completed});
    return response.data;
  },
  async clearMatches() : Promise<deleteResponse> {
    const response = await matchApi.delete("/api/matches/clearMatches");
    return response.data;
  }
};
