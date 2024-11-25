import { useState } from 'react'

const Header = ({ title }) => {
  return (
    <h1>
      {title}
    </h1>
  )
}

const GoodFeedbackButton = ({handleGoodClick}) => {
  return (
    <div>
      <button onClick={handleGoodClick}>
        good
      </button>
    </div>
  )
}

const NeutralFeedbackButton = ({handleNeutralClick}) => {
  return (
    <div>
      <button onClick={handleNeutralClick}>
        neutral
      </button>
    </div>
  )
}

const BadFeedbackButton = ({handleBadClick}) => {
  return (
    <div>
      <button onClick={handleBadClick}>
        bad
      </button>
    </div>
  )
}

const Statistics = ({ title, good, neutral, bad }) => {
  const statsStyle = {
    display: 'flex',
    flexDirection: 'column', // To stack the items vertically
  };
  return (
    <div style={statsStyle}>
      <h2>{title}</h2>
      <div>Good: {good}</div>
      <div>Neutral: {neutral}</div>
      <div>Bad: {bad}</div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const header = "Give Feedback"
  const section = "Statistics"

  const appStyle = {
    display: 'flex',
    flexDirection: 'column', // To stack the items vertically
    gap: "4px"
  };

  return (
    <div>
      <Header title={header}/>
      <div style={appStyle}>
      <GoodFeedbackButton handleGoodClick={handleGoodClick}/>
      <NeutralFeedbackButton handleNeutralClick={handleNeutralClick}/>
      <BadFeedbackButton handleBadClick={handleBadClick}/>
      </div>
      <Statistics 
       title={section}
       good={good}
       neutral={neutral}
       bad={bad}
      />
    </div>
  )
}

export default App