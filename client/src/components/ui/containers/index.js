import styled from 'styled-components';

export const Card = styled.div`
  width: 100%;
  background-color: ${({theme: {primary}}) => primary[0]};
  padding: 1rem 2rem;
  border-radius: ${({theme: {borderRadius}}) => borderRadius};

  div, input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const Paper = styled.section`
  width: ${({width}) => width || '100%'};
  padding: ${({padding}) => padding || '1rem'};
  background-color: ${({bgColor, theme: {grey}}) => bgColor || grey};
  border-radius: ${({radius, theme: {borderRadius}}) => radius || borderRadius};
`;