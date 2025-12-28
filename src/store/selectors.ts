import { createSelector } from '@reduxjs/toolkit';
import { StateType } from './reducer';
import { Offer } from '../types/offer';

export const selectOffersList = (state: StateType) => state.offersList;
export const selectCity = (state: StateType) => state.city;
export const selectSelectedPoint = (state: StateType) => state.selectedPoint;

export const selectCurrentCityOffers = createSelector(
  [selectOffersList, selectCity],
  (offersList: Offer[], city: string) => offersList.filter((offer) => offer.city.name === city)
);
