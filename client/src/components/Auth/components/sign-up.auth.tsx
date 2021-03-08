
import {IInputFields} from './types';
import {InlineBrand, Typography} from 'components/ui';
import * as yup from "yup";

const inputFields: IInputFields = {
  username: {
    label: 'Username',
    placeholder: "Username",
    // error: errors?.username?.message,
    autoComplete: 'off',
  },
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
  confirmPassword: {
    label: 'Confirm Password',
    placeholder: "Confirm Password",
    type: 'password',
    // error: errors?.confirmPassword?.message
  },
};

const authFormHeader = (
  <>
    <Typography tag="h1">Sign Up for <InlineBrand /></Typography>
    <Typography fontSize="5rem" mt=".5rem">It's free to view our music library!</Typography>
  </>
)

const authType = {
  text: <>Already a&nbsp;<InlineBrand />&nbsp;user?&nbsp;</>,
  action: <>Sign in instead!</>,
}

const pwLength: string = 'Password must be between 8 and 26 characters in length'

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8, pwLength).max(26, pwLength).matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must contain at least 1 uppercase, 1 lowercase, 1 \
    number and at least one special case character from @$!%*#?&"
  ),
  confirmPassword: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default {
  authFormHeader,
  inputFields,
  authType,
  schema,
};
