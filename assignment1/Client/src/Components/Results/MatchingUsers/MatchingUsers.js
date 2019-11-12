import React, { Component } from 'react'

export default class MatchingUsers extends Component {
  componentDidMount () {
    this.renderTable(this.props.data)
  }

  componentDidUpdate (prevProps) {
    if (this.props.data !== prevProps.data) {
      this.clearTable()
      this.renderTable(this.props.data)
    }
  }

  clearTable () {
    let table = document.querySelector('#matching-users-table')

    while (table.rows.length > 1) {
      table.deleteRow(1)
    }
  }

  renderTable (data) {
    let table = document.querySelector('#matching-users-table')

    data.forEach(user => {
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

  render () {
    return (
      <div className='results-table'>
        <table id='matching-users-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Score</th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}
