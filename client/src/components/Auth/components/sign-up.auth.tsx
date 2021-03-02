
import React from 'react';
import {Paper, Card, MyInputField} from 'components/ui';
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

type SignUpValues = {
  username: string,
  password: string,
  confirmPassword: string,
}

const matchPasswords = (a: string, b: string): boolean => (a === b);

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),
  confirmPassword: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUp: React.FC<Props> = ({toggle}) => {
  const { register, handleSubmit, errors } = useForm<SignUpValues>({
    resolver: yupResolver(schema),
  });

  const logValues = (values: SignUpValues): void => {
    console.log('hello')
    console.log(values);
  }

  const inputFields = {
    username: {
      placeholder: "Username",
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
          <div>Sign Up for meatport</div>
          <div>It's free to view our music library!</div>
          <pre>
          {JSON.stringify(errors, null, 2)}
          </pre>
          <form onSubmit={handleSubmit(logValues)}>
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
            {/* <input ref={register} name="username" /> */}
            <button type="submit">Submit</button>
          </form>
          <div>Already a meatport user? <span onClick={toggle} style={{color: 'red', cursor: 'pointer'}}>Sign in instead!</span></div>
        </Card>
      </Paper>
    </Container>
  );
}

export default SignUp;
