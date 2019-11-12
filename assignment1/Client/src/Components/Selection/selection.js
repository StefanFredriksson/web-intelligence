import React, { Component } from 'react'
import './Selection.css'
import SelectUser from './User/SelectUser'
import SelectSimilarity from './Similarity/SelectSimilarity'
import SelectResults from './Results/SelectResults'
import Users from './Buttons/Users'
import Movies from './Buttons/Movies'

export default class Selection extends Component {
  render () {
    return (
      <div id='selection-div'>
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
        </ul>
        <ul id='results-list'>
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
