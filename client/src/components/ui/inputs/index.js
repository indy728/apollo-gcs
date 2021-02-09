import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  border-bottom: 1px solid ${({theme: {primary}}) => primary[3]};

  .flex {
    display: flex;
    align-items: flex-end;
    
    > div {
      flex: 1 0 auto;
    }
  }
  

  input {
    background-color: transparent;
    border: 0;
    height: 3rem;
    line-height: 3rem;
    width: ${({width}) => width || '100%'};
    padding: 0 .5rem;

    :focus {
      outline: none;
      background-color: rgba(0,0,0,.2);
      font-size: 103%;
    }
  }
`

const MyInput = styled.input`
  
`

export const MyInputField = ({label, inputProps = {}, prefix = null, suffix = null, render, select, selectProps}) => {
  const {value = '', placeholder = '', name = '', onChange = null} = inputProps;

  return (
    <Wrapper>
      <label>
        {label}
      </label>
      <div class="flex">
      {prefix}
      {render || (
        <MyInput {...inputProps} />
        )}
        {suffix}
      </div>
    </Wrapper>
  )
}