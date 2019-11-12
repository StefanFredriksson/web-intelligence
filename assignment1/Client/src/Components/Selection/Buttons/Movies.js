import React, { Component } from 'react'
import { connect } from 'react-redux'
import { recommendedMovies } from '../../../Redux/Actions/requestActions'

export class Movies extends Component {
  constructor (props) {
    super(props)

    this.buttonClicked = this.buttonClicked.bind(this)
  }

  buttonClicked (event) {
    this.props.recommendedMovies()
  }

  render () {
    return (
      <div>
        <button onClick={this.buttonClicked}>Find recommended movies</button>
      </div>
    )
  }
}

export default connect(
  null,
  { recommendedMovies }
)(Movies)
