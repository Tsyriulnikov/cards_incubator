import {signUpApi} from "./api-signUp";
import {AppDispatch} from "../../app/store";
import {isFetchingAC} from "../singIn/signIn-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    newUser: {},
    isReg: false,
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
        default:
            return state
    }
}

export const setNewUserAC = (payload: InitialStateType) => ({type: 'SET_NEW_USER', payload} as const);
export const setRegistrationAC = () => ({type: "SET-REGISTRATION"} as const);

export const setNewUserTC = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(isFetchingAC(true))
    signUpApi.registration(email, password)
        .then(response => {
            // console.log(response.data)
            dispatch(setNewUserAC(response.data))

        })
        .catch((error) => {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            //Ошибки из ответа
            handleServerAppError(errorResponse, dispatch)
            //Серверные ошибки
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(isFetchingAC(false))
        })
}

export type SetNewUserType = ReturnType<typeof setNewUserAC>;

type ActionType = SetNewUserType
     | ReturnType<typeof setRegistrationAC>;