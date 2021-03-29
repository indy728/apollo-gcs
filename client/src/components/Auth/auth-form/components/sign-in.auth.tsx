import React, {useState} from 'react';
import {useHistory} from 'react-router';
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
import {useLoginMutation, GetUserInfoDocument} from 'generated/graphql';
import {useDispatch} from 'react-redux';
import {actions} from 'store/slices';

const {setAccessToken} = actions

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

interface Props {
  toggle: ToggleState;
}

const SignIn: React.FC<Props> = ({toggle}) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, errors, setError } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
  });

  const [login] = useLoginMutation({
    // refetchQueries: [{query: GetUserInfoDocument}], 
    onCompleted: (x) => {
      const token = x.login?.accessToken || ""
      localStorage.setItem('token', token);
      dispatch(setAccessToken(token));
    }
  });

  const onSubmit = async (values: SignUpValues): Promise<void> => {
    const {email, password} = values;
    const {data} = await login({variables: {email, password}});

    if (data?.login?.error) {
      setErrorMessage(data.login.error.message || "There was an error loggin in");
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
      {
        errorMessage.length > 0 && (<div style={{flex: 1, padding: '.5rem', color: 'red', marginBottom: '2rem'}}>{errorMessage}</div>)
      }
      <AuthSubContainer className="auth-button">
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
