import styled from 'styled-components';

export const LegendRow = styled.div`
  margin-top: 1.6rem;
  margin-bottom: .8rem;
  display: flex;
  /* justify-content: flex-end; */

  .legend {
    display: flex;
    font-style: italic;
    font-size: 80%;

    > :not(:first-child) {
      margin-left: 3rem;
    }

    &__nb {
      display: none;
    }

    &__required {
      
    }

    &__metadata {
      color: ${({theme: {text}}) => text.alert}
    }
  }
`;
