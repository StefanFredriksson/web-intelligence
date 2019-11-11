import React, { Component } from 'react'
import { connect } from 'react-redux'
import MatchingUsers from './MatchingUsers/MatchingUsers'

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
  }

  render () {
    return <div>{this.state.results}</div>
  }
}

const mapStateToProps = state => ({
  matchingUsers: state.euclidian.matchingUsers
})

export default connect(
  mapStateToProps,
  null
)(Results)
