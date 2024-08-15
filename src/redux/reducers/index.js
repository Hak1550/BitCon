import { combineReducers } from 'redux'
import { auth } from '../../core/onboarding/redux/auth'
import { lang } from '../../core/onboarding/redux/language'
import { fav } from '../../core/onboarding/redux/favorites'
import { amenities } from '../../core/onboarding/redux/amenities'



// combine reducers to build the state
export const appReducer = combineReducers({ auth,lang,fav,amenities  })

// const rootReducer = (state, action) => {
//   if (action.type === LOG_OUT) {
//     state = undefined
//   }

//   return appReducer(state, action)
// }

// export default rootReducer
