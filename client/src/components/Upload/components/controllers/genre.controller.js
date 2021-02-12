import {Controller} from 'react-hook-form'
import {MyInputField} from '../../../ui'

const genreController = ({control, ...props}) => (
  <Controller
    control={control}
    name="genre"
    render={(
      {onChange, value, name},
    ) => (
      <MyInputField
        inputProps = {{
          name,
          value,
          onChange,
        }}
      />
    )}
  />
);

export default genreController;