import React from 'react'
import {useForm} from 'react-hook-form'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
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

export const UploadForm = ({metadata: {
  title, filename, format, artist, duration, bpm, key
}}) => {

  const songLength = `${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}`

  const {register, errors, handleSubmit} = useForm();
  const onSubmit = values => console.log(values)
  
  return (
    <UploadCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Track information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="file-name-read-only"
              label="File name (Read Only)"
              defaultValue={filename}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="format-read-only"
              label="File format (Read Only)"
              defaultValue={format}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="title"
                name="title"
                label="Song title"
                defaultValue={title}
                fullWidth
                ref={register({ required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="artist"
                name="artist"
                label="Artist"
                defaultValue={artist}
                fullWidth
                ref={register({ required: true })}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="duration"
                name="duration"
                label="Length"
                defaultValue={songLength}
                fullWidth
                ref={register}
                inputProps={{
                  readOnly: true
                }}
              />
            </FormControl>
          </Grid>
          <Button type="submit">Submit</Button>
      </Grid>
      </CardContent>
    </UploadCard>
    )
}