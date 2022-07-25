import {Dispatch} from "redux";
import {LoginParamsType, profileAPI} from "./profile-api";
// import {setIsLoggedInAC} from "../../app/app-reducer";


export type ProfileType = {
    _id: string,
    email: string,
    rememberMe: boolean,
    isAdmin: boolean,
    name: string,
    verified: false,
    publicCardPacksCount: number,
    created: string,
    updated: string,
    __v: number,
    token: string,
    tokenDeathTime: number
    avatar: string
    isLoggedIn: boolean
}


const initialState: any = {}

export const profileReducer = (state: ProfileType = initialState, action: setProfileACType | updateProfileTitleACType ):ProfileType => {
    switch (action.type){
        case 'PROFILE':
            return action.profile
        case 'PROFILE-NAME-UPDATE':
            return {...state, name: action.title}
        default:
            return state
    }

}

//_________________________ACTION___________________________________


export type setProfileACType = ReturnType<typeof setProfileAC>
export const setProfileAC = (profile:ProfileType) => {
    return {
        type: 'PROFILE',
        profile
    } as const
}
export type updateProfileTitleACType = ReturnType<typeof updateProfileTitleAC>
export const updateProfileTitleAC = (title:string) => {
    return {
        type: 'PROFILE-NAME-UPDATE',
        title
    } as const
}

/*export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}*/


//__________________THUNK______________________________

/*export const initTC = () => {
    return (dispatch:Dispatch) => {
        profileAPI.me()
            .then((res) => {
                dispatch(setIsLoggedInAC(true))
            })

    }
}*/

export const loginTC = (data: LoginParamsType) => {
    return (dispatch:Dispatch) => {
        profileAPI.login(data)
            .then((res) => {
                // dispatch(setIsLoggedInAC(true))
                dispatch(setProfileAC(res.data))
            })
    }
}
export const logoutTC = () => {
    return (dispatch:Dispatch) => {
        profileAPI.logout()
            .then((res) => {
                // dispatch(setIsLoggedInAC(false))
            })
    }
}
export const updateProfileTitleTC = (title:string) => {
    return (dispatch:Dispatch) => {
        profileAPI.updateTitle(title)
            .then((res) => {
                dispatch(updateProfileTitleAC(res.data.name))
            })
    }
}