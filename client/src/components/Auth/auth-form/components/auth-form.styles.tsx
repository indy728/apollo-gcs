import styled from 'styled-components';

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
