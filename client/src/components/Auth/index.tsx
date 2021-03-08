import React, {useState} from 'react';
import {ToggleState} from 'types';
// import {SignUp, SignIn} from './components';
import AuthForm from './auth-form';
import {AuthWrapper, AuthContainerWrapper, AuthHeaderWrapper, AuthVideo} from './auth.styles';
import { InlineBrand } from 'components/ui';
import {signUpProps, signInProps} from './components';

interface Props {};

const AuthPage: React.FC<Props> = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const toggleIsSignUp: ToggleState = () => setIsSignUp(!isSignUp);

  // @TODO: fix to isSignUp
  // const authForm = !isSignUp ? <SignUp toggle={toggleIsSignUp} /> : <SignIn toggle={toggleIsSignUp} />;
  const formProps = isSignUp ? signUpProps : signInProps;
  const btnText = isSignUp ? 'sign up' : 'sign in';

  return (
    <AuthWrapper>
      <AuthVideo className="bg-video">
        <video className="bg-video__content" autoPlay muted loop>
          <source src="assets/tunnel-bg.mp4" type="video/mp4" />
        </video>
      </AuthVideo>
      <AuthContainerWrapper>
        <AuthHeaderWrapper>
          <InlineBrand fontSize="6.4rem"/>
        </AuthHeaderWrapper>
        <AuthHeaderWrapper>
          <p>A digital</p>
          <p>glass filing cabinet</p>
          <p>for DJs</p> 
        </AuthHeaderWrapper>
      </AuthContainerWrapper>
      <AuthContainerWrapper>
        <AuthForm toggle={toggleIsSignUp} {...formProps} btnText={btnText} />
      </AuthContainerWrapper>
    </AuthWrapper>
  )
}

export default AuthPage;
