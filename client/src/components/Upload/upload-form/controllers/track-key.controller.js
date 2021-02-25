import {Controller} from 'react-hook-form'
import {MyInputField} from 'components/ui'
import {keyTable} from '../util';

const KeySelect = ({selected, onChange}) => {
  const keyTableOptions = Object.entries(keyTable).map(([camelot, [fifth, openKey]]) => (
    {value: camelot, label: `${camelot} - ${fifth} - ${openKey}`}
  ))

  const selectOptions = {
    defaultValue: selected === -1 ? 'na' : Object.keys(keyTable)[selected],
    onChange: onChange,
  }
  
  return (
    <select {...selectOptions} style={{color: 'black'}}>
      <option value="na">--</option>
      {keyTableOptions.map(({value, label}, idx) => (
        <option key={`key-option${idx}`} value={value}>{label}</option>
      ))}
    </select>
  )
}

const trackKeyController = ({control, ...props}) => (
  <Controller
    control={control}
    name="key"
    render={(
      {onChange, value, name},
    ) => (
      <MyInputField
        inputProps = {{
          name,
          value,
          onChange,
        }}
        render = {
          // <Select name={name} onChange={({value}) => onChange(value)} options={keyTableOptions} />
          <KeySelect onChange={onChange} />
        }
      />
    )}
  />
);

export default trackKeyController;