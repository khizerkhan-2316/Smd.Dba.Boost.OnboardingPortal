import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from '../utils/api';

import { ProductFeed } from '../types/productfeed';
import { AxiosResponse } from 'axios';

import { PRODUCTFEEDS_ENDPOINT } from '../utils/constants';

const endpoint = PRODUCTFEEDS_ENDPOINT;

export async function createProductFeed(
  productFeed: ProductFeed
): Promise<AxiosResponse> {
  return await postRequest<AxiosResponse>(endpoint, productFeed);
}

export async function getProductFeedsByCompanyId(
  companyId: string
): Promise<ProductFeed[]> {
  return await getRequest<ProductFeed[]>(`${endpoint}?companyId=${companyId}`);
}

export async function getProductFeedById(id: string): Promise<ProductFeed> {
  return await getRequest<ProductFeed>(`${endpoint}/${id}`);
}

export async function updateProductFeed(
  id: string,
  productFeed: ProductFeed
): Promise<AxiosResponse> {
  return await putRequest<AxiosResponse>(`${endpoint}/${id}`, productFeed);
}

export async function deleteProductFeed(id: string): Promise<AxiosResponse> {
  return await deleteRequest<AxiosResponse>(`${endpoint}/${id}`);
}
