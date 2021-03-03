
import React, {useEffect, useState} from 'react';
import {Paper, Card, MyInputField, MyButton, InlineBrand, Typography} from 'components/ui';
import {ToggleState} from 'types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  AuthForm,
  AuthItemWrapper,
  AuthErrorWrapper,
  AuthSubContainer,
  AuthToggleText
} from './auth-form.styles';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  background-color: ${({theme: {primary}}) => primary[0]};
  padding: 1rem 1rem;
  max-width: 960px;
  margin: 0 auto;
  border-radius: ${({theme: {borderRadius}}) => borderRadius};
`

interface Props {
  toggle: ToggleState,
}

interface IError {
  message: string
}

interface IInputField {
  placeholder: string,
  label: string,
  type?: string,
  error?: string | undefined, 
}

interface IInputFields {
  username: IInputField,
  email: IInputField,
  password: IInputField,
  confirmPassword: IInputField,
}

type SignUpValues = {
  username: string,
  password: string,
  confirmPassword: string,
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

const SignUp: React.FC<Props> = ({toggle}) => {
  const { register, handleSubmit, errors, reset } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
  });

  const logValues = (values: SignUpValues): void => {
    console.log('hello')
    console.log(values);
  }

  const inputFields: IInputFields = {
    username: {
      label: 'Username',
      placeholder: "Username",
      error: errors?.username?.message
    },
    email: {
      label: 'Email',
      placeholder: "Your email address",
      // error: errors?.email
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
  }

  return (
    <Container>
      <Paper>
        <Card>
          <AuthSubContainer>
            <Typography tag="h1">Sign Up for <InlineBrand /></Typography>
            <Typography fontSize="5rem" mt=".5rem">It's free to view our music library!</Typography>
          </AuthSubContainer>
          <AuthForm>
            {Object.entries(inputFields).map(([id, {label, error, ...props}]) => (
              <AuthItemWrapper>
                {/*
                // @ts-ignore */}
                <MyInputField
                  key={id}
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
          </AuthForm>
          <AuthSubContainer>
            {/*
                // @ts-ignore */}
            <MyButton onClick={handleSubmit(logValues)}>sign up</MyButton>
          </AuthSubContainer>
          
          <div style={{height: 0, borderBottom: '1px solid white', margin: '1rem auto', padding: '1rem 0', width: '90%'}} />
          <AuthSubContainer>
            <div>
              Already a&nbsp;<InlineBrand />&nbsp;user?&nbsp;
              <AuthToggleText onClick={toggle}>
                Sign in instead!
              </AuthToggleText>
            </div>
          </AuthSubContainer>
        </Card>
      </Paper>
    </Container>
  );
}

export default SignUp;
