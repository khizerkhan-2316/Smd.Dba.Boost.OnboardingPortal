import axios, { AxiosInstance } from 'axios';
import { LocalStorageKey } from '../Enums/localStorageKeys';

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);

if (token) {
  axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
}

axiosInstance.interceptors.response.use(
  (response) => {
    const authorizationHeader = response.headers['authorization'];
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, token);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export async function post<T>(endpoint: string, body: object): Promise<T> {
  try {
    const response = await axiosInstance.post(endpoint, body);
    return response.data as T;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function get<T>(endpoint: string): Promise<T> {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data as T;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function put<T>(endpoint: string, body: object): Promise<T> {
  try {
    const response = await axiosInstance.put(endpoint, body);
    return response.data as T;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function del<T>(endpoint: string): Promise<T> {
  try {
    const response = await axiosInstance.delete(endpoint);
    return response.data as T;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}
