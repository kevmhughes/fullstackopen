import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const voteAnecdote = async (id) => {
  // Fetch the anecdote by id
  const response = await axios.get(`${baseUrl}/${id}`);
  const anecdote = response.data;

  console.log("Fetched anecdote before update:", anecdote);

  // Increment the votes
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

  // Send the updated anecdote back to the server
  const updateResponse = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);

  console.log("Response after update:", updateResponse.data); // Log full response

  return updateResponse.data; // This should return the updated anecdote
};

export default { getAll, createAnecdote, voteAnecdote };
