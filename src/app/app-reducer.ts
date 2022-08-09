import {authApi} from "../features/singIn/auth-api";
import {setIsLoggedInAC} from "../features/singIn/auth-reducer";
import {setProfileAC, SetProfileACType} from "../features/profile/profile-reducer";
import {AppThunk} from "./store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
};

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
};

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
};

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;

export const initTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'));
    try {
        const res = await authApi.me();
        dispatch(setProfileAC(res.data));
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC('succeeded'));
    } catch (error: any) {
        console.log(error);
        dispatch(setAppStatusAC('failed'));
    } finally {
        dispatch(setAppInitializedAC(true));
    }
};

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInitializedActionType
