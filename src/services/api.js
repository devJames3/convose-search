import axios from 'axios';

const API_URL = 'https://be-v2.convose.com/autocomplete/interests';
const AUTH_TOKEN = 'Jy8RZCXvvc6pZQUu2QZ2';

export const fetchInterests = async (query, limit = 10, from = 0) => {
  try {
    const response = await axios.get(API_URL, {
      params: { q: query, limit, from },
      headers: { Authorization: AUTH_TOKEN },
    });
    return response.data.autocomplete;
  } catch (error) {
    console.error('Error fetching interests:', error);
    return [];
  }
};
