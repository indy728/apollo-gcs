import styled from 'styled-components';

export const FUFWrapper = styled.div`
  display: flex;
  flex-flow: column;
`;

export const FUFLabelWrapper = styled.label`
  display: flex;
  font-size: 80%;
  font-style: italic;
`;

export const FUFLabel = styled.div``;

export const FUFEditWrapper = styled.div`
  margin-left: 1rem;
  transition: ${({theme: {transition}}) => transition};
  transform: scale(.8) translateY(-5px);
  cursor: pointer;

  :hover {
    transform: ${({
      theme: {
        transform: {
          hover: {scale, translate}}}}) => scale + translate
    };
  }
`;

export const FUFMetadata = styled.div`
  margin-left: 1.2rem;
  color: ${({theme: {text}}) => text.alert};
`;

export const FUFValue = styled.div`
  display: flex;
  height: 3rem;
  line-height: 3rem;
  width: ${({width}) => width || '100%'};
  padding: 0 .5rem;
`;