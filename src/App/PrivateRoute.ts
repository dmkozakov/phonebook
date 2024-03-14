import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn, selectIsRefreshing } from 'redux/auth/selectors';

interface Props {
  component: ReactElement;
  redirectTo: string;
}

export const PrivateRoute = ({
  component: Component,
  redirectTo = '/',
}: Props) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  if (shouldRedirect) {
    navigate(redirectTo);
    return null;
  } else {
    return Component;
  }
};
