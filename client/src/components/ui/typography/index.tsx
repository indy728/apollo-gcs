import React from 'react';
import {TypographyWrapper} from './typography.styles';

interface IStyleProps {
  m?: string,
  mt?: string,
  mb?: string,
  ml?: string,
  mr?: string,
  mv?: string,
  mh?: string,
  fontSize?: string,
}

interface Props {
  tag?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'pre',
  fontSize?: string,
  m?: string,
  mt?: string,
  mb?: string,
  ml?: string,
  mr?: string,
  mv?: string,
  mh?: string,
}

const fetchJSXElement = (el: string) => {
  switch(el) {
    case "div":
      return <div />
    default:
      return <span />
  }
} 

export const Typography: React.FC<Props> = ({tag = 'p', children, fontSize, m, mt, mr, mb, ml, mv, mh}) => {
  const TypographyTag = tag;
  const styleProps: IStyleProps = {
    m, mt, mr, mb, ml, mv, mh, fontSize
  }

  return (
    <TypographyWrapper className="typography" {...styleProps}>
      <TypographyTag className="typography__tag">
        {children}
      </TypographyTag>
    </TypographyWrapper>
  )
}