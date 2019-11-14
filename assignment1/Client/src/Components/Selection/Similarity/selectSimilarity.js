import React, { Component } from 'react'

/**
 * Renders a dropdown input field where the user picks which algorithm to use.
 */
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
