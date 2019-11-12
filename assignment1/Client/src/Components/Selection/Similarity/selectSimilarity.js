import React, { Component } from 'react'

export default class selectSimilarity extends Component {
  render () {
    return (
      <div>
        <label>
          Similarity:{' '}
          <select id='select-similarity'>
            <option value='euclidian'>Euclidian</option>
            <option value='pearson'>Pearson</option>
          </select>
        </label>
      </div>
    )
  }
}
