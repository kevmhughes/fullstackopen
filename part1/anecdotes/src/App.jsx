import { useState } from "react";

const Title = ( {text} ) => {
  return <h1>{text}</h1>
}

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Votes = ({ votes }) => {
  return <p>This anecdote has {votes} votes</p>
}

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      {votes !== undefined && <Votes votes={votes} />}
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const zeroFilledArray = new Array(anecdotes.length).fill(0);
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(zeroFilledArray);
  const buttonText = "next anecdote";
  const titleOne = "Anecdote of the day"
  const titleTwo = "Anecdote with most votes"


  // produces a random number from 0 to the anecdotes.length which is later used to select a random anecdote
  const handleRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  // makes a copy of the state array (vote) and then handles the vote count
  const handleVote = () => {
    const newVote = [...vote];
    newVote[selected] += 1;
    setVote(newVote);
  };

  // displays the vote count of the the random anecdote
  const selectedVoteCount = vote[selected]

  // 1) finds the (first) highest number of votes in the array
  // 2) displays the vote count for the popular anecdote
  const highestVote = Math.max(...vote);
  // displays the most popular anecdote
  const popularAnecdote =
    highestVote === 0
      ? "There are no votes at the moment."
      : anecdotes[vote.indexOf(highestVote)];

  return (
    <div>
      <Title text={titleOne}/>
      <Anecdote anecdote={anecdotes[selected]} votes={selectedVoteCount}/>
      <Button text="vote" onClick={handleVote} />
      <Button text={buttonText} onClick={handleRandomNumber} />

      <Title text={titleTwo}/>
      {highestVote > 0 ? (
        <Anecdote anecdote={popularAnecdote} votes={highestVote} />
      ) : (
        <Anecdote anecdote={popularAnecdote} />
      )}
    </div>
  );
};

export default App;
