import { useMutation } from "@apollo/client";
import React, {useState} from "react";
import {TRACK_UPLOAD, UNSTAGE_TRACKS} from '../../apollo'
import {useForm, Controller} from 'react-hook-form'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import Select from 'react-select';
import TagList from './tag-list';

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

const Wrapper = styled.div`
  border-bottom: 1px solid ${({theme: {primary}}) => primary[3]};

  .flex {
    display: flex;
    align-items: flex-end;
    
    > div {
      flex: 1 0 auto;
    }
  }
  

  input {
    background-color: transparent;
    border: 0;
    height: 3rem;
    line-height: 3rem;
    width: ${({width}) => width || '100%'};
    padding: 0 .5rem;

    :focus {
      outline: none;
      background-color: rgba(0,0,0,.2);
      font-size: 103%;
    }
  }
`
const MyInput = styled.input`
  
`

const keyTable = {
  '1a': ['Abmin', '6m'],
  '2a': ['Ebmin', '7m'],
  '3a': ['Bbmin', '8m'],
  '4a': ['Fmin', '9m'],
  '5a': ['Cmin', '10m'],
  '6a': ['Gmin', '11m'],
  '7a': ['Dmin', '12m'],
  '8a': ['Amin', '1m'],
  '9a': ['Emin', '2m'],
  '10a': ['Bmin', '3m'],
  '11a': ['F#min', '4m'],
  '12a': ['Dbmin', '5m'],
  '1b': ['Bmaj', '6d'],
  '2b': ['F#maj', '7d'],
  '3b': ['Dbmaj', '8d'],
  '4b': ['Abaj', '9d'],
  '5b': ['Ebaj', '10d'],
  '6b': ['Bbmaj', '11d'],
  '7b': ['Fmaj', '12d'],
  '8b': ['Cmaj', '1d'],
  '9b': ['Gmaj', '2d'],
  '10b': ['Dmaj', '3d'],
  '11b': ['Amaj', '4d'],
  '12b': ['Emaj', '5d'],
}

const keyTableOptions = Object.entries(keyTable).map(([camelot, [fifth, openKey]]) => ({value: camelot, label: `${camelot} - ${fifth} - ${openKey}`}))

const MyInputField = ({label, inputProps = {}, prefix = null, suffix = null, render, select, selectProps}) => {
  const {value = '', placeholder = '', name = '', onChange = null} = inputProps;

  return (
    <Wrapper>
      <label>
        {label}
      </label>
      <div class="flex">
      {prefix}
      {render || (
        <MyInput {...inputProps} />
        )}
        {suffix}
      </div>
    </Wrapper>
  )
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

const FormItemImmutable = styled.div`
  label {
    font-size: 80%;
    font-style: italic;
  }
`

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

  const handleLengthChange = (idx, subValue, value) => {
    if (!idx && subValue > 99) return value;
    if (idx && subValue > 59) return value;
    console.log('[upload-form.component] subValue: ', subValue)
    const lengthArray = value.split(':');
    lengthArray[idx] = subValue.slice(-2);
    return lengthArray.join(':');
  }

  const lengthController = (
    <Controller
      control={control}
      name="duration"
      rules={{required: true}}
      render={(
        {value, name, onChange},
      ) => (
        <MyInputField
          label = "Length"
          inputProps = {{
            name,
            value,
          }}
          render = {(
            <>
              <input value={value.split(':')[0]} type="number" min="0" onChange={({target: {value: subValue}}) => onChange(handleLengthChange(0, subValue, value))} />
                <span>:</span>
              <input value={value.split(':')[1].padStart(2, '0')} type="number" min="0" onChange={({target: {value: subValue}}) => onChange(handleLengthChange(1, subValue, value))}/>
            </>
          )}
        />
      )}
    />)

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
          <Controller
            control={control}
            name="filename"
            render={(
              {value, name, onChange},
            ) => {
              return(
                <MyInputField
                  label = "New filename (optional)"
                  suffix={_format}
                  inputProps = {{
                    name,
                    value,
                    onChange,
                  }}
                />
            )}}
          />
        </FlexGridItem>
      </FlexRow>
      <FlexRow>
        <FlexGridItem>
          <Controller
            control={control}
            name="title"
            rules={{required: true}}
            render={(
              {onChange, value, name},
            ) => (
              <MyInputField
                label = "Song title"
                inputProps = {{
                  name,
                  value,
                  onChange,
                }}
              />
            )}
          />
        </FlexGridItem>
        <FlexGridItem>
          <Controller
            control={control}
            name="artist"
            rules={{required: true}}
            render={(
              {onChange, value, name},
            ) => (
              <MyInputField
                label = "Artist"
                inputProps = {{
                  name,
                  value,
                  onChange,
                }}
              />
            )}
          />
        </FlexGridItem>
      </FlexRow>
      <FlexRow>
        <FlexGridItem xs={2}>
          {lengthController}
        </FlexGridItem>
        <FlexGridItem xs={2}>
          <Controller
            control={control}
            name="bpm"
            render={(
              {onChange, value, name},
            ) => (
              <MyInputField
                label = "BPM"
                inputProps = {{
                  name,
                  value,
                  onChange,
                }}
              />
            )}
              />
        </FlexGridItem>
        <FlexGridItem xs={4}>
          <Controller
                control={control}
                name="key"
                render={(
                  {onChange, value, name},
                ) => (
                  <MyInputField
                    label = "Key"
                    // inputProps = {{
                    //   name,
                    //   value,
                    //   onChange,
                    // }}
                    render = {
                      <Select name={name} onChange={({value}) => onChange(value)} options={keyTableOptions} />
                    }
                  />
                )}
              />
        </FlexGridItem>
        <FlexGridItem xs={4}>
          <Controller
                control={control}
                name="genre"
                render={(
                  {onChange, value, name},
                ) => (
                  <MyInputField
                    label = "Genre"
                    inputProps = {{
                      name,
                      value,
                      onChange,
                    }}
                  />
                )}
              />
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