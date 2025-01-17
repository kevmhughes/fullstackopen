const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return {
        ...state,
        // and update the copy with the new value
        good: state.good + 1
      }
    case 'OK':
      return {
        ...state,
        // and update the copy with the new value
        ok: state.ok + 1
      }
    case 'BAD':
      return {
        ...state,
        // and update the copy with the new value
        bad: state.bad + 1
      }
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }
  
}

export default counterReducer
