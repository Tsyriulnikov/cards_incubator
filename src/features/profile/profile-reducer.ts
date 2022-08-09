import {profileAPI} from "./profile-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {setIsLoggedInAC} from "../singIn/auth-reducer";
import {handleServerAppError} from "../../utils/error-utils";
import {AppThunk} from "../../app/store";

export type ResponseProfileType = {
    _id: string | null;
    email: string | null;
    name: string | null;
    avatar?: string | null;
    publicCardPacksCount: number | null;
    created: Date | null;
    updated: Date | null;
    isAdmin: boolean | null;
    verified: boolean | null;
    rememberMe: boolean | null;
    error?: string | null;
    __v: number | null;
    token?: string | null;
    tokenDeathTime?: number | null;
};

export type updateProfileType = {
    name: string |  null
    avatar: string | null | ArrayBuffer
};

const initialState: ResponseProfileType = {
    _id: null,
    email: null,
    name: null,
    avatar: null,
    publicCardPacksCount: null,
    created: null,
    updated: null,
    isAdmin: null,
    verified: null,
    rememberMe: null,
    error: null,
    __v: null,
    token: null,
    tokenDeathTime: null,
};

export const profileReducer = (state: ResponseProfileType = initialState, action: ActionProfileType ):ResponseProfileType => {
    switch (action.type){
        case 'PROFILE':
            return action.profile
        case 'PROFILE-NAME-UPDATE':
            return {...state, name: action.payload.name}
        case 'PROFILE-AVATAR-UPDATE':
            // @ts-ignore
            return {...state, avatar: action.payload.avatar}
        default:
            return state
    }
};

export const setProfileAC = (profile:ResponseProfileType) => {return {type: 'PROFILE', profile} as const};
export const updateProfileTitleAC = ({name, avatar}:updateProfileType) => {
    return {
        type: 'PROFILE-NAME-UPDATE',
        payload: {
            name,
            avatar
        }
    } as const
};
export const updateProfileAvatarAC = ({name, avatar}:updateProfileType) => {
    return {
        type: 'PROFILE-AVATAR-UPDATE',
        payload: {
            name,
            avatar
        }
    } as const
};

export type UpdateProfileTitleACType = ReturnType<typeof updateProfileTitleAC>;
export type SetProfileACType = ReturnType<typeof setProfileAC>;
export type UpdateProfileAvatarACType = ReturnType<typeof updateProfileAvatarAC>;

export const logoutTC = (): AppThunk => async dispatch => {
        dispatch(setAppStatusAC('loading'))
        try {
            let res = await profileAPI.logout()
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } catch(error: any) {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            handleServerAppError(errorResponse, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
};

export const updateProfileTitleTC = ({name, avatar}:updateProfileType): AppThunk => {
    return async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            let res = await profileAPI.updateTitle({name, avatar})
            dispatch(updateProfileTitleAC({name, avatar}))
            dispatch(setAppStatusAC('succeeded'))
        } catch(error: any) {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            handleServerAppError(errorResponse, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    }
};

export const updateProfileAvatarTC = ({name, avatar}:updateProfileType): AppThunk => {
    return async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            let res = await profileAPI.updateTitle({name, avatar})
            dispatch(updateProfileAvatarAC({name, avatar}))
            dispatch(setAppStatusAC('succeeded'))
        } catch(error:any) {
            const errorResponse = error.response ? error.response.data.error : (error.message + ", more details in the console")
            handleServerAppError(errorResponse, dispatch)
            dispatch(setAppStatusAC('failed'))
        }
    }
};

export type ActionProfileType = SetProfileACType | UpdateProfileTitleACType | UpdateProfileAvatarACType;