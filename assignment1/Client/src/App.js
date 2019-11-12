import React from 'react'
import { Provider } from 'react-redux'
import Selection from './Components/Selection/Selection.js'
import Results from './Components/Results/Results'
import store from './Redux/store'

function App () {
  return (
    <Provider store={store}>
      <div className='App'>
        <Selection />
        <Results />
      </div>
    </Provider>
  )
}

export default App
