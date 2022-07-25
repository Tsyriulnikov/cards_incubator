import {Dispatch} from "redux";
import {profileAPI} from "../features/profile/profile-api";

export type AppType = {
    isLoggedIn: boolean
}

const initialState: any = false

export const appReducer = (state: AppType = initialState, action: setIsLoggedInACType) => {
    switch (action.type){
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}

export const initTC = () => {
    return (dispatch:Dispatch) => {
        profileAPI.me()
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
            })

    }
}