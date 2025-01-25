import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload; // Full updated anecdote with the new vote count

      // Return a new state array with the updated anecdote
      return state.map(
        (anecdote) =>
          anecdote.id === updatedAnecdote.id
            ? { ...anecdote, votes: updatedAnecdote.votes } // Spread and update the votes
            : anecdote // Keep the rest of the anecdotes unchanged
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    // Create a new sorted array instead of mutating the original
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
    dispatch(setAnecdotes(sortedAnecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdoteAsync = (id) => {
  return async (dispatch) => {
    try {
      // Fetch the updated anecdote from the server
      const updatedAnecdote = await anecdoteService.voteAnecdote(id);
      console.log("Updated anecdote:", updatedAnecdote); // Log updated anecdote

      dispatch(voteAnecdote(updatedAnecdote)); // Dispatch the updated anecdote
    } catch (error) {
      console.error("Failed to vote for anecdote", error);
    }
  };
};

export default anecdoteSlice.reducer;
