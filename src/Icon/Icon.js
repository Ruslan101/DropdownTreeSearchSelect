import React from 'react'
import PropTypes from 'prop-types'

import { icons } from '../assets/index'
import './Icon.scss'

export default class Icon extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
  }

  render() {
    const SVG = icons[this.props.icon]

    return (
      <SVG
        className={`root-icon ${this.props.className}`}
        onClick={this.props.onClick}
      />
    )
  }
}
