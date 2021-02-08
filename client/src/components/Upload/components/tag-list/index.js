import React, {useState} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const TagWrapper = styled.div`
  display: flex;
  border-radius: .5rem;
  padding: 1rem;
`;
const TagClose = styled.div``;
const TagLabel = styled.div``;




const TagList = ({keywords = []}) => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  console.log('[index] tags: ', tags)

  const removeTag = (idx) => {
    const newTags = [...tags];
    newTags.splice(idx, 1)
    setTags(newTags)
  };
  const addTag = () => {
    if (newTag.length) {
      const newTags = [...tags]; 
      newTags.push(newTag);
      setTags(newTags);
      setNewTag('');
    }
  }

  const handleChange = ({target: {value}}) => {
    const allowAlnum = /[^a-z0-9\s]/i
    setNewTag(value.replace(allowAlnum, '').toLowerCase());
  }

  const _makeTags = (list, clearable = false) => (
    list.map((x, idx) => (
        <TagWrapper key={x + idx}>
          {clearable && (<TagClose onClick={() => removeTag(idx)}>X</TagClose>)}
          <TagLabel>{x}</TagLabel>
        </TagWrapper>
      ))
    );

  return (
    <Wrapper> 
      {[ _makeTags(keywords), _makeTags(tags, true)]}
      <input onChange={handleChange} value={newTag} />
      <div onClick={addTag}>Add</div>
    </Wrapper>
  )
}

export default TagList;