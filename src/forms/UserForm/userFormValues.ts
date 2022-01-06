export enum UserFormFields {
  NAME = 'name',
  EMAIL = 'email',
}

export interface UserFormValues {
  [UserFormFields.NAME]: string;
  [UserFormFields.EMAIL]: string;
}
