import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMatchingUsers } from '../../../Redux/Actions/euclidianActions'

export class Users extends Component {
  constructor (props) {
    super(props)

    this.buttonClicked = this.buttonClicked.bind(this)
  }

  buttonClicked (event) {
    this.props.getMatchingUsers()
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
  { getMatchingUsers }
)(Users)
