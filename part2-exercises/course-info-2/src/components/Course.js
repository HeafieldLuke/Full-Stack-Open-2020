import React from 'react'

import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({course}) => (
    <div>
      <Header course ={course.name}/>
      <Content parts={course.parts}/>
      <Total total={course.parts.map(part => part.exercises).reduce((a,b) => a + b, 0)}/>
    </div>
)

export default Course