import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);

  return authStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to="/login" replace />;
}

export default PrivateRoute;

