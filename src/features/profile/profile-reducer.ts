import {Dispatch} from "redux";
import {LoginParamsType, profileAPI} from "./profile-api";
import {setIsLoggedInAC} from "../singIn/auth-reducer";
import {setAppStatusAC} from "../../app/app-reducer";


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
    token: string | null;
    tokenDeathTime: number | null;
}


export type updateProfileType = {
    name: string | null
    avatar: string | null | undefined
}

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
    tokenDeathTime: null
};



export const profileReducer = (state: ResponseProfileType = initialState, action: setProfileACType | updateProfileTitleACType ):ResponseProfileType => {
    switch (action.type){
        case 'PROFILE':
            return action.profile
        case 'PROFILE-NAME-UPDATE':
            return {...state, name: action.payload.name}
        default:
            return state
    }

}

export type setProfileACType = ReturnType<typeof setProfileAC>
export const setProfileAC = (profile:ResponseProfileType) => {
    return {
        type: 'PROFILE',
        profile
    } as const
}
export type updateProfileTitleACType = ReturnType<typeof updateProfileTitleAC>
export const updateProfileTitleAC = ({name, avatar}:updateProfileType) => {
    return {
        type: 'PROFILE-NAME-UPDATE',
        payload: {
            name,
            avatar
        }
    } as const
}

export const logoutTC = () => {
    return (dispatch:Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        profileAPI.logout()
            .then((res) => {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}
export const updateProfileTitleTC = ({name, avatar}:updateProfileType) => {
    return (dispatch:Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        profileAPI.updateTitle({name, avatar})
            .then((res) => {
                dispatch(updateProfileTitleAC({name, avatar}))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}