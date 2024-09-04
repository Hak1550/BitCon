const SWITCH_LANG = 'SWITCH_LANG'

export const defaultLang = 'ar'

export const switchLang = data => ({
  type: SWITCH_LANG,
  data,
})

const initialState = {
    defaultLang,
}

export const lang = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_LANG: {
      return {
        defaultLang: action.data
      }
    }
    default:
      return state
  }
}
