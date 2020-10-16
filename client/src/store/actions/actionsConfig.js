export const CURRENT_USER = "CURRENT_USER"
export const IS_ADMIN = "IS_ADMIN"
export const NO_MORE_ADMIN = "NO_MORE_ADMIN"
export const NEW_VACATION = "NEW_VACATION"
export const SHOW_VACATIONS = "SHOW_VACATIONS"
export const UPDATE_VACATIONS = "UPDATE_VACATIONS"
export const DELETE_VACATIONS = "DELETE_VACATIONS"
export const GET_FOLLOWED_VACATIONS = "GET_FOLLOWED_VACATIONS"


export const currentUser = (payload) => {
    return {
        type: CURRENT_USER,
        payload: payload
    }
}


export const isAdmin = (payload) => {
    return {
        type: IS_ADMIN,
        payload: payload
    }
}

export const noLongerAdmin = (payload) => {
    return {
        type: NO_MORE_ADMIN,
        payload: payload
    }
}

export const newVacation = (payload) => {
    return {
        type: NEW_VACATION,
        payload: payload
    }
}

export const showVacatios = (payload) => {
    return {
        type: SHOW_VACATIONS,
        payload: payload
    }
}

export const updateVacationsArr = (payload) => {
    return {
        type: UPDATE_VACATIONS,
        payload: payload
    }

}


export const deleteVacations = (payload) => {

    return {
        type: DELETE_VACATIONS,
        payload: payload
    }

}
export const updateFollowedVacations = (payload) => {
    return {
        type: GET_FOLLOWED_VACATIONS,
        payload: payload
    }
}