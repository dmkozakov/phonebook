import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from 'redux/auth/selectors';

interface Props {
  component: ReactElement;
  redirectTo: string;
}

export const RestrictedRoute = ({
  component: Component,
  redirectTo = '/',
}: Props) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    navigate(redirectTo);
    return null;
  } else {
    return Component;
  }
};
