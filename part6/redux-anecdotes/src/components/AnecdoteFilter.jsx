import { filterChange } from "../reducers/filterReducer";
import { useDispatch, useSelector } from "react-redux";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();  
  const filter = useSelector((state) => state.filter);

  const handleFilter = (event) => {
    event.preventDefault();
    const content = event.target.value;
    dispatch(filterChange(content));
  };

  return (
    <div>
        <label htmlFor="filter">Filter anecdotes:</label>
        <input
          id="filter"
          type="text"
          value={filter} // bind value to the filter state
          onChange={handleFilter} // handle change in the input
          placeholder="Search anecdotes..."
        />
    </div>
  );
};

export default AnecdoteFilter;
