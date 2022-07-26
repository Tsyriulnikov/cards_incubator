import {Dispatch} from "redux"
import {recoveryPasswordAPI} from "./api-RecoveryPassword";
import {handleServerAppError} from "../../utils/error-utils";

const initialState = {
    isFetching: false,
    error: null as null | string
}
type InitialStateType = typeof initialState

export const passwordRecoverReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const isFetchingAC = (isFetching: boolean) => ({type: "IS-FETCHING", isFetching} as const)
export const setErrorAC = (error: string | null) => ({type: "SET-ERROR", error} as const)

export const recoverTC = (email: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(isFetchingAC(true))
    recoveryPasswordAPI.recoveryPassword(email)
        .then(res => {
            console.log(res.data)
        })
        .catch((error) => {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            //Ошибки из ответа
            handleServerAppError(errorResponse, dispatch)
            //Серверные ошибки
            // handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(isFetchingAC(false))
        })
}

type ActionType = ReturnType<typeof isFetchingAC> | ReturnType<typeof setErrorAC>