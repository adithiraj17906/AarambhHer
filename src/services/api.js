const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  // Jobs API
  getJobs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/jobs${query ? `?${query}` : ''}`);
    return res.json();
  },
  getJobById: async (id) => {
    const res = await fetch(`${API_BASE_URL}/jobs/${id}`);
    return res.json();
  },
  createJob: async (jobData) => {
    const res = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });
    return res.json();
  },
  applyForJob: async (jobId, applicantData) => {
    const res = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicantData)
    });
    return res.json();
  },

  // Gigs API
  getGigs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/gigs${query ? `?${query}` : ''}`);
    return res.json();
  },
  createGig: async (gigData) => {
    const res = await fetch(`${API_BASE_URL}/gigs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gigData)
    });
    return res.json();
  },

  // Videos / Learning API
  getVideos: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/videos${query ? `?${query}` : ''}`);
    return res.json();
  },

  // Advisor / Chatbot API
  getAdvisorReplies: async () => {
    const res = await fetch(`${API_BASE_URL}/advisor/replies`);
    return res.json();
  },
  chatWithAdvisor: async (message) => {
    const res = await fetch(`${API_BASE_URL}/advisor/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    return res.json();
  }
};
