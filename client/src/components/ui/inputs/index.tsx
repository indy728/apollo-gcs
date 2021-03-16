import React from 'react';
import styled from 'styled-components'


interface InputWrapperProps {
  readonly width?: string
}

const Wrapper = styled.div<InputWrapperProps>`
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
    height: 2.4rem;
    line-height: 2.4rem;
    width: ${({width}) => width || '100%'};
    padding: 0 .5rem;

    :focus {
      outline: none;
      background-color: rgba(0,0,0,.2);
      font-size: 103%;
    }
  }
`

const MyInput = styled.input<InputProps>`
`

interface InputProps {
  id?: string
  type?: string
  name?: string
  ref?: React.LegacyRef<HTMLInputElement> | any
  required?: boolean
  accept?: string
  autocomplete?: string
  autofocus?: string
  value?: string | number
}

interface Props {
  label?: string
  inputProps?: InputProps
  prefix?: string
  suffix?: string
  width?: string
  select?: any
  selectProps?: any
  render?: React.FC
}

export const MyInputField: React.FC<Props> = ({label, inputProps = {}, prefix = null, suffix = null, render, select, selectProps, width}) => {

  return (
    <Wrapper width={width}>
      {label && (
        <label>
          {label}
        </label>
      )}
      <div className="flex">
      {prefix}
      {render || (
        <MyInput {...inputProps} />
        )}
        {suffix}
      </div>
    </Wrapper>
  )
}