import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  padding: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
`;

const StyledHeaderWrapper = styled.div`
  padding: 2rem 0;
`;

const StyledInputLabel = styled.label`
  &.file-upload__label {
    background-color: ${({theme: {background}}) => background.dark3};
    box-shadow: 0 1px 5px 1px rgba(255,255,255,.4);
    border-radius: 3px;
    font-size: 1.4rem;
    text-transform: uppercase;
    padding: 1rem;
    transition: all .1s linear;
    cursor: pointer;

    :hover {
      box-shadow: 0 2px 10px 3px rgba(255,255,255,.4);
      transform: translateY(-.2rem);
    }

    :active {
      box-shadow: 0 2px 10px 1px rgba(255,255,255,.4);
      transform: translateY(-.1rem);
    }
  }

  input {
    display: none;
  }
`;

const StyledTypography = styled.span`
  .big {
    font-size: 125%;
  }

  .bigger {
    font-size: 150%;
  }

  .biggest {
    font-size: 200%;
  }

  .italic {
    font-style: italic;
  }
`;

const Typography = ({variant = 'span', children}) => (
  <StyledTypography as={variant}>
    {children}
  </StyledTypography>
)

const FileSelector = ({queryResult: { data }, stageTracks}) => {
  
  const limit = 10;
  const stagedTrackCount = ((data && data.stagedTracks.length) || 0);

  const handleFileChange = e => {
    const selected = e.target.files
    if (!selected.length) return 
    stageTracks({variables: {files: selected}})
  }

  const helperText = stagedTrackCount >= limit ? (
    <Typography variant="h2">
      Upload or unstage tracks to be able to select more.
    </Typography>
  ) : (
    <Typography variant="h2">
      Choose up to <span className='bigger'>{limit - stagedTrackCount}</span> more WAV, AIFF, FLAC or MP3 file{limit - stagedTrackCount > 1 ? 's' : ''} to stage.
    </Typography>
  )

  return (
    <Wrapper>
      {stagedTrackCount < limit && (
        <StyledInputLabel className='file-upload__label'>
          <input type="file" accept=".mp3,.wav,.aif,.aiff" onChange={handleFileChange} multiple />
          Select Files
        </StyledInputLabel>
      )}
      <StyledHeaderWrapper>
        {helperText}
      </StyledHeaderWrapper>
    </Wrapper>
  )
}

export default FileSelector;
