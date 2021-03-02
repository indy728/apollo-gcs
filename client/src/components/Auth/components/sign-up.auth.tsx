
import React from 'react';
import {Paper, Card, MyInputField, MyButton, InlineBrand, Typography} from 'components/ui';
import {ToggleState} from 'types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

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

interface IInputField {
  placeholder: string,
  type?: string, 
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

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
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
      placeholder: "Username",
    },
    email: {
      placeholder: "Your email address",
    },
    password: {
      placeholder: "Password",
      type: 'password',
    },
    confirmPassword: {
      placeholder: "Confirm Password",
      type: 'password'
    },
  }

  return (
    <Container>
      <Paper>
        <Card>
          <Typography tag="h2">Sign Up for <InlineBrand /></Typography>
          <Typography>It's free to view our music library!</Typography>
          <pre>
          {JSON.stringify(errors, null, 2)}
          </pre>
          <form>
            {Object.entries(inputFields).map(([id, props]) => (
              /*
              // @ts-ignore */
              <MyInputField
                key={id}
                inputProps={{
                  name: id,
                  ref: register,
                  ...props,
                }}
              />
            ))}
          </form>
          <div>Already a <InlineBrand /> user? <span onClick={toggle} style={{color: 'red', cursor: 'pointer'}}>Sign in instead!</span></div>
          <div style={{display: 'flex'}}>
            {/*
                // @ts-ignore */}
            <MyButton onClick={handleSubmit(logValues)}>sign up</MyButton>
            {/*
                // @ts-ignore */}
            <MyButton type="error" className="my-button--cancel" onClick={reset}>clear form</MyButton>
          </div>
        </Card>
      </Paper>
    </Container>
  );
}

export default SignUp;
