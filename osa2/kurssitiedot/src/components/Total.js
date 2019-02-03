import React from 'react'

export default ({ parts }) => (
    <p>yhteensä { parts.reduce((acc, current) => acc + 
  current.exercises, 0) } tehtävää</p>
  )