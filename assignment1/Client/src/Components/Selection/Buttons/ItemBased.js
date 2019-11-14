import React, { Component } from 'react'
import { connect } from 'react-redux'
import { recommendedMovies } from '../../../Redux/Actions/requestActions'

/**
 * Renders a button for using item-based filtering when recommending movies.
 */
export class ItemBased extends Component {
  constructor (props) {
    super(props)

    this.buttonClicked = this.buttonClicked.bind(this)
  }

  buttonClicked (event) {
    this.props.recommendedMovies(true)
  }

  render () {
    return (
      <div>
        <button onClick={this.buttonClicked}>Item-based recommendations</button>
      </div>
    )
  }
}

export default connect(
  null,
  { recommendedMovies }
)(ItemBased)
