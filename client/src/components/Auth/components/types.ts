interface IInputField {
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
