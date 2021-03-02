import {Controller} from 'react-hook-form'
import {MyInputField} from 'components/ui'

const trackTitleController = ({control, ...props}) => (
  <Controller
    control={control}
    name="title"
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

export default trackTitleController;