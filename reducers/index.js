import {ADD_DECK, RECEIVE_DECKS, REMOVE_DECK} from '../actions'

function decks(state = {}, action) {
    switch (action.type) {

        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks,
            }

        case ADD_DECK:
            return {
                ...state,
                [action.key]: action.deck
            }

        case REMOVE_DECK:
            const newState = {...state}
            delete newState[action.key]

            return newState

        default:
            return state
    }
}

export default decks
