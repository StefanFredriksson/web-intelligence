import React, { Component } from 'react'
import { connect } from 'react-redux'
import { matchingUsers } from '../../../Redux/Actions/requestActions'

export class Users extends Component {
  constructor (props) {
    super(props)

    this.buttonClicked = this.buttonClicked.bind(this)
  }

  buttonClicked (event) {
    this.props.matchingUsers()
  }

  render () {
    return (
      <div>
        <button onClick={this.buttonClicked}>Find top matching users</button>
      </div>
    )
  }
}

export default connect(
  null,
  { matchingUsers }
)(Users)
