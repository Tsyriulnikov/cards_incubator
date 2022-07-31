import {signUpApi} from "./api-signUp";
import {AppDispatch} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError} from "../../utils/error-utils";

const initialState = {
    isReg: false,
}

type InitialStateType = typeof initialState

export const signUpReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_NEW_USER":
            return {
                ...state, isReg: action.success
            }
        default:
            return state
    }
}

export const setNewUserAC = (success: boolean) => ({type: 'SET_NEW_USER', success} as const);

export const setNewUserTC = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'))
    signUpApi.registration(email, password)
        .then(response => {
            dispatch(setNewUserAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            handleServerAppError(errorResponse, dispatch)
            dispatch(setAppStatusAC('failed'))
        })

}
export type SetNewUserType = ReturnType<typeof setNewUserAC>;

type ActionType = SetNewUserType
