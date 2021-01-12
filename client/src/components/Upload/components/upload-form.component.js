import React from 'react'
import {useForm} from 'react-hook-form'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

export const UploadForm = ({metadata: {
  title, filename, format, artist, duration, bpm, key
}}) => {

  const {register, errors, handleSubmit} = useForm();
  const onSubmit = values => console.log(values)
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div name={filename}>
        File: {filename}
      </div>
      <div>
        Format: {format}
      </div>
      <FormControl>
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input name={'title'} defaultValue={title} ref={register({ required: true })} />
      </FormControl>
      <FormControl>
        <Input name={'artist'} defaultValue={artist} ref={register({ required: true })} />
      </FormControl>
      <div>
        Duration: {`${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, "0")}`}
      </div>
      <FormControl>
        <Input name="bpm" defaultValue={bpm} ref={register} />
      </FormControl>
      <FormControl>
        <Input name="key" defaultValue={key} ref={register} />
        <FormHelperText>This is helper text</FormHelperText>
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  )
}