import {ApolloError} from '@apollo/client';

export type ToggleState = () => void;

export interface IAuthType {
  text: React.ReactNode,
  action: React.ReactNode,
}

export interface IAuthCreateUser {
  email: string,
  password: string,
  username: string,
}

export interface IAuthData {
  authFn: (data: IAuthCreateUser) => Promise<void>;
  // @TODO: type explicit
  data: any;
  loading: boolean;
  error: ApolloError | undefined;
}

export interface IInputField {
  placeholder: string,
  autoComplete?: string,  
  label: string,
  type?: string,
  error?: string | undefined, 
}

export interface IInputFields {
  username?: IInputField,
  email: IInputField,
  password: IInputField,
  confirmPassword?: IInputField,
}

export type SignUpValues = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
}
