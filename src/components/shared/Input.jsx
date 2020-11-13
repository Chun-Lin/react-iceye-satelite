import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: 0 10px;
  border: 1px solid ${props => props.borderColor};
  border-radius: ${props => props.borderRadius};
  background-color: white;
  color: ${props => props.color};
  outline: none;
`

const Input = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  width,
  height,
  color,
  borderColor = '#979797',
  borderRadius = '100px',
  ...rest
}) => {
  return (
    <StyledInput
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      width={width}
      height={height}
      color={color}
      borderColor={borderColor}
      borderRadius={borderRadius}
      {...rest}
    />
  )
}

Input.propTypes = {
  borderColor: PropTypes.string,
  borderRadius: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  width: PropTypes.string,
}

export default Input
