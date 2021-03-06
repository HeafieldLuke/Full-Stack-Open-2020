import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Header = ({ text }) => <h1>{text}</h1>

const Display = ({ anecdote, votes}) => {
  return <div>{anecdote}<br/>{'has ' + votes + ' votes'}</div>
}
const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0])

  const vote = () => {
    const copy = [ ...points ]
    copy[selected] += 1
    setPoints(copy)
  }

  const max = points.indexOf(Math.max(...points))
  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Display anecdote={anecdotes[selected]} votes={points[selected]} />
      <div>
       <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote'/>
       <Button handleClick={vote} text='vote'/>
      </div>
      <Header text='Anecdote with most votes'/>
      <Display anecdote={anecdotes[max]} votes={points[max]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)