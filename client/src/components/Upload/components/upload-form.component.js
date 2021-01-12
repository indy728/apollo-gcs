import React from 'react'
import {useForm} from 'react-hook-form'

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
        <input name={`artist`} defaultValue={artist} ref={register} />
        <input name="duration" defaultValue={duration} ref={register} />
        <input name="bpm" defaultValue={bpm} ref={register} />
        <input name="key" defaultValue={key} ref={register} />
      <button type="submit">Submit</button>
    </form>
  )
}