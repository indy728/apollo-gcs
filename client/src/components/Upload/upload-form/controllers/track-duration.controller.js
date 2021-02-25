import {Controller} from 'react-hook-form'
import {MyInputField} from '../../../ui'

const trackDurationController = ({control, ...props}) => {
  const handleLengthChange = (idx, subValue, value) => {
    if (!idx && subValue > 99) return value;
    if (idx && subValue > 59) return value;
    console.log('[upload-form.component] subValue: ', subValue)
    const lengthArray = value.split(':');
    lengthArray[idx] = subValue.slice(-2);
    return lengthArray.join(':');
  };

  return (
    <Controller
        control={control}
        name="duration"
        rules={{required: true}}
        render={(
          {value, name, onChange},
        ) => (
          <MyInputField
            inputProps = {{
              name,
              value,
            }}
            render = {(
              <>
                <input value={value.split(':')[0]} type="number" min="0" onChange={({target: {value: subValue}}) => onChange(handleLengthChange(0, subValue, value))} />
                  <span>:</span>
                <input value={value.split(':')[1].padStart(2, '0')} type="number" min="0" onChange={({target: {value: subValue}}) => onChange(handleLengthChange(1, subValue, value))}/>
              </>
            )}
          />
        )}
      />
  )
};

export default trackDurationController;