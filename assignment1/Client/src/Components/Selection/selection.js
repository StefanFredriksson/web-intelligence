import React, { Component } from 'react'
import './selection.css'
import SelectUser from './User/selectUser'
import SelectSimilarity from './Similarity/selectSimilarity'
import SelectResults from './Results/selectResults'
import Users from './Buttons/Users'
import Movies from './Buttons/Movies'

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
            <Users />
          </li>
          <li>
            <Movies />
          </li>
        </ul>
      </div>
    )
  }
}
