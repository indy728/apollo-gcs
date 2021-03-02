import styled from 'styled-components';

interface BrandProps {
  fontSize?: string, 
}

export const InlineBrandSpan = styled.span<BrandProps>`
  font-family: ${({theme: {font}}) => font.brand};
  font-size: ${({fontSize}) => fontSize || '115%'};
`;