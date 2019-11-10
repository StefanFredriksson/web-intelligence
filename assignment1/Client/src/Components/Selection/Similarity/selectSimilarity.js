import React, { Component } from 'react'

export default class selectSimilarity extends Component {
  render () {
    return (
      <div>
        <label>
          Similarity:{' '}
          <select>
            <option>Euclidian</option>
          </select>
        </label>
      </div>
    )
  }
}
