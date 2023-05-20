import { AxiosResponse } from 'axios';
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../utils/api';
import { USERS_ENDPOINT } from '../utils/constants';
import { User } from '../types/user';

export async function getUsersByCompanyId(companyId: string): Promise<User[]> {
  return await getRequest<User[]>(`${USERS_ENDPOINT}?companyId=${companyId}`);
}

export async function createUser(user: User): Promise<AxiosResponse> {
  return await postRequest<AxiosResponse>(USERS_ENDPOINT, user);
}

export async function getUserById(id: string): Promise<User> {
  return await getRequest<User>(`${USERS_ENDPOINT}/${id}`);
}

export async function updateUser(
  id: string,
  user: User
): Promise<AxiosResponse> {
  return await putRequest<AxiosResponse>(`${USERS_ENDPOINT}/${id}`, user);
}

export async function deleteUser(id: string): Promise<AxiosResponse> {
  return await deleteRequest<AxiosResponse>(`${USERS_ENDPOINT}/${id}`);
}
