import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import {
  Wrapper, TagsWrapper, TagLabel, TagClose, TagWrapper
} from './tags.styles';

const TagList = ({keywords = [], custom = [], removeTag}) => {
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
        {[ _makeTags(keywords), _makeTags(custom, true)]}
      </TagsWrapper>
    </Wrapper>
  )
}

export default TagList;