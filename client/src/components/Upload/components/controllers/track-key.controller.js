import {Controller} from 'react-hook-form'
import {MyInputField} from '../../../ui'
// import Select from 'react-select';

const keyTable = {
  '1a': ['Abmin', '6m'],
  '2a': ['Ebmin', '7m'],
  '3a': ['Bbmin', '8m'],
  '4a': ['Fmin', '9m'],
  '5a': ['Cmin', '10m'],
  '6a': ['Gmin', '11m'],
  '7a': ['Dmin', '12m'],
  '8a': ['Amin', '1m'],
  '9a': ['Emin', '2m'],
  '10a': ['Bmin', '3m'],
  '11a': ['F#min', '4m'],
  '12a': ['Dbmin', '5m'],
  '1b': ['Bmaj', '6d'],
  '2b': ['F#maj', '7d'],
  '3b': ['Dbmaj', '8d'],
  '4b': ['Abaj', '9d'],
  '5b': ['Ebaj', '10d'],
  '6b': ['Bbmaj', '11d'],
  '7b': ['Fmaj', '12d'],
  '8b': ['Cmaj', '1d'],
  '9b': ['Gmaj', '2d'],
  '10b': ['Dmaj', '3d'],
  '11b': ['Amaj', '4d'],
  '12b': ['Emaj', '5d'],
}

const keyTableOptions = Object.entries(keyTable).map(([camelot, [fifth, openKey]]) => ({value: camelot, label: `${camelot} - ${fifth} - ${openKey}`}))


const trackKeyController = ({control, ...props}) => (
  <Controller
    control={control}
    name="key"
    render={(
      {onChange, value, name},
    ) => (
      <MyInputField
        // inputProps = {{
        //   name,
        //   value,
        //   onChange,
        // }}
        render = {
          // <Select name={name} onChange={({value}) => onChange(value)} options={keyTableOptions} />
          <div>hello</div>
        }
      />
    )}
  />
);

export default trackKeyController;