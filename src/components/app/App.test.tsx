import { screen } from '@testing-library/react';
import App from './app';
import { renderWithProviders } from '../../utils/test-utils';
import { AuthorizationStatus } from '../../const';

vi.mock('../../store/api-actions', () => ({
  fetchOffersAction: () => ({ type: 'mock/fetchOffers' }),
  checkAuthAction: () => ({ type: 'mock/checkAuth' }),
}));

describe('Application Routing', () => {
  it('should render Main page on "/"', () => {
    renderWithProviders(<App />, {
      route: '/',
      preloadedState: {
        authorizationStatus: AuthorizationStatus.Auth,
        isOffersLoading: false,
        offersList: [],
      },
    });

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render Login page on "/login"', () => {
    renderWithProviders(<App />, {
      route: '/login',
      preloadedState: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        isOffersLoading: false,
      },
    });

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render 404 page on unknown route', () => {
    renderWithProviders(<App />, {
      route: '/unknown',
      preloadedState: {
        authorizationStatus: AuthorizationStatus.Auth,
        isOffersLoading: false,
      },
    });

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});


