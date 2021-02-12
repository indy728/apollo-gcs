import React, {useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {MyInputField} from '../../../ui'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem;

  flex-wrap: wrap;
`;
const TagsWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0 -.5rem;
  /* margin-top: -.5rem; */
`;
const TagWrapper = styled.li`
  list-style-type: none;
  display: flex;
  border-radius: ${({theme: {borderRadius}}) => borderRadius};
  padding: .8rem 1rem;
  background: ${({theme: {secondary}, clearable}) => clearable ? secondary[1] : secondary[0]};
  margin: .5rem;

  .tag-label:not(:first-child) {
    margin-left: .8rem;
  }
`;
const TagClose = styled.div`
  cursor: pointer;

  > * {
    transition: .1s all linear;

    :hover {
      transform: scale(1.1);
    }
  }
`;
const TagLabel = styled.div``;

const AddTagLineItem = styled.li`
  list-style-type: none;
  margin: .5rem;
`;

const AddTagWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`
const AddTagInput = styled.input`
  height: 2rem;
  width: 10rem;
  color: black;
  padding: auto 1rem;
  outline: none;
`;

const AddTagSubmit = styled.div`
  margin-left: .8rem;
  padding: .4rem .5rem;
  border-radius: .2rem;
  background-color: ${({disabled}) => disabled ? 'grey' : 'orangered'};

`;

const AddTag = ({tagMethods: {tags, newTag, setTags, setNewTag}}) => {

  const disabled = newTag.length === 0;
  console.log('[index] disabled: ', disabled, newTag)

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

  return (
    <AddTagWrapper>
      <MyInputField width="12rem" inputProps={{onChange: handleChange, value: newTag, placeholder: "ie: 'uplifting' or 'anjuna'"}}/>
      <AddTagSubmit onClick={addTag} disabled={disabled}>Add Tag</AddTagSubmit>
    </AddTagWrapper>
  )
}

const TagList = ({keywords = []}) => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  console.log('[index] newTag: ', newTag)

  const removeTag = (idx) => {
    const newTags = [...tags];
    newTags.splice(idx, 1)
    setTags(newTags)
  };

  const _makeTags = (list, clearable = false) => (
    list.map((x, idx) => (
        <TagWrapper key={x + idx} clearable={clearable}>
          {clearable && (<TagClose onClick={() => removeTag(idx)}><FontAwesomeIcon icon={faTimesCircle} /></TagClose>)}
          <TagLabel className="tag-label">{x}</TagLabel>
        </TagWrapper>
      ))
    );

  return (
    <Wrapper> 
      <TagsWrapper>
        {[ _makeTags(keywords), _makeTags(tags, true)]}
        <AddTagLineItem>
          <AddTag tagMethods={{tags, newTag, setTags, setNewTag}} />
        </AddTagLineItem>
      </TagsWrapper>
    </Wrapper>
  )
}

export default TagList;