import React from 'react'

interface AuthProps {
  title: string
}

export const Auth: React.FC<AuthProps> = ({title}) => {
    return (<div>{title}</div>);
}