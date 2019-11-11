import React, { Component } from 'react'
import { connect } from 'react-redux'
import MatchingUsers from './MatchingUsers/MatchingUsers'
import RecommendedMovies from './RecommendedMovies/RecommendedMovies'

export class Results extends Component {
  constructor (props) {
    super(props)
    this.state = {
      results: null
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.matchingUsers !== prevProps.matchingUsers) {
      this.setState({
        results: <MatchingUsers data={this.props.matchingUsers} />
      })
    }

    if (this.props.recMovies !== prevProps.recMovies) {
      this.setState({
        results: <RecommendedMovies data={this.props.recMovies} />
      })
    }
  }

  render () {
    return <div>{this.state.results}</div>
  }
}

const mapStateToProps = state => ({
  matchingUsers: state.euclidian.matchingUsers,
  recMovies: state.euclidian.recMovies
})

export default connect(
  mapStateToProps,
  null
)(Results)
