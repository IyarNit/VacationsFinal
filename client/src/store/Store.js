import React from "react"
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Redirect } from 'react-router';
import { CURRENT_USER } from "./actions/actionsConfig"
import { IS_ADMIN } from "./actions/actionsConfig"
import { NO_MORE_ADMIN } from "./actions/actionsConfig"
import { NEW_VACATION } from "./actions/actionsConfig"
import { SHOW_VACATIONS } from "./actions/actionsConfig"
import { UPDATE_VACATIONS } from "./actions/actionsConfig"
import { DELETE_VACATIONS } from "./actions/actionsConfig"
import { GET_FOLLOWED_VACATIONS } from "./actions/actionsConfig"


const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;


const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);


const initState = {
    currentUser: {},
    isAdmin: false,
    vacations: [],
    likedVacations: []
}


function reducer(state = initState, action) {
    // console.log("state", state)
    switch (action.type) {

        case CURRENT_USER: {

            return { ...state, currentUser: action.payload }
        }
        case IS_ADMIN: {
            return { ...state, isAdmin: true }
        }

        case NO_MORE_ADMIN: {
            return { ...state, isAdmin: false }
        }

        case NEW_VACATION: {
            const newVacatiosArray = [...state.vacations]
            newVacatiosArray.push(action.payload)
            return { ...state, vacations: newVacatiosArray }

        }

        case SHOW_VACATIONS: {
            return { ...state, vacations: action.payload }
        }


        case UPDATE_VACATIONS: {
            const reminingVacations = [...state.vacations]
            reminingVacations.push(action.payload)
            return { ...state, vacations: reminingVacations }
        }


        case DELETE_VACATIONS: {
            const indexToRemove = state.vacations.findIndex((x => x.idvacations === action.payload.id))
            const newArr = state.vacations.filter((item, index) => { return index != indexToRemove })
            return { ...state, vacations: newArr }
        }

        case GET_FOLLOWED_VACATIONS: {
            const newFollowedArr = [...state.likedVacations]
            return { ...state, likedVacations: action.payload }

        }


        default: return state
    }
}
const store = createStore(reducer, enhancer);
export default store