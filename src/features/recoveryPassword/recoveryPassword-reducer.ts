import {recoveryPasswordAPI} from "./api-RecoveryPassword";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {AppDispatch} from "../../app/store";

const initialState = {
    recoverPassSucces: false,
};

type InitialStateType = typeof initialState;

export const passwordRecoverReducer = (state: InitialStateType = initialState, action: ActionRecPassType): InitialStateType => {
    switch (action.type) {
        case 'RECOVERY_PASSWORD/SET_SUCCESS':
            return {...state, recoverPassSucces: action.recoverPassSuccess}
        default:
            return state
    }
};
export const setRecoveryPasswordSuccessAC = (recoverPassSuccess: boolean) => ({
    type: 'RECOVERY_PASSWORD/SET_SUCCESS',
    recoverPassSuccess
})as const;

export const recoverTC = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await recoveryPasswordAPI.recoveryPassword(email)
        dispatch(setRecoveryPasswordSuccessAC(true))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
        handleServerAppError(errorResponse, dispatch)
        dispatch(setAppStatusAC('failed'))
    }
};

export type ActionRecPassType = ReturnType<typeof setRecoveryPasswordSuccessAC>
