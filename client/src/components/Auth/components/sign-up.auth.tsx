
// @ts-nocheck
import React from 'react';
import {Paper, Card} from 'components/ui';
import {ToggleState} from 'types';
import styled from 'styled-components';

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

interface Props {
  toggle: ToggleState,
}

const SignUp: React.FC<Props> = ({toggle}) => {

  return (
    <Container>
      <Paper>
        <Card>
          <form>
            <input name="username" />
            <input name="password" />
            <input name="verify-password" />
          </form>
        </Card>
      </Paper>
    </Container>
  );
}

export default SignUp;
