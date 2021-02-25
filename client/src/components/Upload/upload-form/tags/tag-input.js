import React, {useState} from 'react';
import {TagInputWrapper, TagInputSubmit} from './tags.styles';
import {MyInputField} from 'components/ui'

const TagInput = ({addTag}) => {
  const [newTag, setNewTag] = useState('');
  const handleChange = ({target: {value}}) => {
    const allowAlnum = /[^a-z0-9\s]/i
    setNewTag(value.replace(allowAlnum, '').toLowerCase());
  }
  const handleSubmit = () => {
    addTag(newTag);
    setNewTag('');
  }
  const disabled = newTag.length === 0;

  return (
    <TagInputWrapper>
      <MyInputField width="12rem" inputProps={{onChange: handleChange, value: newTag, placeholder: "ie: 'uplifting' or 'anjuna'"}}/>
      <TagInputSubmit onClick={handleSubmit} disabled={disabled}>Add Tag</TagInputSubmit>
    </TagInputWrapper>
  )
}

export default TagInput;
