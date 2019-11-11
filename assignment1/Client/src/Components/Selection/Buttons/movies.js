import React, { Component } from 'react'

export default class movies extends Component {
  async buttonClicked (event) {
    let userId = document.querySelector('#select-user').value
    let response = await window.fetch(
      'http://localhost:4000/findmovies/' + userId
    )
  }

  render () {
    return (
      <div>
        <button onClick={this.buttonClicked}>Find recommended movies</button>
      </div>
    )
  }
}
