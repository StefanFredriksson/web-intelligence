import React, { Component } from 'react'
import './SearchEngine.css'

export default class SearchEngine extends Component {
  constructor (props) {
    super(props)
    this.search = this.search.bind(this)
    this.badSearch = this.badSearch.bind(this)
  }
  async search (event) {
    const query = document.querySelector('#search-input').value

    const response = await window.fetch('http://localhost:5000?' + query)
    const json = await response.json()
    console.log(json)
    this.renderTable(json)
  }
  async badSearch (event) {}

  renderTable (data) {
    const table = document.querySelector('#result-table')

    while (table.rows.length > 1) {
      table.deleteRow(1)
    }

    for (let i = 0; i < data.length; i++) {
      const tr = document.createElement('tr')
      const link = document.createElement('td')
      link.textContent = data[i].url
      const score = document.createElement('td')
      score.textContent = data[i].score.toFixed(2)
      const content = document.createElement('td')
      content.textContent = data[i].content.toFixed(2)
      const location = document.createElement('td')
      location.textContent = data[i].location.toFixed(2)
      const rank = document.createElement('td')
      rank.textContent = data[i].rank.toFixed(2)
      tr.appendChild(link)
      tr.appendChild(score)
      tr.appendChild(content)
      tr.appendChild(location)
      tr.appendChild(rank)
      table.appendChild(tr)
    }
  }

  render () {
    return (
      <div>
        <input id='search-input' type='text' />
        <button onClick={this.search}>Search</button>
        <button onClick={this.badSearch}>Bad Search</button>
        <table id='result-table'>
          <thead>
            <tr>
              <th>URL</th>
              <th>Score</th>
              <th>Content</th>
              <th>Location</th>
              <th>PageRank</th>
            </tr>
          </thead>
        </table>
      </div>
    )
  }
}
