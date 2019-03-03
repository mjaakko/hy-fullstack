import React from 'react';

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = (props) => (
    <>
      <Notification store={ props.store }/>
      <div>
        <AnecdoteForm store={ props.store }/>
        <AnecdoteList store={ props.store }/>
      </div>
    </>
  )

export default App
