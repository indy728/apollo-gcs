import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import {Card, Typography, InlineBrand, MyInputField, MyButton} from 'components/ui';
import {
  AuthForm as AuthFormWrapper,
  AuthItemWrapper,
  AuthErrorWrapper,
  AuthSubContainer,
  AuthToggleText
} from './auth-form.styles';
import {ToggleState, SignUpValues, IInputFields} from 'types';


const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

interface Props {
  toggle: ToggleState;
};

const SignIn: React.FC<Props> = ({toggle}) => {
  const { register, handleSubmit, errors, reset } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
  });

    
  const logValues = (values: SignUpValues): void => {
    console.log('hello')
    console.log(values);
  }

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
  
  return (
    <Card>
      <AuthSubContainer>
      <Typography tag="h1">Sign in to <InlineBrand /></Typography>
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
      <AuthSubContainer>
        {/*
            // @ts-ignore */}
        <MyButton onClick={handleSubmit(logValues)}>sign in</MyButton>
      </AuthSubContainer>
      
      <div style={{height: 0, borderBottom: '1px solid white', margin: '1rem auto', padding: '1rem 0', width: '90%'}} />
      <AuthSubContainer>
        <div>
          New to&nbsp;<InlineBrand />?&nbsp;
          <AuthToggleText onClick={toggle}>
            Sign up for an free account!
          </AuthToggleText>
        </div>
      </AuthSubContainer>
    </Card>
  )
} ;

export default SignIn
