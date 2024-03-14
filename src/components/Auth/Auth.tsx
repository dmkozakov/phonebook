import { Box, Button } from '@mui/material';
import * as S from 'components/Layout/Layout.styled';

export function Auth() {
  return (
    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
      <S.Link to="/signup">
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
          Sign up
        </Button>
      </S.Link>
      <S.Link to="/login">
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>
      </S.Link>
    </Box>
  );
}
