import React from 'react';
import styled from 'styled-components';
import {InlineBrand, Spinner} from 'components/ui';

const Wrapper = styled.div`
  height: 100vh;
  min-height: 50rem;
  width: 100%;
  background: black;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > :not(:first-child) {
    margin-top: 2rem;
  }
`;

const Loading: React.FC = () => {
  return (
    <Wrapper className="fol-loader">
      <InlineBrand fontSize={'4.8rem'}/>
      <Spinner />
    </Wrapper>
  )
}

export default Loading;