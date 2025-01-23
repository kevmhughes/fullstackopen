import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter) {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return anecdotes; // default case: return all anecdotes
  });

  const vote = (id) => {
    dispatch(voteAnecdote({id}));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} style={{marginBottom: "2rem"}}>
          <q style={{fontSize: "1.5rem"}}>{anecdote.content}</q>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}
            <button onClick={() => vote(anecdote.id)} style={{width: "fit-content"}}>Vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
