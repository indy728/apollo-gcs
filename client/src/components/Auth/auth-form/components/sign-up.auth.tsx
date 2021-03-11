import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import {Card, Typography, InlineBrand, MyInputField, MyButton, DividerLine} from 'components/ui';
import {
  AuthForm as AuthFormWrapper,
  AuthItemWrapper,
  AuthErrorWrapper,
  AuthSubContainer,
  AuthToggleText
} from './auth-form.styles';
import {ToggleState, SignUpValues, IInputFields} from 'types';
import {FB_CREATE_USER, CHECK_AUTH} from 'components/apollo';

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

interface Props {
  toggle: ToggleState;
};

const SignUp: React.FC<Props> = ({toggle}) => {
  const { register, handleSubmit, errors, reset, setError } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
  });
  const [fbCreateUser, {loading, error: fbError, data: fbData}] = useMutation(FB_CREATE_USER, {
    refetchQueries: (x) => {
      if (x?.signInWithEmailAndPassword?.error) return [];
      return [{query: CHECK_AUTH}]
    }
  })

  const onSubmit = async (values: SignUpValues): Promise<void> => {
    const {email, password, username} = values;
    const {data: {createUserWithEmailAndPassword}} = await fbCreateUser({variables: {email, password, username}});
    const authErr = createUserWithEmailAndPassword.error

    if (authErr) {
      const [_, name] = authErr.code.split('/');

      switch(name) {
        case 'email':
          break;
          setError("email", {message: authErr.message})
        default:
          setError("username", {message: authErr.message})
          break;
      }

      
    }
  }

  const inputFields: IInputFields = {
    username: {
      label: 'Username',
      placeholder: "Username",
      error: errors?.username?.message,
      autoComplete: 'off',
    },
    email: {
      label: 'Email',
      placeholder: "Your email address",
      autoComplete: 'off',
      error: errors?.email?.message,
    },
    password: {
      label: 'Password',
      placeholder: "Password",
      type: 'password',
      error: errors?.password?.message
    },
    confirmPassword: {
      label: 'Confirm Password',
      placeholder: "Confirm Password",
      type: 'password',
      error: errors?.confirmPassword?.message
    },
  };

  return (
    <Card>
      <AuthSubContainer>
        <Typography tag="h1">Sign Up for <InlineBrand /></Typography>
        <Typography fontSize="5rem" mt=".5rem">It's free to view our music library!</Typography>
      </AuthSubContainer>
      <AuthFormWrapper>
        {Object.entries(inputFields).map(([id, {label, error, ...props}]) => (
          <AuthItemWrapper key={id}>
            {/*
            // @ts-ignore */}
            <MyInputField
              label={label}
              inputProps={{
                name: id,
                ref: register,
                ...props,
              }}
            />
            {error && (
              <AuthErrorWrapper>
                {error}
              </AuthErrorWrapper>
            )}
          </AuthItemWrapper>
        ))}
      </AuthFormWrapper>
      <AuthSubContainer className="auth-button">
        {/*
            // @ts-ignore */}
        <MyButton onClick={handleSubmit(onSubmit)}>sign up</MyButton>
      </AuthSubContainer>
      
      <DividerLine />
      <AuthSubContainer>
        <div>
        Already a&nbsp;<InlineBrand />&nbsp;user?&nbsp;
          <AuthToggleText onClick={toggle}>
            Sign in instead!
          </AuthToggleText>
        </div>
      </AuthSubContainer>
    </Card>
  )
} ;

export default SignUp
