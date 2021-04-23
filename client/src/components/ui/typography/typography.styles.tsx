import styled from 'styled-components';

interface TagProps {
  m?: string,
  mt?: string,
  mb?: string,
  ml?: string,
  mr?: string,
  mv?: string,
  mh?: string,
  fontSize?: string,
}

export const TypographyWrapper = styled.div<TagProps>`
  margin: ${({m, mt, mr, mb, ml, mv, mh}) => (
    m ||
    `${mt || mv || 0} ${mr || mh || 0} ${mb || mv || 0} ${ml || mh || 0} ` ||
    '0')};

  font-size: ${({fontSize}) => fontSize || 'inherit'};
`