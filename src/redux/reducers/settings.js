import {Settings} from "./../actionTypes";


const initialState = {
    general: {
        use_location_as_prefix: true,
        refresh: 10
    },
    prefix: {
        country: '',
        county: '',
        city: '',
        area: ''
    },
    location: {
        country: '',
        county: '',
        city: '',
        area: ''
    },
};


function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case Settings.UPDATE_GENERAL:
            return {...state,
                general: action.payload
            };
        case Settings.UPDATE_LOCATION:
            return{...state,
                location: action.payload
            };
        case Settings.UPDATE_PREFIX:
            return {...state,
                prefix: action.payload,
            };
        default:
            return state;
    }
}



export default settingsReducer;
