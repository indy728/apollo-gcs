import {Controller} from 'react-hook-form'
import {MyInputField} from '../../../ui'

const UploadFilenameController = ({control, ...props}) => (
  <Controller
    control={control}
    name="filename"
    render={(
      {value, name, onChange},
    ) => {
      return(
        <MyInputField
          label = "New filename (optional)"
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

export default UploadFilenameController;