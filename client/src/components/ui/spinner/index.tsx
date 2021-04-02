import React from 'react';
import styled from 'styled-components';

interface IWrapperProps {
  height: string
}

const Wrapper = styled.div<IWrapperProps>`
  height: ${({height}) => height};
  width: ${({height}) => height};
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &, * {
    box-sizing: border-box;
  }

  .fol-loader{
    &__container{
      animation: intersecting-circles-spinners-animation 1200ms linear infinite;
      transform-origin: center;
      display: block;
      height: ${({height}) => `calc(${height} / 2)`};
      width: ${({height}) => `calc(${height} / 2)`};
    }

    &__circle{
      display: block;
      border: ${({theme: {secondary}}) => `1px solid ${secondary[1]}`};
      border-radius: 50%;
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;

      &:nth-child(1) {
        left: 0;
        top: 0;
      }

      &:nth-child(2) {
        left: ${({height}) => `calc(${height} * -0.23)`};
        top: ${({height}) => `calc(${height} * 0.12)`};
      }

      &:nth-child(3) {
        left: ${({height}) => `calc(${height} * -0.23)`};
        top: ${({height}) => `calc(${height} * -0.12)`};
      }

      &:nth-child(4) {
        left: 0;
        top: ${({height}) => `calc(${height} * -0.23)`};
      }

      &:nth-child(5) {
        left: ${({height}) => `calc(${height} * 0.23)`};
        top: ${({height}) => `calc(${height} * -0.12)`};
      }

      &:nth-child(6) {
        left: ${({height}) => `calc(${height} * 0.23)`};
        top: ${({height}) => `calc(${height} * 0.12)`};
      }

      &:nth-child(7) {
        left: 0;
        top: ${({height}) => `calc(${height} * 0.23)`};
      }
    }
  }

  @keyframes intersecting-circles-spinners-animation {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

interface IProps {
  height?: string
}

export const Spinner: React.FC<IProps> = ({height}) => {
  return (
    <Wrapper className="fol-loader" height={height || '70px'}>
      <div className="fol-loader__container">
        <span className="fol-loader__circle"></span>
        <span className="fol-loader__circle"></span>
        <span className="fol-loader__circle"></span>
        <span className="fol-loader__circle"></span>
        <span className="fol-loader__circle"></span>
        <span className="fol-loader__circle"></span>
        <span className="fol-loader__circle"></span>
      </div>
    </Wrapper>
  )
}