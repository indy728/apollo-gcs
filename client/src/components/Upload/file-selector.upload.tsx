import React, {ChangeEvent} from 'react';
import {Typography} from 'components/ui';
import {FileSelectorSection, FilesHeaderWrapper, FilesInputLabel} from './styles.upload';

interface IProps {
  queryResult: any | null | undefined
  stageTracks: any
}

const FileSelector: React.FC<IProps> = ({queryResult: { data }, stageTracks}) => {
  
  const limit = 10;
  const stagedTrackCount = ((data && data.stagedTracks.length) || 0);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files
    if (!selected?.length) return 
    stageTracks({variables: {files: selected}})
  }

  const helperText = stagedTrackCount >= limit ? (
    <Typography tag="h2">
      Upload or unstage tracks to be able to select more.
    </Typography>
  ) : (
    <Typography tag="h2">
      Choose up to <span className='bigger'>{limit - stagedTrackCount}</span> more WAV, AIFF, FLAC or MP3 file{limit - stagedTrackCount > 1 ? 's' : ''} to stage.
    </Typography>
  )

  return (
    <FileSelectorSection>
      {stagedTrackCount < limit && (
        <FilesInputLabel className='file-upload__label'>
          <input type="file" accept=".mp3,.wav,.aif,.aiff" onChange={handleFileChange} multiple />
          Select Files
        </FilesInputLabel>
      )}
      <FilesHeaderWrapper>
        {helperText}
      </FilesHeaderWrapper>
    </FileSelectorSection>
  )
}

export default FileSelector;
