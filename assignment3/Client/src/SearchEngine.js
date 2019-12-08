import React, { Component } from 'react'
import './SearchEngine.css'

export default class SearchEngine extends Component {
  constructor (props) {
    super(props)
    this.search = this.search.bind(this)
    this.badSearch = this.badSearch.bind(this)
  }
  async search (event) {
    await this.handleSearch('http://localhost:5000?')
  }
  async badSearch (event) {
    await this.handleSearch('http://localhost:5000/bad?')
  }

  async handleSearch (url) {
    let query = document.querySelector('#search-input').value
    query = encodeURIComponent(query)
    const label = document.querySelector('#rec-count')

    const response = await window.fetch(url + query)
    const json = await response.json()

    this.renderTable(json.results)
    label.textContent = `Found ${json.recCount} results in ${json.time.toFixed(3)} seconds.`
  }

  renderTable (data) {
    const table = document.querySelector('#result-table')

    while (table.rows.length > 1) {
      table.deleteRow(1)
    }

    for (let i = 0; i < data.length; i++) {
      const tr = document.createElement('tr')
      const link = document.createElement('td')
      const a = document.createElement('a')
      a.textContent = decodeURIComponent(data[i].url)
      a.href = `https://en.wikipedia.org/wiki/${data[i].url}`
      link.appendChild(a)
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
              <th>Link</th>
              <th>Score</th>
              <th>Content</th>
              <th>Location</th>
              <th>PageRank</th>
            </tr>
          </thead>
        </table>
        <label id='rec-count' />
      </div>
    )
  }
}
