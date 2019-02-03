import React from 'react'

import Header from './Header'
import Content from './Content'
import Total from './Total'

export default ({ course }) => (
    <div>
        <Header title={ course.name } />
        <Content parts={ course.parts } />
        <Total parts={ course.parts } />
    </div>
)