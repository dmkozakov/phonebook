import { setFilter } from 'redux/filter/filterSlice';
import { selectFilter } from 'redux/contacts/selectors';
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ChangeEvent } from 'react';

export const Filter = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);

  const changeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(e.target.value.toLowerCase()));
  };

  return (
    <TextField
      id="outlined-basic"
      label="Filter contacts by name"
      variant="outlined"
      size="small"
      type="text"
      value={filter}
      onChange={changeFilter}
      sx={{ minWidth: '300px', maxWidth: '500px', width: '100%' }}
    />
  );
};
