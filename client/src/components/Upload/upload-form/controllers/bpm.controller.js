import {Controller} from 'react-hook-form'
import {MyInputField} from '../../../ui'

const bpmController = ({control, ...props}) => (
  <Controller
    control={control}
    name="bpm"
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

export default bpmController;