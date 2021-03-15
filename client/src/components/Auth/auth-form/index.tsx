
import React, {useEffect, useState} from 'react';
import {Paper} from 'components/ui';
import {
  ToggleState,
  SignUpValues,
} from 'types';
import styled from 'styled-components';
import {SignUp, SignIn} from './components';

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

const AuthForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const toggleIsSignUp: ToggleState = () => setIsSignUp(!isSignUp);

  // @TODO: fix to isSignUp
  const authForm = isSignUp ? <SignUp toggle={toggleIsSignUp} /> : <SignIn toggle={toggleIsSignUp} />;

  return (
    <Container>
      <Paper>
        {authForm}
      </Paper>
    </Container>
  );
}

export default AuthForm;
