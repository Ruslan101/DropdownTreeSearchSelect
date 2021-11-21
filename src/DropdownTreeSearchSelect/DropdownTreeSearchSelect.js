import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import onClickOutside from 'react-onclickoutside'

import TextInput from '../TextInput/TextInput'
import MultiIcon from '../MultiIcon/MultiIcon'

import './DropdownTreeSearchSelect.scss'

class DropdownTreeSearchSelect extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      child: PropTypes.array,
    })),
    value: PropTypes.string,
    nullOption: PropTypes.string,
    className: PropTypes.string,
  }
  constructor(props) {
    super(props)

    this.dropOutMenuRef = React.createRef()
    this.isChildCollapsed = new Array(this.props.options.length)
    this.debouncedHandleSearch = debounce(this.handleSearch, 100)
    this.state = { search: null, textInputSearch: null, isMenuCollapsed: false }
  }

  /**
   * @function renderDropOutMenuItem
   * @param {object} data
   * @param {number} i
   * @returns {object} JSX.Element
   * @summary Returns the DOM of dropdown menu
   */
  renderDropOutMenuItem = (data, i) => {
    return (
      <div className={`dropout-menu-content-${i}`} key={`RKFHEF-${i}`}>
        <div onClick={() => this.switchChildItemCollapsed(i)} className={`dropout-menu-item ${this.isChildCollapsed[i] ? 'collapsedChildren' : ''}`}>
          <MultiIcon icon='drop_out_select' active={this.isChildCollapsed[i]} />
          <span>{data?.text}</span>
        </div>
        {
          this.isChildCollapsed[i] && data.child
            ? data.child.map((chData, c) => (
              <div className='dropout-menu-item-children' key={`FJJDGHE-${c}`} onClick={(e) => { this.props.onChange(chData); this.switchMenu(e, false) }}>
                <span>{chData.text}</span>
              </div>
            ))
            : null
        }
      </div>
    )
  }

  switchChildItemCollapsed = (i) => {
    this.isChildCollapsed[i] = !this.isChildCollapsed[i]
    this.forceUpdate()
  }

  switchMenu(e, s) {
    e.stopPropagation()
    this.setState({ isMenuCollapsed: s })
  }

  switchMenuOnclickClose = (e) => {
    this.switchMenu(e, false)
  }

  /**
   * @function handleSearch
   * @param {string} e String of search target
   * @returns {void}
   * @summary Searches for the specified string
   * in the search object and updates the state
   * according to the search result. Writes to
   * null if not transmitted of search target
   */
  handleSearch = (e) => {
    this.setState({ textInputSearch: e })
    if(!e)
      return this.setState({ search: null })

    const __data__ = []

    main: for(let i=0; i<this.props.options.length; i++) {
      if(this.props.options[i].child) {
        for(let k=0; k<this.props.options[i].child.length; k++) {
          if(this.props.options[i].child[k].text.toLowerCase().includes(e.toLowerCase())) {
            __data__.push(this.props.options[i])
            continue main
          }
        }
        if(this.props.options[i].text.toLowerCase().includes(e.toLowerCase())) {
          __data__.push(this.props.options[i])
          continue
        }
      }
    }
    this.setState({ search: __data__ })
  }

  render() {
    return (
      <div className='root-dropdown-tree-search-select'>
        <div className={`main-input ${this.state.isMenuCollapsed ? 'collapsed' : ''}`} onClick={(e) => this.switchMenu(e, true)}>
          <span>{this.props.value ?? this.props.nullOption}</span>
        </div>
        <div ref={this.dropOutMenuRef} onClick={(e) => e.stopPropagation()} className={this.state.isMenuCollapsed ? 'dropout-menu' : 'none'}>
          <TextInput value={this.state.textInputSearch} className='dropout-menu-search' icon='search' onChange={this.debouncedHandleSearch} />
          {
            this.state.search
              ? this.state.search.map((data, i) => (this.renderDropOutMenuItem(data, i)))
              : this.props.options.map((data, i) => (this.renderDropOutMenuItem(data, i)))
          }
        </div>
      </div>
    )
  }
}
const clickOutsideConfig = {
  handleClickOutside: function(instance) {
    return instance.switchMenuOnclickClose
  },
}
export default onClickOutside(DropdownTreeSearchSelect, clickOutsideConfig)