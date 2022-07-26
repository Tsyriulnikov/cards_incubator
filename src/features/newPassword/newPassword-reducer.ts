import {Dispatch} from "redux"
import {newPasswordAPI} from "./api-NewPassword";
import {handleServerAppError} from "../../utils/error-utils";


const initialState = {
    isFetching: false,
    error: null as null | string,
    success: false,
}
type InitialStateType = typeof initialState

export const resetPasswordReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {

        case "IS-FETCHING":
            return {...state, isFetching: action.isFetching}
        case "SET-ERROR":
            return {...state, error: action.error}
        case 'NEW_PASSWORD/SET_SUCCESS': {
            return {...state, success: action.success}
        }
        default:
            return state
    }
}

export const isFetchingAC = (isFetching: boolean) => ({type: "IS-FETCHING", isFetching} as const)
export const setErrorAC = (error: string | null) => ({type: "SET-ERROR", error} as const)
export const setNewPasswordSuccessAC = (success: boolean) => ({type: 'NEW_PASSWORD/SET_SUCCESS', success}) as const

export const newPasswordTC = (password: string, resetPasswordToken: string | undefined) => (dispatch: Dispatch<ActionType>) => {
    dispatch(isFetchingAC(true))
    newPasswordAPI.newPassword(password, resetPasswordToken)
        .then(res => {
            // console.log(res.data)
            dispatch(setNewPasswordSuccessAC(true))
        })
        .catch((error) => {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            //Ошибки из ответа
            handleServerAppError(errorResponse, dispatch)
        })
        .finally(() => {
            dispatch(isFetchingAC(false))
        })
}

type ActionType = ReturnType<typeof isFetchingAC>
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setNewPasswordSuccessAC>