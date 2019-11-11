import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getRecommendedMovies } from '../../../Redux/Actions/euclidianActions'

export class Movies extends Component {
  constructor (props) {
    super(props)

    this.buttonClicked = this.buttonClicked.bind(this)
  }

  buttonClicked (event) {
    this.props.getRecommendedMovies()
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
  { getRecommendedMovies }
)(Movies)
