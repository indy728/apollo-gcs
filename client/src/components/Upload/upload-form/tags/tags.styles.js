import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;

  flex-wrap: wrap;
`;

export const TagsWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -1rem;
  /* margin-top: -.5rem; */
`;

export const TagWrapper = styled.li`
  list-style-type: none;
  display: flex;
  border-radius: ${({theme: {borderRadius}}) => borderRadius};
  padding: .8rem 1rem;
  background: ${({theme: {secondary}, clearable}) => clearable ? secondary[1] : secondary[0]};
  margin: .5rem;

  .tag-label:not(:first-child) {
    margin-left: .8rem;
  }
`;

export const TagClose = styled.div`
  cursor: pointer;

  svg {
    transition: ${({theme: {transition}}) => transition};

    :hover {
      transform: ${({theme: {transform: {hover: {scale}}}}) => scale};
    }
  }
`;

export const TagLabel = styled.div``;

export const TagInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: .5rem;
`

export const TagInputSubmit = styled.div`
  margin-left: .8rem;
  padding: .4rem .5rem;
  border-radius: .2rem;
  background-color: ${({disabled}) => disabled ? 'grey' : 'orangered'};
`;