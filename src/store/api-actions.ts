import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types/offer';
import { AuthInfo } from '../types/auth-info';
import { saveToken } from '../services/token';

type ThunkApiConfig = {
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  ThunkApiConfig
>('offers/fetch', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>('/offers');
  return data;
});

export const checkAuthAction = createAsyncThunk<
  AuthInfo,
  undefined,
  ThunkApiConfig
>('auth/check', async (_arg, { extra: api }) => {
  const { data } = await api.get<AuthInfo>('/login');
  return data;
});

export const loginAction = createAsyncThunk<
  AuthInfo,
  { email: string; password: string },
  ThunkApiConfig
>('auth/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<AuthInfo>('/login', {
    email,
    password,
  });
  saveToken(data.token);
  return data;
});

