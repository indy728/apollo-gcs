import React from 'react';
import {TypographyWrapper} from './typography.styles';

interface Props {
  tag?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'pre',
  // children: React.ReactChildren| React.ReactChild | JSX.Element | string,
  fontSize?: string,
}

export const Typography: React.FC<Props> = ({tag = 'p', children, fontSize}) => {
  const TypographyTag = tag;
  const tagProps = {
    fontSize
  }

  return (
    <TypographyWrapper className="typography">
      <TypographyTag className="typography__tag" {...tagProps}>
        {children}
      </TypographyTag>
    </TypographyWrapper>
  )
}