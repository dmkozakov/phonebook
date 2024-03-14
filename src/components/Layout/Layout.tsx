import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import { Auth } from 'components/Auth/Auth';
import * as S from 'components/Layout/Layout.styled';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { selectIsLoggedIn, selectIsRefreshing } from 'redux/auth/selectors';
import { useAppSelector } from 'redux/hooks';

export function Layout() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);

  return !isRefreshing ? (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <S.Link to="/">
              {' '}
              <Typography
                variant="h6"
                component="span"
                noWrap
                sx={{
                  fontSize: '10',
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.06rem',
                  color: 'inherit',
                }}
              >
                PhoneBook
              </Typography>
            </S.Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <S.Link to="/">
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Home
                </Button>
              </S.Link>
              {isLoggedIn && (
                <S.Link to="/contacts">
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                    Contacts
                  </Button>
                </S.Link>
              )}
            </Box>

            {isLoggedIn ? <UserMenu /> : <Auth />}
          </Toolbar>
        </Container>
      </AppBar>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  ) : null;
}
