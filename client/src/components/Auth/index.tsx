import React from 'react';
import AuthForm from './auth-form';
import {AuthWrapper, AuthContainerWrapper, AuthHeaderWrapper, AuthVideo} from './auth.styles';
import { InlineBrand } from 'components/ui';

const AuthPage: React.FC = () => {

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
        <AuthForm />
      </AuthContainerWrapper>
    </AuthWrapper>
  )
}

export default AuthPage;
