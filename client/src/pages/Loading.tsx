import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 70px;
  width: 70px;
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
      height: 35px;
      width: 35px;
    }

    &__circle{
      display: block;
      border: 2px solid #ff1d5e;
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
        left: calc(35px * -0.36);
        top: calc(35px * 0.2);
      }

      &:nth-child(3) {
        left: calc(35px * -0.36);
        top: calc(35px * -0.2);
      }

      &:nth-child(4) {
        left: 0;
        top: calc(35px * -0.36);
      }

      &:nth-child(5) {
        left: calc(35px * 0.36);
        top: calc(35px * -0.2);
      }

      &:nth-child(6) {
        left: calc(35px * 0.36);
        top: calc(35px * 0.2);
      }

      &:nth-child(7) {
        left: 0;
        top: calc(35px * 0.36);
      }
    }
  }


  @keyframes intersecting-circles-spinners-animation {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
// .intersecting-circles-spinner, .intersecting-circles-spinner * {
//   box-sizing: border-box;
// }

// .intersecting-circles-spinner {
//   height: 70px;
//   width: 70px;
//   position: relative;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// }

// .intersecting-circles-spinner .spinnerBlock {
//   animation: intersecting-circles-spinners-animation 1200ms linear infinite;
//   transform-origin: center;
//   display: block;
//   height: 35px;
//   width: 35px;
// }

// .intersecting-circles-spinner .circle {
//   display: block;
//   border: 2px solid #ff1d5e;
//   border-radius: 50%;
//   height: 100%;
//   width: 100%;
//   position: absolute;
//   left: 0;
//   top: 0;
// }

// .intersecting-circles-spinner .circle:nth-child(1) {
//   left: 0;
//   top: 0;
// }

// .intersecting-circles-spinner .circle:nth-child(2) {
//   left: calc(35px * -0.36);
//   top: calc(35px * 0.2);
// }

// .intersecting-circles-spinner .circle:nth-child(3) {
//   left: calc(35px * -0.36);
//   top: calc(35px * -0.2);
// }

// .intersecting-circles-spinner .circle:nth-child(4) {
//   left: 0;
//   top: calc(35px * -0.36);
// }

// .intersecting-circles-spinner .circle:nth-child(5) {
//   left: calc(35px * 0.36);
//   top: calc(35px * -0.2);
// }

// .intersecting-circles-spinner .circle:nth-child(6) {
//   left: calc(35px * 0.36);
//   top: calc(35px * 0.2);
// }

// .intersecting-circles-spinner .circle:nth-child(7) {
//   left: 0;
//   top: calc(35px * 0.36);
// }

// @keyframes intersecting-circles-spinners-animation {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }

const Loading: React.FC = () => {
  return (
    <Wrapper className="fol-loader">
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

export default Loading;