import React, { Component } from 'react'

export default class RecommendedMovies extends Component {
  componentDidMount () {
    this.renderTable(this.props.data)
  }

  componentDidUpdate (prevProps) {
    if (this.props.data !== prevProps.data && this.props.data) {
      this.clearTable()
      this.renderTable(this.props.data)
    }
  }

  clearTable () {
    let table = document.querySelector('#recommended-movies-table')

    while (table.rows.length > 1) {
      table.deleteRow(1)
    }
  }

  renderTable (data) {
    let table = document.querySelector('#recommended-movies-table')

    data.forEach(movie => {
      let tableRow = document.createElement('tr')
      let movieTitle = document.createElement('td')
      let id = document.createElement('td')
      let score = document.createElement('td')

      movieTitle.innerText = movie.title.replace(/"/g, '')
      id.innerText = movie.movieId
      score.innerText = movie.weight.toFixed(4)
      tableRow.appendChild(movieTitle)
      tableRow.appendChild(id)
      tableRow.appendChild(score)
      table.appendChild(tableRow)
    })
  }

  render () {
    return (
      <div>
        <table id='recommended-movies-table'>
          <thead>
            <tr>
              <th>Movie</th>
              <th>ID</th>
              <th>Score</th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}
