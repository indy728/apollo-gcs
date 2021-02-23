import styled from 'styled-components';
import {Card} from 'components/ui';
import {FlexRow, FlexGridItem} from 'components/ui'

export const UploadCard = styled(Card)`
  &:not(:first-of-type){
    margin-top: 20px;
  }
`

export const FormRow = styled(FlexRow)`
  > :not(:first-child) {
    padding-left: 2rem;
  }

  &:not(:first-of-type) {
    padding-top: 1.2rem;
  }
`;