import styled from 'styled-components';

export const FlexRow = styled.div`
  display: flex;
  align-items: ${({align}) => align || 'center'};
  flex-flow: ${({flow}) => flow || 'row'};
  flex-wrap: ${({wrap}) => wrap || 'wrap'};
`;

export const FlexGridItem = styled.div`
  flex: ${({xs}) => xs || 1};
`;

export const FlexSpacer = styled.div`
  flex: 1;
`;