import axios from 'axios';

const apiKey = '1bba39-5ef7c5';
export const AviationEdgePublicAPI = axios.create({
  baseURL: 'https://aviation-edge.com/v2/public/',
  params: { key: apiKey }
});