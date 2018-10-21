import actionTypes from '../constant/constant'


const INITIAL_STATE = {
    CURRENTUSER: null,
    USERUID: null,
    USERDETAIL: null,
    EVENTS: null
}

export default (states = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CURRENTUSER:
            return ({
                ...states,
                CURRENTUSER: action.payload
            })
        case actionTypes.USERUID:
            return ({
                ...states,
                USERUID: action.payload
            })
        case actionTypes.USERDETAIL:
            return ({
                ...states,
                USERDETAIL: action.payload
            })
        case actionTypes.EVENTS:
            return ({
                ...states,
                EVENTS: action.payload
            })
        default:
            return states;
    }
}