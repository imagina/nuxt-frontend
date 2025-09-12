import type {IFormFieldConfig} from "~/components/IForm/IForm";

export const LOGIN_FORM_FIELDS: IFormFieldConfig[] = [
  {
    name: 'email',
    type: 'input',
    rules: ['required'],
    formFieldProps: {
      label: 'Correo',
      required : true
    },
    fieldProps: {
      type: 'email',
    }
  },
  {
    name: 'password',
    type: 'input',
    rules: ['required'],
    formFieldProps: {
      label: 'Contraseña',
      required : true
    },
    fieldProps: {
      type: 'password',
    }
  }
];

export const REGISTER_FORM_FIELDS: IFormFieldConfig[] = [
  ...LOGIN_FORM_FIELDS,
  {
    name: 'password_confirmation',
    type: 'input',
    rules: ['required'],
    formFieldProps: {
      label: 'Confirmación de contraseña',
      required : true
    },
    fieldProps: {
      type: 'password',
    }
  }
];
