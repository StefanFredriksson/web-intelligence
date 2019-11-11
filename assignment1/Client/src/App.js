import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import Selection from './Components/Selection/selection.js'
import store from './Redux/store'

function App () {
  return (
    <Provider store={store}>
      <div className='App'>
        <Selection />
      </div>
    </Provider>
  )
}

export default App
