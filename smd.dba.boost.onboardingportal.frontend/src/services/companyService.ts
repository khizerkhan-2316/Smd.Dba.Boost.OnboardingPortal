import { AxiosResponse } from 'axios';
import { Company } from '../types/company';
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from '../utils/api';
import { COMPANIES_ENDPOINT } from '../utils/constants';

const endpoint = COMPANIES_ENDPOINT;

export async function createCompany(company: Company): Promise<AxiosResponse> {
  return await postRequest<AxiosResponse>(endpoint, company);
}

export async function getCompanies(): Promise<Company[]> {
  return await getRequest<Company[]>(endpoint);
}

export async function getCompanyById(id: string): Promise<Company> {
  return await getRequest<Company>(`${endpoint}/${id}`);
}

export async function updateCompany(
  id: string,
  company: Company
): Promise<AxiosResponse> {
  return await putRequest<AxiosResponse>(`${endpoint}/${id}`, company);
}

export async function deleteCompany(id: string): Promise<AxiosResponse> {
  return await deleteRequest<AxiosResponse>(`${endpoint}/${id}`);
}
