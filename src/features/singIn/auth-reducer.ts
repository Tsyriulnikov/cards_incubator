import {authApi, LoginParamsType} from "./auth-api";
import {Dispatch} from "redux";
import {setProfileAC} from "../profile/profile-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {AppThunk} from "../../app/store";

const initialState = {
    isLoggedIn: false
};

type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState, action: ActionsAuthType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
};

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'SET-IS-LOGGED-IN', value} as const);

export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        let res = await authApi.login(data);
        dispatch(setProfileAC(res.data));
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC('succeeded'));
    } catch(error: any) {
        const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console");
        handleServerAppError(errorResponse, dispatch);
        dispatch(setAppStatusAC('failed'));
    }
};

export type ActionsAuthType = ReturnType<typeof setIsLoggedInAC>;