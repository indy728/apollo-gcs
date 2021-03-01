import React, {useState} from 'react';
import {ToggleState} from 'types';
import {SignUp, SignIn} from './components';

interface Props {};

const AuthPage: React.FC<Props> = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const toggleIsSignUp: ToggleState = () => setIsSignUp(!isSignUp);

  return !isSignUp ? <SignUp toggle={toggleIsSignUp} /> : <SignIn toggle={toggleIsSignUp} />;
}

export default AuthPage;
