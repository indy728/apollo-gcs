import styled from 'styled-components';

export const AuthWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem 0;

  @media (min-width: 960px) {
    /* background-image */
  }
`;

export const AuthVideo = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* width: 100%;
  height: 100%; */
  z-index: -1;
  opacity: .15;

  &.bg-video {
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

`;

export const AuthContainerWrapper = styled.div`
  width: 34rem;

  &:not(:first-of-type) {
    margin-top: 5rem;
  }
`;

export const AuthHeaderWrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  text-align: center;

  &:not(:first-of-type) {
    margin-top: 2rem;
  }

  p {
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    word-spacing: 8px;
    line-height: 1.3;
  }
`;

/* AUTH FORM STYLES */
export const AuthForm = styled.form`
  margin: 2.4rem 0;
`;

export const AuthSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  &.auth-button {
    margin-bottom: 2.4rem;
  }
`;

export const AuthItemWrapper = styled.div`
  :not(:first-child) {
    margin-top: 1rem;
  }
`;

export const AuthErrorWrapper = styled.div`
  margin-top: 2px;
  color: ${({theme: {text}}) => text.error};
  white-space: normal;
`;

export const AuthToggleText = styled.span`
  color: ${({theme: {text}}) => text.secondary};
  cursor: pointer;

  &:hover {
    transform: ${({theme: {transform}}) => `${transform.hover.scale} ${transform.hover.translate}`}
  }
`;
