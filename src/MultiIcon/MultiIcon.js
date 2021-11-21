import { Component } from 'react'
import PropTypes from 'prop-types'

import { icons } from '../assets/index'

import './MultiIcon.scss'

export default class MultiIcon extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func,
  }
  static defaultProps = {
    className: '',
    active: false,
  }

  render() {
    const SVG = icons[this.props.icon][this.props.active ? 1 : 0]

    return (
      <SVG
        className={`root-multiIcon ${this.props.className}`}
        onClick={this.props.onClick}
      />
    )
  }
}
