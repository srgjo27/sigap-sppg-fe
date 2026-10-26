import { api } from '@/lib/axios';

import type { LoginPayload, LoginResponse } from './types';

const ENDPOINT = '/v1/auth';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(`${ENDPOINT}/login`, payload);
  return data;
}

export async function logout(): Promise<void> {
  await api.post(`${ENDPOINT}/logout?all=true`);
}