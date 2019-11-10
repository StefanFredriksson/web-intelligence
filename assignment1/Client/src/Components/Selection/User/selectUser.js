import React, { Component } from 'react'

export default class selection extends Component {
  componentDidMount () {
    this.getUsers()
  }

  async getUsers () {
    let data = await window.fetch('http://localhost:4000/getData')
    data = await data.json()

    let users = data.message.users
    let selection = document.querySelector('#select-user')

    for (let i = 0; i < users.length; i++) {
      let option = document.createElement('option')
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
