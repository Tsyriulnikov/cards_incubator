import {signUpApi} from "./api-signUp";
import {AppDispatch} from "../../app/store";
import {isFetchingAC} from "../singIn/signIn-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    newUser: {},
    isReg:false,
    emailError: null as null | string,
    passwordError: null as null | string,

}

type newUserType = {
    email: string
    password: string
}

type InitialStateType = typeof initialState

export const signUpReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_NEW_USER": {
            return {
                ...state,
                newUser: action.payload, isReg: true
            }
        }
        case "SET-EMAIL-ERROR":
            return {
                ...state,
                emailError: action.error
            }
        case "SET-PASSWORD-ERROR":
            return {
                ...state,
                passwordError: action.error
            }
        default:
            return state
    }
}

export const setNewUserAC = (payload: InitialStateType) => ({type: 'SET_NEW_USER', payload} as const);
export const setEmailErrorAC = (error: string | null) => ({type: "SET-EMAIL-ERROR", error} as const);
export const setPasswordErrorAC = (error: string | null) => ({type: "SET-PASSWORD-ERROR", error} as const);
// export const setRegistrationAC = () => ({type: "SET-REGISTRATION"} as const);

export const setNewUserTC = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(isFetchingAC(true))
    signUpApi.registration(email, password)
        .then(response => {
            // console.log(response.data)
            dispatch(setNewUserAC(response.data))

        })
        .catch((error) => {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            // dispatch(setEmailErrorAC(error))
            console.log(errorResponse)
            handleServerAppError(errorResponse, dispatch)

            // handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(isFetchingAC(false))
        })
}

export type SetNewUserType = ReturnType<typeof setNewUserAC>;

type ActionType = SetNewUserType
    | ReturnType<typeof setEmailErrorAC>
    | ReturnType<typeof setPasswordErrorAC>
    // | ReturnType<typeof setRegistrationAC>;