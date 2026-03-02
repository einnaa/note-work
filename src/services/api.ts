import type { JobApplication } from '../types';

// Fetch-based API service (using native fetch to avoid axios dependency until installed)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private baseURL = API_BASE_URL;

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  // Auth endpoints
  async signup(email: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/signup`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  async login(email: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('auth_token', data.token);
    }
    return data;
  }

  async logout() {
    localStorage.removeItem('auth_token');
  }

  // Job applications endpoints
  async getApplications() {
    const response = await fetch(`${this.baseURL}/applications`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }

  async getApplication(id: string) {
    const response = await fetch(`${this.baseURL}/applications/${id}`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }

  async createApplication(application: Omit<JobApplication, 'id' | 'created_at' | 'updated_at' | 'user_id'>) {
    const response = await fetch(`${this.baseURL}/applications`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(application),
    });
    return response.json();
  }

  async updateApplication(id: string, application: Partial<JobApplication>) {
    const response = await fetch(`${this.baseURL}/applications/${id}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(application),
    });
    return response.json();
  }

  async deleteApplication(id: string) {
    const response = await fetch(`${this.baseURL}/applications/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return response.json();
  }

  async bulkUpdateStatus(ids: string[], status: JobApplication['status']) {
    const response = await fetch(`${this.baseURL}/applications/bulk-update`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify({ ids, status }),
    });
    return response.json();
  }

  // Analytics endpoints
  async getAnalytics() {
    const response = await fetch(`${this.baseURL}/analytics`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }

  async getTimeline() {
    const response = await fetch(`${this.baseURL}/analytics/timeline`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }
}

export default new ApiService();
