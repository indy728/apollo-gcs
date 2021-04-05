import * as yup from 'yup';

const pwLength = 'Password must be between 8 and 26 characters in length';

export const signUpSchema = yup.object().shape({
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

export const signInSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export type SignUpSchema = yup.Asserts<typeof signUpSchema>;
export type SignInSchema = yup.Asserts<typeof signInSchema>;