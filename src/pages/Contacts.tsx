import React, { useEffect } from 'react';
import { Filter } from '../components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { Loader } from 'components/Loader/Loader';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contacts/selectors';
import { fetchContacts } from 'redux/contacts/operations';
import { Container, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

export default function Contacts() {
  const contacts = useAppSelector(selectContacts);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" ml={4} mt={2} sx={{ fontWeight: 500 }}>
        Your contacts
      </Typography>
      <Filter />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {contacts.length > 0 && <ContactList />}
    </Container>
  );
}
