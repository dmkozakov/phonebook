import axios from 'axios';
import { createAppAsyncThunk } from 'redux/hooks';
import { IContact, IContactForm } from 'interfaces/IContact';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = createAppAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAppAsyncThunk(
  'contacts/addContact',
  async ({ name, number }: IContactForm, thunkAPI) => {
    try {
      await axios.post('/contacts', { name, number });
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk<
  IContact,
  string,
  { rejectValue: string }
>('contacts/deleteContact', async (id, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/contacts/${id}`);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});
