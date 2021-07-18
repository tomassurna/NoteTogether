function playerTimeReducer(state = { time: 0 }, action) {
  console.log(state)
  switch (action.type) {
    case 'playerTimeReducer/setTime':
      return { time: action.time }
    default:
      return state
  }
}

export default playerTimeReducer
