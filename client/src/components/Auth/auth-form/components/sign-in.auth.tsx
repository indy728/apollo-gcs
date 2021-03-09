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
import {CHECK_AUTH, FB_LOGIN_USER} from 'components/apollo';


const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

interface Props {
  toggle: ToggleState;
};

const SignIn: React.FC<Props> = ({toggle}) => {
  const { register, handleSubmit, errors, reset, setError } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
  });

  const [fbCreateUser, {loading, error: fbError, data: fbData}] = useMutation(FB_LOGIN_USER, {
    refetchQueries: (x) => {
      if (x?.signInWithEmailAndPassword?.error) return [];
      return [{query: CHECK_AUTH}]
    }
  })

  const onSubmit = async (values: SignUpValues): Promise<void> => {
    const {email, password, username} = values;
    const {data: {signInWithEmailAndPassword}} = await fbCreateUser({variables: {email, password, username}});
    
    const {error} = signInWithEmailAndPassword;
    if (error) {
      console.log('[sign-in.auth] error: ', error)
      switch(error.code) {
        case 'auth/user-not-found':
          setError("email", {message: error.message});
          break;
        case 'auth/wrong-password':
          setError("password", {message: error.message});
          break;
        default:
          setError("email", {message: error.message});
          break;
      }
    }
  }

  const inputFields: IInputFields = {
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
      <AuthSubContainer className="auth-button">
        {/*
            // @ts-ignore */}
        <MyButton onClick={handleSubmit(onSubmit)}>sign in</MyButton>
      </AuthSubContainer>
      
      <DividerLine />
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
