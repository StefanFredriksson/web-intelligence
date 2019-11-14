import React, { Component } from 'react'

/**
 * Renders an input field where the user enters how many results to display.
 */
export default class selectResults extends Component {
  render () {
    return (
      <div>
        <label>
          Results: <input id='select-results' type='number' defaultValue='3' />
        </label>
      </div>
    )
  }
}
