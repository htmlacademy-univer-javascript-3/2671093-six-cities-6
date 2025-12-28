import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setSortType, setSelectedPoint } from './action';
import { fetchOffersAction, checkAuthAction, loginAction } from './api-actions';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';

type StateType = {
  city: string;
  offersList: Offer[];
  selectedSortType: string;
  selectedPoint: { title: string } | null;
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
};

const initialState: StateType = {
  city: 'Paris',
  offersList: [],
  selectedSortType: 'Popular',
  selectedPoint: null,
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, { payload }) => {
      state.city = payload;
    })
    .addCase(setSortType, (state, { payload }) => {
      state.selectedSortType = payload;
    })
    .addCase(setSelectedPoint, (state, { payload }) => {
      state.selectedPoint = payload;
    })

    // offers
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, { payload }) => {
      state.offersList = payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.isOffersLoading = false;
    })

    // auth
    .addCase(checkAuthAction.fulfilled, (state, { payload }) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userEmail = payload.email;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginAction.fulfilled, (state, { payload }) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userEmail = payload.email;
    });
});


