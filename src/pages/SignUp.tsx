import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField } from '@mui/material';
import { register as registerUser } from 'redux/auth/operations';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ValidationErrorMessage } from 'components/Auth/Auth.styled';
import { useAppDispatch } from 'redux/hooks';
import { IUserCredentials } from 'interfaces/IUser';

const schema = yup
  .object({
    name: yup
      .string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required(),
    email: yup
      .string()

      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email may contain only letters and numbers'
      )
      .required(),
    password: yup
      .string()
      .min(7, 'Password must be at least 7 characters')
      .required(),
  })
  .required();

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: initialValues });

  const dispatch = useAppDispatch();

  const onSubmit = (data: IUserCredentials) => {
    dispatch(registerUser(data));
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        component="form"
        sx={{ mt: 3 }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Box
          component="div"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: 300,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="name"
            size="small"
            {...register('name')}
            required
          />
          {errors.name && (
            <ValidationErrorMessage>
              {errors.name?.message}
            </ValidationErrorMessage>
          )}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            size="small"
            {...register('email')}
            required
          />
          {errors.email && (
            <ValidationErrorMessage>
              {errors.email?.message}
            </ValidationErrorMessage>
          )}

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            size="small"
            {...register('password')}
            required
          />
          {errors.password && (
            <ValidationErrorMessage>
              {errors.password?.message}
            </ValidationErrorMessage>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{ my: 0, color: 'white', display: 'block' }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
