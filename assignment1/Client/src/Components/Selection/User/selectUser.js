import React, { Component } from 'react'

/**
 * Renders a dropdown where the user chooses which user to recommend movies too.
 */
export default class selection extends Component {
  componentDidMount () {
    this.getUsers()
  }

  async getUsers () {
    let data = await window.fetch('http://localhost:4000/getdata')
    data = await data.json()

    let users = data.message.users
    let selection = document.querySelector('#select-user')

    for (let i = 0; i < users.length; i++) {
      let option = document.createElement('option')
      option.value = users[i].id
      option.innerText = users[i].id + ': ' + users[i].name
      selection.appendChild(option)
    }
  }

  render () {
    return (
      <div>
        <label>
          User: <select id='select-user' />
        </label>
      </div>
    )
  }
}
