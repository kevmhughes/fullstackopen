import { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ handler, text }) => {
  return (
    <div>
      <button onClick={handler}>{text}</button>
    </div>
  );
};

const StatisticLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}:</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ title, good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total == 0 ? 0 : ((good - bad) / total).toFixed(2);
  const goodAsPercentage = total == 0 ? 0 : ((good / total) * 100).toFixed(2);

  if (total > 0) {
    return (
      <div>
        <h2>{title}</h2>
        <table>
          <tbody>
            <StatisticLine name="Good" value={good} />
            <StatisticLine name="Neutral" value={neutral} />
            <StatisticLine name="Bad" value={bad} />
            <StatisticLine name="All" value={total} />
            <StatisticLine name="Average" value={average} />
            <StatisticLine name="Positive" value={goodAsPercentage} />
          </tbody>
        </table>
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
        <Button handler={() => setGood(good + 1)} text="good" />
        <Button handler={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handler={() => setBad(bad + 1)} text="bad" />
      </div>
      <Statistics title="Statistics" good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
