import {recoveryPasswordAPI} from "./api-RecoveryPassword";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {AppDispatch} from "../../app/store";

const initialState = {
    recoverPassSucces: false,
}
type InitialStateType = typeof initialState

export const passwordRecoverReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'RECOVERY_PASSWORD/SET_SUCCESS':
            return {...state, recoverPassSucces: action.recoverPassSucces}
        default:
            return state
    }
}
export const setRecoveryPasswordSuccessAC = (recoverPassSucces: boolean) => ({
    type: 'RECOVERY_PASSWORD/SET_SUCCESS',
    recoverPassSucces
}) as const

export const recoverTC = (email: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    recoveryPasswordAPI.recoveryPassword(email)
        .then(res => {
            dispatch(setRecoveryPasswordSuccessAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            handleServerAppError(errorResponse, dispatch)
            dispatch(setAppStatusAC('failed'))
        })

}

type ActionType = ReturnType<typeof setRecoveryPasswordSuccessAC>
