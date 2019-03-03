import React from 'react';

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = (props) => (
    <>
      <Notification/>
      <div>
        <AnecdoteForm/>
        <AnecdoteList/>
      </div>
    </>
  )

export default App
