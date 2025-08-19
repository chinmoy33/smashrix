// src/services/recommendationService.ts
import axios from "axios";
import { Event, Category } from "../types/Event.ts";
import { Registration } from "../types/Event.ts";

const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? "http://localhost:3002" // for local dev with Nginx proxy (Docker)
    : 'https://recommendation-service-r2gb.onrender.com'; // for production

const registrationApi = axios.create({
  baseURL: API_BASE_URL, // direct microservice URL
});

interface registrationResponse{
    success: boolean;
    message: string;
    data: Registration[];
}

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

interface SingleDataType{
  name1:string;
  gender1:string;
  phone1:string;
  created_at: string;
};

interface DoubleDataType{
  name1:string;
  name2:string;
  gender1:string;
  gender2:string;
  phone1:string;
  phone2:string;
  created_at: string;
};

export const registrationService = {
  async getRegistrations(): Promise<registrationResponse> {
    const response = await registrationApi.get('/api/registration/');
    return response.data;
  },
  async registerEvent(id:bigint,formData:SingleDataType|DoubleDataType): Promise<hostResponse> {
    const response = await registrationApi.post(`/api/registration/registerEvent/${id}`,formData);
    return response.data;
  },
  async updateEvent(id:number,formData:formDatatype): Promise<hostResponse> {
    const response = await registrationApi.post(`/api/registration/updateEvent/${id}`,formData);
    return response.data;
  },
  async deleteEvent(id:number): Promise<deleteResponse> {
    const response = await registrationApi.delete(`/api/registration/deleteEvent/${id}`);
    return response.data;
  }
};
