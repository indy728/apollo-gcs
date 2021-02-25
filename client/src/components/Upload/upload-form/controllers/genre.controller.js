import {Controller} from 'react-hook-form'
import {MyInputField} from '../../../ui'

import React, {useState} from 'react';


const genres = [
  'Deep House',
  'Tech House',
  'Techno'
]

const GenreSuggest = ({setValue}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');

  const handleChange = ({target: {value}}) => {
    let newSuggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, `i`);
      newSuggestions = genres.filter(v => regex.test(v)).sort();
    }

    setSuggestions(newSuggestions);
    setText(value);
  }

  const handleBlur = () => setValue(text);

  const suggestionSelected = (value) => {
    setSuggestions([]);
    setText(value);
    setValue(value);
  }
 
  const renderSuggestions = () => {
    if (!suggestions.length) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(genre => (
          <li key={genre} onClick={()=>suggestionSelected(genre)}>
            {genre}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <input onChange={handleChange} onBlur={handleBlur} placeholder="Search for or add genre" value={text} type="text" />
      {renderSuggestions()}
    </div>
  );
}

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
        render = {<GenreSuggest setValue={onChange} />}
      />
    )}
  />
);

export default genreController;