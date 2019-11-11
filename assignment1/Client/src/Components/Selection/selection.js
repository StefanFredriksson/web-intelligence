import React, { Component } from 'react'
import './selection.css'
import SelectUser from './User/selectUser'
import SelectSimilarity from './Similarity/selectSimilarity'
import SelectResults from './Results/selectResults'
import Movies from './Buttons/Users'

export default class selection extends Component {
  render () {
    return (
      <div>
        <ul id='select-list'>
          <li>
            <SelectUser />
          </li>
          <li>
            <SelectSimilarity />
          </li>
          <li>
            <SelectResults />
          </li>
          <li>
            <Movies />
          </li>
        </ul>
      </div>
    )
  }
}
