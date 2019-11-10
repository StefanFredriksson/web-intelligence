import React, { Component } from 'react'

export default class selectResults extends Component {
  render () {
    return (
      <div>
        <label>
          Results: <input id='select-results' type='text' defaultValue='3' />
        </label>
      </div>
    )
  }
}
