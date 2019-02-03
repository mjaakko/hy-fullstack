import React from 'react'

import Part from './Part'

export default ({ parts }) => {
    return parts.map(part => <Part key={part.id} part={part.name} 
  exercises={part.exercises}/>);
}