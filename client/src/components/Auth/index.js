import React, {useState} from 'react';
import {SignUp, SignIn} from './components';

const AuthPage = ({}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleIsSignUp = () => setIsSignUp(!isSignUp);

  return (
    <>
      {isSignUp ? <SignUp toggle={toggleIsSignUp} /> : <SignIn toggle={toggleIsSignUp} />}
    </>
  )
}

export default AuthPage;
