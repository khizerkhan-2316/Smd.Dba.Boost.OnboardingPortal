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

export async function postRequest<AxiosResponse>(
  endpoint: string,
  body: object
): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await axiosInstance.post(endpoint, body);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function getRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data as T;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function putRequest<AxiosResponse>(
  endpoint: string,
  body: object
): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await axiosInstance.put(endpoint, body);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export async function deleteRequest<AxiosResponse>(
  endpoint: string
): Promise<AxiosResponse> {
  try {
    const response: AxiosResponse = await axiosInstance.delete(endpoint);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}
