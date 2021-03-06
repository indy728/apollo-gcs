import {Controller} from 'react-hook-form'
import {MyInputField} from '../../../ui'

const uploadFilenameController = ({control, ...props}) => (
  <Controller
    control={control}
    name="filename"
    render={(
      {value, name, onChange},
    ) => {
      return(
        <MyInputField
          suffix={props._format}
          inputProps = {{
            name,
            value,
            onChange,
          }}
        />
    )}}
  />
);

export default uploadFilenameController;