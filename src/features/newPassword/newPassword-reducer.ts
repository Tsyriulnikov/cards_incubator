import {newPasswordAPI} from "./api-NewPassword";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {AppDispatch, AppThunk} from "../../app/store";

const initialState = {
    newPassSuccess: false,
};

type InitialStateType = typeof initialState;

export const resetPasswordReducer = (state: InitialStateType = initialState, action: ActionNewPassType): InitialStateType => {
    switch (action.type) {
        case 'NEW_PASSWORD/SET_SUCCESS': {
            return {...state, newPassSuccess: action.newPassSuccess}
        }
        default:
            return state
    }
};

export const setNewPasswordSuccessAC = (newPassSuccess: boolean) => ({
    type: 'NEW_PASSWORD/SET_SUCCESS',
    newPassSuccess
}) as const

export const newPasswordTC = (password: string, resetPasswordToken: string | undefined): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = newPasswordAPI.newPassword(password, resetPasswordToken)
        dispatch(setNewPasswordSuccessAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch(error: any) {
        const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
        handleServerAppError(errorResponse, dispatch)
        dispatch(setAppStatusAC('failed'))
    }
};

export type ActionNewPassType = ReturnType<typeof setNewPasswordSuccessAC>
