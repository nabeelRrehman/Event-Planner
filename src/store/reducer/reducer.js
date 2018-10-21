import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    GOING: null,
    ARRAY: null,
    NOTGOING: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GOING:
            return ({
                ...states,
                GOING: action.payload
            })
        case actionTypes.ARRAY:
            return ({
                ...states,
                ARRAY: action.payload
            })
        case actionTypes.NOTGOING:
            return ({
                ...states,
                NOTGOING: action.payload
            })
        default:
            return states;
    }
}