export interface IContact {
  id: string;
  name: string;
  number: string;
}

export type IContactForm = Omit<IContact, 'id'>;
