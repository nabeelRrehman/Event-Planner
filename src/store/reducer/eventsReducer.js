import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    EVENTS: null,
    TOTALSEATS: null,
    CARD: [],
    LIST: null,
    RESERVEDSEATS: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.EVENTS:
            return ({
                ...states,
                EVENTS: action.payload
            })
        case actionTypes.TOTALSEATS:
            return ({
                ...states,
                TOTALSEATS: action.payload
            })
        case actionTypes.CARD:
            return ({
                ...states,
                CARD: action.payload
            })
        case actionTypes.TOTALSEATS:
            return ({
                ...states,
                TOTALSEATS: action.payload
            })
        case actionTypes.TOTALRESERVED:
            return ({
                ...states,
                TOTALRESERVED: action.payload
            })
        case actionTypes.LIST:
            return ({
                ...states,
                LIST: action.payload
            })
        case actionTypes.RESERVEDSEATS:
            return ({
                ...states,
                RESERVEDSEATS: action.payload
            })
        default:
            return states;
    }
}