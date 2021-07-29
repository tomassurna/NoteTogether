function playerTimeReducer(state = { time: 0 }, action) {
  // console.log(state)
  switch (action.type) {
    case 'playerTimeReducer/setTime':
      return { ...state, ...{ time: action.time } }
    case 'playerTimeReducer/setDuration':
      return { ...state, ...{ duration: action.time } }
    default:
      return state
  }
}

export default playerTimeReducer
