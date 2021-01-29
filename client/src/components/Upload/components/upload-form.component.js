import { useMutation } from "@apollo/client";
import React from "react";
import {TRACK_UPLOAD, UNSTAGE_TRACKS} from '../../apollo'
import {useForm, Controller} from 'react-hook-form'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

const UploadCard = styled(Card)`
  && {
    background-color: ghostwhite;
    margin: 0 20px;

    &:not(:first-of-type){
      margin-top: 20px;
    }
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

export const UploadForm = ({metadata: {
  title, filename, format, artist, duration, bpm, key
}, unstageTracks}) => {
  duration = duration || 0
  const songLength = `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}`
  const [trackUpload, {loading, data, error}] = useMutation(TRACK_UPLOAD, {
    onCompleted: (x) => {

      console.log(x)
    }
  })

  const {register, errors, handleSubmit, control} = useForm({
    defaultValues: {
      title: title || '',
      filename,
      format: format || '',
      artist: artist || '',
      duration: songLength,
      bpm: bpm || '',
      key: key || '',
      keywords: [],
    }
  });

  const onSubmit = values => {
    const keywords = getKeywords(values)
    const _artist = values.artist.toLowerCase();
    const _title = values.title.toLowerCase();
    // @TODO: sux
    const [min, sec] = values.duration.split(':');
    const intDuration = +min * 60 + +sec;
    console.log('[upload-form.component] intDuration: ', intDuration)
    const entry = {
      ...values,
      duration: intDuration,
      //  @TODO: grab from auth
      uploader: 'indy',
      keywords,
      _artist,
      _title
    }

    console.log(entry)

    trackUpload({variables: {entry}}).then(({data: {trackUpload: res}}) => {
      if (!res.length) {
        console.log('[upload-form.component] values.filename: ', values.filename)
        // unstageTracks({variables: {files: [filename]}})
      }
    })
  }

  if (loading) {
    return <div>...Uploading...</div>
  }

  if (error) {
    return <div>...Error...</div>
  }

  return (
    <UploadCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Track information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Controller
              control={control}
              name="filename"
              render={(
                {value, name},
              ) => (
                <TextField
                  name={name}
                  label="File name"
                  value={value}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
                control={control}
                name="format"
                render={(
                  {value, name},
                ) => (
                <TextField
                  name={name}
                  label="File format"
                  value={value}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
              />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="title"
              rules={{required: true}}
              render={(
                {onChange, value, name},
              ) => (
                <TextField
                  name={name}
                  label="Song title"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
          <Controller
              control={control}
              name="artist"
              rules={{required: true}}
              render={(
                {onChange, value, name},
              ) => (
                <TextField
                  name={name}
                  label="Artist"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
          <Controller
              control={control}
              name="duration"
              rules={{required: true}}
              render={(
                {value, name},
              ) => (
                <TextField
                  name={name}
                  label="Length"
                  value={value}
                  fullWidth
                  inputProps={{
                    readOnly: true
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              control={control}
              name="bpm"
              render={(
                {onChange, value, name},
              ) => (
              <TextField
                name={name}
                label="BPM"
                value={value}
                onChange={onChange}
                fullWidth
              />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Controller
              control={control}
              name="key"
              render={(
                {onChange, value, name},
              ) => (
                <TextField
                  name={name}
                  label="key"
                  value={value}
                  fullWidth
                  ref={register}
                />
              )}
            />
          </Grid>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Submit</Button>
          <Button type="submit" onClick={() => unstageTracks({variables: {files: [filename]}})}>Remove</Button>
      </Grid>
      </CardContent>
    </UploadCard>
    )
}