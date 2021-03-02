import styled from 'styled-components';

interface TagProps {
  fontSize?: string,
}

export const TypographyWrapper = styled.span<TagProps>`
  &typography {
    &__tag {
      font-size: ${({fontSize}) => fontSize || 'inherit'};
    }
  }
`