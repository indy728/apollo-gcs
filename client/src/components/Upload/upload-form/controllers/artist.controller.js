import {Controller} from 'react-hook-form'
import {MyInputField} from '../../../ui'

const artistController = ({control, ...props}) => (
  <Controller
    control={control}
    name="artist"
    rules={{required: true}}
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

export default artistController;