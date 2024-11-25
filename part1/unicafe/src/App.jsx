import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const ClickButton = ({ handler, text }) => {
  return (
    <div>
      <button onClick={handler}>{text}</button>
    </div>
  );
};

const Stat = ({ name, value }) => {
  return (
    <div>
      {name}: {value}
    </div>
  );
};

const Statistics = ({ title, good, neutral, bad }) => {
  const statsStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const total = good + neutral + bad;
  const average = total == 0 ? 0 : ((good - bad) / total).toFixed(2);
  const goodAsPercentage = total == 0 ? 0 : ((good / total) * 100).toFixed(2);

  if (total > 0) {
    return (
      <div style={statsStyle}>
        <h2>{title}</h2>
        <Stat name="Good" value={good} />
        <Stat name="Neutral" value={neutral} />
        <Stat name="Bad" value={bad} />
        <Stat name="All" value={total} />
        <Stat name="Average" value={average} />
        <Stat name="Percentage of good votes" value={goodAsPercentage} />
      </div>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const appStyle = {
    display: "flex",
    flexDirection: "column", // To stack the items vertically
    gap: "4px",
  };

  return (
    <div>
      <Header title="Give Feedback" />
      <div style={appStyle}>
        <ClickButton handler={() => setGood(good + 1)} text="good" />
        <ClickButton handler={() => setNeutral(neutral + 1)} text="neutral" />
        <ClickButton handler={() => setBad(bad + 1)} text="bad" />
      </div>
      <Statistics title="Statistics" good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
