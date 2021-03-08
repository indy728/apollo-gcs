
import {InlineBrand, Typography} from 'components/ui';
import {IInputFields} from './types';
import * as yup from "yup";

const inputFields: IInputFields = {
  email: {
    label: 'Email',
    placeholder: "Your email address",
    autoComplete: 'off',
    // error: errors?.email?.message,
  },
  password: {
    label: 'Password',
    placeholder: "Password",
    type: 'password',
    // error: errors?.password?.message
  },
};

const authFormHeader = (
  <>
    <Typography tag="h1">Sign in to <InlineBrand /></Typography>
  </>
)

const authType = {
  text: <>New to&nbsp;<InlineBrand />?&nbsp;</>,
  action: <>Sign up for an free account!</>,
}

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export default {
  authFormHeader,
  inputFields,
  authType,
  schema,
};
