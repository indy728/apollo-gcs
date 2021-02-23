import styled from 'styled-components';
import {FlexRow} from 'components/ui';

export const Wrapper = styled(FlexRow)`
  display: flex;
  align-items: center;
`;

export const UploadButtonsWrapper = styled.div`
  display: flex;
  padding: 2px 4px;

  > :not(:first-child) {
    margin-left: 1.6rem;
  }
`;

export const HeaderText = styled.h2`
  text-transform: uppercase;
  border-bottom: 1px solid ${({theme: {white}}) => white};
`;