import React, { Component } from 'react'
import { connect } from 'react-redux'

export class MatchingUsers extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.matchingUsers !== prevProps.matchingUsers) {
      let table = document.querySelector('#matching-users-table')
      while (table.rows.length > 0) {
        table.deleteRow(0)
      }
      this.props.matchingUsers.forEach(user => {
        let tableRow = document.createElement('tr')
        let name = document.createElement('td')
        let id = document.createElement('td')
        let score = document.createElement('td')

        name.innerText = user.name
        id.innerText = user.userId
        score.innerText = Number(user.distance).toFixed(4)
        tableRow.appendChild(name)
        tableRow.appendChild(id)
        tableRow.appendChild(score)
        table.appendChild(tableRow)
      })
    }
  }

  render () {
    return (
      <div>
        <table id='matching-users-table'>
          <th>Name</th>
          <th>ID</th>
          <th>Score</th>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  matchingUsers: state.euclidian.matchingUsers
})

export default connect(
  mapStateToProps,
  null
)(MatchingUsers)
