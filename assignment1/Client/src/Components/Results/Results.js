import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Results.css'
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
    if (
      this.props.matchingUsers !== prevProps.matchingUsers &&
      this.props.matchingUsers
    ) {
      console.log('sup')
      this.setState({
        results: <MatchingUsers data={this.props.matchingUsers} />
      })
    }

    if (this.props.recMovies !== prevProps.recMovies && this.props.recMovies) {
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
  matchingUsers: state.requests.matchingUsers,
  recMovies: state.requests.recMovies
})

export default connect(
  mapStateToProps,
  null
)(Results)
