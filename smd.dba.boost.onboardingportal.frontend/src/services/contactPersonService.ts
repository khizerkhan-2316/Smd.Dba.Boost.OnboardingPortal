import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from '../utils/api';
import { ContactPerson } from '../types/contactPerson';
import { AxiosResponse } from 'axios';

import { CONTACT_PERSONS_ENDPOINT } from '../utils/constants';

const endpoint = CONTACT_PERSONS_ENDPOINT;
export async function createContactPerson(
  contactPerson: ContactPerson
): Promise<AxiosResponse> {
  return await postRequest<AxiosResponse>(endpoint, contactPerson);
}

export async function getContactPersonsByCompanyId(
  companyId: string
): Promise<ContactPerson[]> {
  return await getRequest<ContactPerson[]>(
    `${endpoint}?companyId=${companyId}`
  );
}

export async function getContactPersonById(id: string): Promise<ContactPerson> {
  return await getRequest<ContactPerson>(`${endpoint}/${id}`);
}

export async function updateContactPerson(
  id: string,
  contactPerson: ContactPerson
): Promise<AxiosResponse> {
  return await putRequest<AxiosResponse>(`${endpoint}/${id}`, contactPerson);
}

export async function deleteContactPerson(id: string): Promise<AxiosResponse> {
  return await deleteRequest<AxiosResponse>(`${endpoint}/${id}`);
}
