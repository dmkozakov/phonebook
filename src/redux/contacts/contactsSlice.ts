import { AnyAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';
import { logout } from 'redux/auth/operations';
import { IContact } from 'interfaces/IContact';

export interface ContactsState {
  items: IContact[] | [];
  isLoading: boolean;
  error: string | null;
}

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
} as ContactsState;

const handlePending = (state: ContactsState) => {
  state.isLoading = true;
};

const isError = (action: AnyAction) => {
  return action.type.endsWith('rejected');
};

const handleRejected = (
  state: ContactsState,
  action: PayloadAction<string | null>
) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFetchContacts = (
  state: ContactsState,
  action: PayloadAction<IContact[]>
) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};

const handleAddContact = (
  state: ContactsState,
  action: PayloadAction<IContact[]>
) => {
  state.isLoading = false;
  state.error = null;
  state.items = action.payload;
};

const handleDeleteContact = (
  state: ContactsState,
  action: PayloadAction<IContact>
) => ({
  ...state,
  isLoading: false,
  error: null,
  items: [...state.items.filter(contact => contact.id !== action.payload.id)],
});

const handleLogOutUser = (state: ContactsState) => {
  state.items = [];
  state.isLoading = false;
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFetchContacts)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleAddContact)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleDeleteContact)
      .addCase(logout.fulfilled, handleLogOutUser)
      .addMatcher(isError, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
