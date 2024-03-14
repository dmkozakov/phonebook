import { Formik, Form, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { selectContacts } from 'redux/contacts/selectors';
import { addContact } from 'redux/contacts/operations';
import { Input } from 'components/Input/Input';
import { ValidationError } from './ContactForm.styled';
import { Button, Stack } from '@mui/material';
import { IContactForm } from 'interfaces/IContact';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const initialValues = {
  name: '',
  number: '',
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  number: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

interface Props {
  btnText: string;
}

export function ContactForm({ btnText }: Props) {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);

  const handleSubmit = (
    newContact: IContactForm,
    { resetForm }: FormikHelpers<IContactForm>
  ) => {
    const isRepeat = contacts.find(contact => contact.name === newContact.name);

    if (isRepeat) {
      return alert(`${newContact.name} is already in your contacts`);
    } else {
      dispatch(addContact(newContact));
    }

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Stack
          spacing={1}
          sx={{
            minWidth: '280px',
            width: '400px',
          }}
        >
          <label>
            <Input
              sx={{ width: '100%' }}
              size="small"
              label="Name"
              variant="outlined"
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <ValidationError name="name" component="div" />
          </label>
          <label>
            <Input
              sx={{ width: '100%' }}
              size="small"
              label="Number"
              variant="outlined"
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <ValidationError name="number" component="div" />
          </label>
          <Button
            variant="contained"
            sx={{ my: 0, color: 'white', display: 'block' }}
            type="submit"
          >
            Add contact
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
}
