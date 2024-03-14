import { TextField } from '@mui/material';
import { useField } from 'formik';

type InputProps = {
  label: string;
  name: string;
  // validate?: (value: any) => undefined | string | Promise<any>;
  type?: string;
  // multiple?: boolean;
  value?: string;
  size: 'small' | 'medium' | undefined;
  variant?: 'outlined' | 'standard' | 'filled';
  title?: string;
  required?: boolean;
  pattern?: string;
  id?: string;
  sx?: any;
};

export const Input = ({ label, ...otherProps }: InputProps) => {
  const [field] = useField(otherProps);

  return <TextField {...field} {...otherProps} />;
};
