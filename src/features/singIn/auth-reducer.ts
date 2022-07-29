import {authAPI, LoginParamsType} from "./auth-api";
import {Dispatch} from "redux";
import {profileAPI} from "../profile/profile-api";
import {ResponseProfileType, setProfileAC, updateProfileType} from "../profile/profile-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";

export type profileType = {
    isLoggedIn: boolean,
    user: {
        avatar: string|null| undefined,
        name: string|null,
        email: string|null,
    },
}



const initialState = {
    isLoggedIn: false,
    user: {
        avatar: '',
        name: '',
        email: '',
    },
};

// type InitialStateType = typeof initialState

export const authReducer = (state: profileType = initialState, action: ActionsType): profileType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
};

export const setIsLoggedInAC = (value: boolean) => ({type: 'SET-IS-LOGGED-IN', value} as const);


export const initTC = () => {
    return (dispatch:Dispatch) => {
        authAPI.me()
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
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
}

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            dispatch(setProfileAC(res.data))
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
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
};








type ActionsType = ReturnType<typeof setIsLoggedInAC>
