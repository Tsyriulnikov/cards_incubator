import {Dispatch} from "redux"
import {recoveryPasswordAPI} from "./api-RecoveryPassword";
import {handleServerAppError} from "../../utils/error-utils";

const initialState = {
    success: false,
}
type InitialStateType = typeof initialState

export const passwordRecoverReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'RECOVERY_PASSWORD/SET_SUCCESS': {
            return {...state, success: action.success}
        }
        default:
            return state
    }
}
export const setRecoveryPasswordSuccessAC = (success: boolean) => ({
    type: 'RECOVERY_PASSWORD/SET_SUCCESS',
    success
}) as const

export const recoverTC = (email: string) => (dispatch: Dispatch<ActionType>) => {
    // dispatch(isFetchingAC(true))
    recoveryPasswordAPI.recoveryPassword(email)
        .then(res => {
            dispatch(setRecoveryPasswordSuccessAC(true))
        })
        .catch((error) => {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            //Ошибки из ответа
            handleServerAppError(errorResponse, dispatch)
            //Серверные ошибки
            // handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            // dispatch(isFetchingAC(false))
        })
}

type ActionType = ReturnType<typeof setRecoveryPasswordSuccessAC>
