import styled from 'styled-components';

export const MyButton = styled.div`
  padding: 1rem;
  position: relative;
  border-radius: ${({theme: {borderRadius}}) => borderRadius};
  background-color: ${({type, theme: {button}}) => {
    return type ? button[type] : button.primary;
  }};
  color: ${({type, theme: {text}}) => type ? text[type] : 'inherit' };
  
  font-size: 1.2rem;
  text-transform: uppercase;
  transition: ${({theme: {transition}}) => transition};
  cursor: pointer;

  :hover {
    box-shadow: 0 3px 10px 1px rgba(255,255,255,.4);
    transform: ${({theme: {transform: {hover: {translate}}}}) => translate};
  }

  :active {
    box-shadow: 0 3px 10px 1px rgba(255,255,255,.4);
    transform: ${({theme: {transform: {active: {translate}}}}) => translate};
  }

  &.my-button--cancel {
    color: ${({theme: {text: {error}}}) => error};

    :hover {
      box-shadow: 0 1px 5px 1px rgba(255,255,255,.4);
      transform: translateY(-.05rem);
    }

    :active {
      box-shadow: 0 1px 5px 1px rgba(255,255,255,.4);
      transform: translateY(0);
    }
  }

  &.my-button--cancel:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: ${({theme: {borderRadius}}) => borderRadius};
    border: ${({theme: {text: {error}}}) => `1px solid ${error}`};
  }
`;