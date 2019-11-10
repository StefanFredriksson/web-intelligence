import React, { Component } from 'react'

export default class movies extends Component {
  buttonClicked (event) {
    console.log(event.target)
  }

  render () {
    return (
      <div>
        <button onClick={this.buttonClicked}>Find recommended movies</button>
      </div>
    )
  }
}
