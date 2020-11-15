import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  border-radius: ${props => props.borderRadius};
  border: ${props => props.border};
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  outline: none;
  cursor: pointer;

  &:disabled{
    background-color: #D3D3D3;
  }

`

Button.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  borderRadius: PropTypes.string,
  border: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
}

/** @component */
export default Button
