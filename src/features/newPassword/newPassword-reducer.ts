import {newPasswordAPI} from "./api-NewPassword";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {AppDispatch} from "../../app/store";


const initialState = {
    newPassSucces: false,
}
type InitialStateType = typeof initialState

export const resetPasswordReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'NEW_PASSWORD/SET_SUCCESS': {
            return {...state, newPassSucces: action.newPassSucces}
        }
        default:
            return state
    }
}
export const setNewPasswordSuccessAC = (newPassSucces: boolean) => ({
    type: 'NEW_PASSWORD/SET_SUCCESS',
    newPassSucces
}) as const
export const newPasswordTC = (password: string, resetPasswordToken: string | undefined) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    newPasswordAPI.newPassword(password, resetPasswordToken)
        .then(res => {
            // console.log(res.data)
            dispatch(setNewPasswordSuccessAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            handleServerAppError(errorResponse, dispatch)
            dispatch(setAppStatusAC('failed'))
        })
}

type ActionType = ReturnType<typeof setNewPasswordSuccessAC>
