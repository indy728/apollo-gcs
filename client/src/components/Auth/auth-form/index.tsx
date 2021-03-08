
import React, {useEffect, useState} from 'react';
import {Paper, Card, MyInputField, MyButton, InlineBrand, Typography} from 'components/ui';
import {ToggleState} from 'types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {
  AuthForm as AuthFormWrapper,
  AuthItemWrapper,
  AuthErrorWrapper,
  AuthSubContainer,
  AuthToggleText
} from './auth-form.styles';
import {SignUpSchema, SignInSchema} from './schema';

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
interface IAuthType {
  text: React.ReactNode,
  action: React.ReactNode,
}

interface Props {
  toggle: ToggleState,
  btnText: string,
  authFormHeader: React.ReactNode,
  inputFields: IInputFields,
  authType: IAuthType,
  // @TODO: explicit type
  schema: any,
}

interface IError {
  message: string
}

interface IInputField {
  placeholder: string,
  autoComplete?: string,  
  label: string,
  type?: string,
  error?: string | undefined, 
}

interface IInputFields {
  username?: IInputField,
  email: IInputField,
  password: IInputField,
  confirmPassword?: IInputField,
}

type SignUpValues = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
}


const AuthForm: React.FC<Props> = ({toggle, btnText, authFormHeader, inputFields, authType, schema}) => {
  const { register, handleSubmit, errors, reset } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
  });

  const logValues = (values: SignUpValues): void => {
    console.log('hello')
    console.log(values);
  }

  return (
    <Container>
      <Paper>
        <Card>
          <AuthSubContainer>
            {authFormHeader}
          </AuthSubContainer>
          <AuthFormWrapper>
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
          </AuthFormWrapper>
          <AuthSubContainer>
            {/*
                // @ts-ignore */}
            <MyButton onClick={handleSubmit(logValues)}>{btnText}</MyButton>
          </AuthSubContainer>
          
          <div style={{height: 0, borderBottom: '1px solid white', margin: '1rem auto', padding: '1rem 0', width: '90%'}} />
          <AuthSubContainer>
            <div>
              {authType.text}
              <AuthToggleText onClick={toggle}>
                {authType.action}
              </AuthToggleText>
            </div>
          </AuthSubContainer>
        </Card>
      </Paper>
    </Container>
  );
}

export default AuthForm;
