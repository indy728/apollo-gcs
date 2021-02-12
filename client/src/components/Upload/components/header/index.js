import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const FlexSpacer = styled.div`
  flex: 1;
`;

const MyButton = styled.div`
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
    transform: translateY(-.05rem);
  }

  :active {
    box-shadow: 0 3px 10px 1px rgba(255,255,255,.4);
    transform: translateY(0);
  }

  &.my-button--error {
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

  &.my-button--error:after {
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

const UploadButtons = styled.div`
  display: flex;
  padding: 2px 4px;

  > :not(:first-child) {
    margin-left: 1.6rem;
  }
`;

const HeaderText = styled.h2`
  text-transform: uppercase;
  border-bottom: 1px solid ${({theme: {white}}) => white};
`;

export const TrackInfoHeader = ({upload, unstage}) => {
  return (
    <Wrapper>
      <HeaderText>Track Information</HeaderText>
      <FlexSpacer />
      <UploadButtons>
        <MyButton onClick={upload}>Upload</MyButton>
        <MyButton type="error" className="my-button--error" onClick={unstage}>Unstage</MyButton>
      </UploadButtons>
    </Wrapper>
  )
};
