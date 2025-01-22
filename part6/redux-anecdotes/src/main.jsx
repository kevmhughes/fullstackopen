import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
/* import { createAnecdote } from "./reducers/anecdoteReducer";
import { filterChange } from "./reducers/filterReducer"; */

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);
/* store.subscribe(() => console.log("store get state", store.getState()));
store.dispatch(filterChange("ALL"));
store.dispatch(
  createAnecdote("combineReducers forms one reducer from many simple reducers")
); */

console.log("main.jsx console.log", store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
