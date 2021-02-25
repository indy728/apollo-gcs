import React from 'react';
import {Wrapper, UploadButtonsWrapper, HeaderText} from './header.styles';
import {FlexSpacer, MyButton} from 'components/ui';

export const TrackInfoHeader = ({upload, unstage}) => {
  return (
    <Wrapper className="track-info__header--wrapper">
      <HeaderText>Track Information</HeaderText>
      <FlexSpacer />
      <UploadButtonsWrapper>
        <MyButton onClick={upload}>Upload</MyButton>
        <MyButton type="error" className="my-button--cancel" onClick={unstage}>Unstage</MyButton>
      </UploadButtonsWrapper>
    </Wrapper>
  )
};
