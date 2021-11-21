import React from 'react'
import DropdownTreeSearchSelect from './DropdownTreeSearchSelect/DropdownTreeSearchSelect'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { setOption: null }
  }
  get options() {
    return [{
      text: 'Option 1',
      child: [
        {
          text: 'Option 1.1',
          value: '1.1',
        },
        {
          text: 'Option 1.2',
          value: '1.2',
        },
      ],
    },
    {
      text: 'Option 2',
      child: [
        {
          text: 'Option 2.1',
          value: '2.1',
        },
        {
          text: 'Option 2.2',
          value: '2.2',
        }
      ],
    },
    {
      text: 'Option 3',
      child: [
        {
          text: 'Option 3.1',
          value: '3.1',
        },
        {
          text: 'Option 3.2',
          value: '3.2',
        }
      ],
    }
  ]
  }
    render() {
        return (
            <DropdownTreeSearchSelect
              onChange={(e) => this.setState({ setOption: e })}
              value={this.state?.setOption.value}
              options={this.options}
            />
        )
    }
}