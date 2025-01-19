const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  // action.data?.id => optional chianing operator in JavaScript allows access to properties of an object that may be null or undefined, without causing a runtime error.
  console.log("action.data.id", action.data?.id);

  switch (action.type) {
    case "VOTE": {
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    }

    case "NEW_ANECDOTE": {
      const newAnecdote = asObject(action.data.content);
      // concat() concatenates the new anecdote to the end of the current state array, creating a new array before sorting.
      return state.concat(newAnecdote).sort((a, b) => b.votes - a.votes);
    }

    default:
      return state;
  }
};

export default reducer;
