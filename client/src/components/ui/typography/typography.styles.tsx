import styled from 'styled-components';

interface TagProps {
  m?: string,
  mt?: string,
  mb?: string,
  ml?: string,
  mr?: string,
  fontSize?: string,
}

export const TypographyWrapper = styled.div<TagProps>`
  margin: ${({m, mt, mr, mb, ml}) => (
    m ||
    `${mt || 0} ${mr || 0} ${mb || 0} ${ml || 0} ` ||
    '0')};

  font-size: ${({fontSize}) => fontSize || 'inherit'};
`