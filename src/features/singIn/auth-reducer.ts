import {authApi, LoginParamsType} from "./auth-api";
import {Dispatch} from "redux";
import {setProfileAC} from "../profile/profile-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";

const initialState = {
    isLoggedIn: false
};

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
};

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'SET-IS-LOGGED-IN', value} as const);




export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then((res) => {
            dispatch(setProfileAC(res.data))
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            //Ошибки из ответа
            handleServerAppError(errorResponse, dispatch)

        })

        .finally(() => {

        })
};

type ActionsType = ReturnType<typeof setIsLoggedInAC>