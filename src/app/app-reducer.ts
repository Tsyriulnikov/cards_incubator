import {Dispatch} from "redux";
import {profileAPI} from "../features/profile/profile-api";

// export type AppType = {
//     isLoggedIn: boolean
// }

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
    isLoggedIn: false
}


// const initialState: any = false

export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}

        default:
            return state
    }
}

// export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}

//AC
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetInitializedActionType = ReturnType<typeof setInitializedAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
    isLoggedIn: boolean
}


export const initTC = () => {
    return (dispatch: Dispatch) => {
        profileAPI.me()
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
            })

    }
}

type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetInitializedActionType

