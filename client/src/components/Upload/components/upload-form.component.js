import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import {TRACK_UPLOAD, UNSTAGE_TRACKS} from '../../apollo'
import {useForm, Controller} from 'react-hook-form'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import TagList from './tag-list';
import {MyInputField} from '../../ui'
import {
  uploadFilenameController,
  trackTitleController,
  artistController,
  bpmController,
  genreController,
  trackDurationController,
  trackKeyController,
} from './controllers';

const UploadCard = styled.div`
  width: 100%;

  &:not(:first-of-type){
    margin-top: 20px;
  }

  div, input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const getKeywords = ({title, artist, key, tags}) => {
  const keywords = [];

  // Split title by word, remove parentheses
  title.split(' ')
    .forEach((x) => {
      keywords.push(x.toLowerCase().replace(/\W+/g, ''))
    });
  // Split artists and split artist names by whitespace
  artist.split(', ')
    .map(y => y.split(' ')).flat()
    .forEach(z => {
      keywords.push(z.toLowerCase())
    });
  // Include key in keywords
  if (key && key.length) {
    keywords.push(key)
  }
  // @TODO: Include tags (ie deep house, techno, etc..)

  return keywords
}


const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;

  > :not(:first-child) {
    padding-left: 2rem;
  }

  &:not(:first-of-type) {
    padding-top: 2rem;
  }
`;

const FlexGridItem = styled.div`
  flex: ${({xs}) => xs || 1};

  label {
    font-size: 80%;
    font-style: italic;
  }

  .immutable {
    background-color: transparent;
    border: 0;
    height: 3rem;
    line-height: 3rem;
    width: ${({width}) => width || '100%'};
    padding: 0 .5rem;

    :focus {
      outline: none;
      background-color: rgba(0,0,0,.2);
      font-size: 150%;
    }
  }
`;

export const UploadForm = ({metadata: {
  title, filename: _filename, format, artist, duration, bpm, key
}, unstageTracks}) => {
  duration = duration || 0
  const songLength = `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}`
  const [trackUpload, {loading, data, error}] = useMutation(TRACK_UPLOAD, {
    onCompleted: (x) => {

      console.log(x)
    }
  })
  const [keywords, setKeywords] = useState(getKeywords({title, artist}))
  const filetypeRe = /\.[0-9a-z]+$/i
  const [_format] = _filename.match(filetypeRe);
  const filename = _filename.replace(filetypeRe, '');

  const {register, errors, handleSubmit, control} = useForm({
    defaultValues: {
      title: title || '',
      filename,
      artist: artist || '',
      duration: songLength,
      bpm: bpm || '',
      key: key || '',
      genre: '',
      keywords: [],
    }
  });

  const onSubmit = values => {
    const _artist = values.artist.toLowerCase();
    const _title = values.title.toLowerCase();
    console.log('[upload-form.component] values.duration: ', values.duration)
    
    // @TODO: sux
    
    const [min, sec] = values.duration.split(':');
    const intDuration = +min * 60 + +sec;
    const entry = {
      ...values,
      filename: values.filename + _format,
      duration: intDuration,
      _filename,
      //  @TODO: grab from auth
      uploader: 'indy',
      keywords,
      _artist,
      _title
    }

    console.log(entry)

    // @TODO: before uncommenting track upload, make sure it sources _filename and uploads filename!!

    // trackUpload({variables: {entry}}).then(({data: {trackUpload: res}}) => {
    //   if (!res.length) {
    //     console.log('[upload-form.component] values.filename: ', values.filename)
    //     // unstageTracks({variables: {files: [filename]}})
    //   }
    // })
  }

  if (loading) {
    return <div>...Uploading...</div>
  }

  if (error) {
    return <div>...Error...</div>
  }

  


  return (
    <UploadCard>
        <h6>
          Track information
        </h6>
      <FlexRow>
        <FlexGridItem xs={5}>
          <label>Filename:</label>
          <div className="immutable">{_filename}</div>
        </FlexGridItem>
        <FlexGridItem xs={1}>
          <label>Format:</label>
          <div className="immutable">{format}</div>
        </FlexGridItem>
        <FlexGridItem xs={6}>
          {uploadFilenameController({control, _format})}
        </FlexGridItem>
      </FlexRow>
      <FlexRow>
        <FlexGridItem>
          {trackTitleController({control})}
        </FlexGridItem>
        <FlexGridItem>
          {artistController({control})}
        </FlexGridItem>
      </FlexRow>
      <FlexRow>
        <FlexGridItem xs={2}>
          {trackDurationController({control})}
        </FlexGridItem>
        <FlexGridItem xs={2}>
          {bpmController({control})}
        </FlexGridItem>
        <FlexGridItem xs={4}>
          {trackKeyController({control})}
        </FlexGridItem>
        <FlexGridItem xs={4}>
          {genreController({control})}
        </FlexGridItem>
      </FlexRow>
      <FlexRow>
        <TagList keywords={keywords} />
      </FlexRow>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button type="submit" onClick={() => unstageTracks({variables: {files: [filename]}})}>Remove</Button>
    </UploadCard>
    )
}