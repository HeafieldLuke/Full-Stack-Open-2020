import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => <h1>{text}</h1>

const Ratings = ({ badCallBack, neutralCallBack, goodCallBack }) => (
  <div>
    <Button handleClick={goodCallBack} text='good'/>
    <Button handleClick={neutralCallBack} text='neutral'/>
    <Button handleClick={badCallBack} text='bad'/>
  </div>
)

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad}) => {

  const total = good + bad + neutral

  if (total === 0) {return <div>no feedback given</div> }

  const average = ((good - bad) / total)
  const positive = (good / total)
  const data = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'total': total,
    'average': average,
    'positive': positive + '%'
  }
  console.log(Object.entries(data))
  return (
    <table>
      <tbody>
      {Object.entries(data).map(([key, value]) => (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>))}
      </tbody>
      
    </table>
  )
}

const App = () => { 
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Ratings 
        goodCallBack={() => setGood(good + 1)}
        neutralCallBack={() => setNeutral(neutral + 1)}
        badCallBack={() => setBad(bad + 1)}
      /> 
      <Header text='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)