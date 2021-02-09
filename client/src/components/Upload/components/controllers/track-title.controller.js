import {Controller} from 'react-hook-form'
import {MyInputField} from '../../../ui'

const trackTitleController = ({control, ...props}) => (
  <Controller
    control={control}
    name="title"
    rules={{required: true}}
    render={(
      {onChange, value, name},
    ) => (
      <MyInputField
        label = "Track title"
        inputProps = {{
          name,
          value,
          onChange,
        }}
      />
    )}
  />
);

export default trackTitleController;