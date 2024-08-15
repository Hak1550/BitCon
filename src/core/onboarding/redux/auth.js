const UPDATE_USER = 'UPDATE_USER'
const LOG_OUT = 'LOG_OUT'

export const DUMMY_USER_DATA = {}

export const setUserData = data => ({
  type: UPDATE_USER,
  data,
})

export const logout = () => ({
  type: LOG_OUT,
})

const initialState = {
  user: {},
}

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER: {
      console.log('UPDATE_USER','action.data', action.data)
      let obj = {
        // ...state,
        user: action.data
      }
      return obj
    }
    case LOG_OUT: {
      return initialState
    }
    default:
      return state
  }
}
