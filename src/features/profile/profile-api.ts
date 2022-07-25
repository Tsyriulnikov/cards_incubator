import axios from "axios";
import {ProfileType} from "./profile-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})



export const profileAPI= {
    me() {
        return instance.post<ProfileType>('auth/me', '')
    },
    login(data:LoginParamsType) {
        return instance.post<ProfileType>('auth/login', data)
    },
    logout() {
        return instance.delete('auth/me')
    },
    updateTitle(title:string) {
        return instance.put<ProfileType>('/auth/me', {title})
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}