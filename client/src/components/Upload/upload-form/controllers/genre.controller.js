import {Controller} from 'react-hook-form'
import {useQuery} from "@apollo/client";
import {MyInputField} from '../../../ui'
import {GENRES_QUERY} from 'components/apollo'
import {toTitleCase} from 'components/util';

import React, {useState, useEffect} from 'react';

const GenreSuggest = ({setValue}) => {
  const [suggestions, setSuggestions] = useState({
    list: [],
    text: ''
  });
  const [genres, setGenres] = useState([])
  const {data, error, loading} = useQuery(GENRES_QUERY, {
    onCompleted: () => setGenres(data && data.getAllGenres.map(({name}) => (name)))
  })

  const handleChange = ({target: {value}}) => {
    if (loading) return;
    let newSuggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, `i`);
      newSuggestions = genres.filter(v => regex.test(v)).sort();
    }

    setSuggestions({
      list: newSuggestions,
      text: value,
    });
  }

  // const handleBlur = () => setValue(suggestions.text);

  const suggestionSelected = (value) => {
    setSuggestions({
      list: [],
      text: value,
    });
    setValue(value);
  }
 
  const renderSuggestions = () => {
    if (!suggestions.list.length) {
      return null;
    }
    return (
      <ul>
        {suggestions.list.map(genre => (
          <li key={genre} onClick={()=>suggestionSelected(genre)}>
            {toTitleCase(genre)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <input
        name="genre"
        onChange={handleChange}
        // onBlur={handleBlur}
        placeholder="Search for or add genre"
        value={suggestions.text}
        type="text"
      />
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