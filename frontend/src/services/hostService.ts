// src/services/recommendationService.ts
import axios from "axios";
import { Event, Category } from "../types/Event.ts";

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? "http://localhost:3002" // for local dev with Nginx proxy (Docker)
    : 'https://smashrix-backend.onrender.com'; // for production

const hostApi = axios.create({
  baseURL: API_BASE_URL, // direct microservice URL
});

interface hostResponse {
  success:boolean,
  message:string,
  data:Event[]
};

interface getHostedEvents {
  success:boolean,
  message:string,
  data:Event[]
};

interface deleteResponse {
  success:boolean,
  message:string,
};

interface formDatatype{
  interested:string,
  type_of_mutual_fund:string,
  amount:number,
  final_amount:number,
  kyc_completed:boolean,
  final_disbursed_amt:number,
};

interface EventDataType{
  free: boolean;
  title: string;
  description: string;
  category: Category;
  date: string;
  time: string;
  venue: string;
  amount: number|null;
  created_at: string;
};

export const hostService = {
  async getHostedEvents(): Promise<getHostedEvents> {
    const response = await hostApi.get("/api/host/getHostedEvents");
    return response.data;
  },
  async hostEvent(formData:EventDataType): Promise<hostResponse> {
    const response = await hostApi.post("/api/host/hostEvent",formData);
    return response.data;
  },
  async updateEvent(id:number,formData:formDatatype): Promise<hostResponse> {
    const response = await hostApi.post(`/api/host/updateEvent/${id}`,formData);
    return response.data;
  },
  async deleteEvent(id:number): Promise<deleteResponse> {
    const response = await hostApi.delete(`/api/host/deleteEvent/${id}`);
    return response.data;
  }
};
