import {Dispatch} from "redux";
import {authAPI} from "../features/singIn/auth-api";
import {setIsLoggedInAC} from "../features/singIn/auth-reducer";
import {setProfileAC} from "../features/profile/profile-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: SetAppStatusActionType | setAppInitializedACType | SetAppErrorActionType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

export const initTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then((res) => {
                dispatch(setProfileAC(res.data))
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppInitializedAC(true))
            })


    }

}

