import {Action, Dispatch} from "redux";
import {authApi} from "../features/singIn/auth-api";
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
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

export const initTC = () => {
    return (dispatch: Dispatch) => {
        authApi.me()
            .then((res) => {
                dispatch(setProfileAC(res.data))
                dispatch(setIsLoggedInAC(true))
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                dispatch(setAppInitializedAC(true))
            })


    }

}

