const UPSERT_AMENITIES = 'UPSERT_AMENITIES'

export const upsertAmenities = data => ({
    type: UPSERT_AMENITIES,
    data,
})

const initialState = {
    Amenities : [
        { id: 1, title: 'Air Condition', checked: false },
        { id: 2, title: 'Cable TV', checked: false },
        { id: 5, title: 'Elevator', checked: false },
        { id: 3, title: 'Ceiling Height', checked: false },
        { id: 6, title: 'Fence', checked: false },
        { id: 7, title: 'Heating', checked: false },
        { id: 4, title: 'Wifi', checked: false },
        { id: 8, title: 'Intercom', checked: false },
        { id: 9, title: 'Parking', checked: false },
        { id: 10, title: 'Const. Year', checked: false },
        { id: 11, title: 'Fireplace', checked: false },
        { id: 12, title: 'Garden', checked: false },
        { id: 13, title: 'Pet Friendly', checked: false },
        { id: 14, title: 'Disabled Access', checked: false },
        { id: 15, title: 'Security', checked: false },
        { id: 16, title: 'Swimming Pool', checked: false },
        { id: 17, title: 'Window Type', checked: false },
        { id: 18, title: 'Renovation', checked: false },
    ]
}

export const amenities = (state = initialState, action) => {
    switch (action.type) {
        case UPSERT_AMENITIES: {
            console.log('action.data', action.data)
            console.log('full state', action.data)
            return {
                ...state,
                Amenities: action.data
            }
        }
        default:
            return state
    }
}
