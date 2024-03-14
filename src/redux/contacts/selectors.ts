import { createSelector } from '@reduxjs/toolkit';
import { IContact } from 'interfaces/IContact';
import { RootState } from 'redux/store';

export const selectContacts = (state: RootState) => state.contacts.items;
export const selectIsLoading = (state: RootState) => state.contacts.isLoading;
export const selectError = (state: RootState) => state.contacts.error;
export const selectFilter = (state: RootState) => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter((contact: IContact) => {
      return contact.name.toLowerCase().includes(filter);
    });
  }
);
