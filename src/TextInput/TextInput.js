import { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/Icon'

import './TextInput.scss'

export default class TextInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    name: PropTypes.string,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    clearable: PropTypes.bool,
    onClear: PropTypes.func,
    readonly: PropTypes.bool,
    onClickToContainer: PropTypes.func,
  }

  static defaultProps = {
    placeholder: '',
    disabled: false,
    clearable: false,
    readonly: false,
    onChange: () => {},
  }

  handleChange = (event) => {
    this.props.onChange(event.target.value)
  }

  handleClear = () => {
    if(this.props.onClear)
      this.props.onClear()
    else
      this.props.onChange('')
  }

  render() {
    const { value, name, placeholder, className, onBlur, disabled, onFocus, clearable, readonly, onClickToContainer, icon } = this.props

    return (
      <div className={`root-text-input ${this.props.icon ? 'text-input-whitch-icon' : ''} ${className}`} onClick={onClickToContainer}>
        <input
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          onChange={this.handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className="text-input-input"
          type="text"
          value={value || ''}
          id={name}
          readOnly={readonly}
        >
        </input>
        {
          clearable && value !== ''
            ? <Icon className="text-input-icon-clear" icon='close' alt="" onClick={this.handleClear}/>
            : this.props.icon
              ? <Icon className="text-input-icon" icon={icon} alt=""/>
              : null
        }
      </div>
    )
  }
}
