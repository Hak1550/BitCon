const UPSERT_FAVORITES = 'UPSERT_FAVORITES'

export const upsertFavorites = data => ({
    type: UPSERT_FAVORITES,
    data,
})

const initialState = {
    Favorites: [],
}

export const fav = (state = initialState, action) => {
    switch (action.type) {
      case UPSERT_FAVORITES: {
        console.log('action.data', action.data)
        console.log('full state', action.data)
        return {
            ...state,
            Favorites: action.data
        }
      }
      default:
        return state
    }
  }
  