export type AUTH_TYPE = 'login' | 'register'

export interface IuserAuthProps
{
  defaultType?: AUTH_TYPE;
}

export interface IuserAuthEmits
{
  (e: 'logged'): void;

  (e: 'registered'): void;
}

export interface AuthLoginForm
{
  email: string;
  password: string;
}

export interface AuthRegisterForm
{
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  documentType?: string;
  documentNumber?: string;
  phone?: string;
}
