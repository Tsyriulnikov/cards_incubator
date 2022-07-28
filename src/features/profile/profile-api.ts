import axios from "axios";
import {ResponseProfileType, updateProfileType} from "./profile-reducer";


export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})



export const profileAPI= {
    /*me() {
        return instance.post<ResponseType>('auth/me', '')
    },*/
    /*login(data:LoginParamsType) {
        return instance.post<ResponseType>('auth/login', data)
    },*/
    logout() {
        return instance.delete('auth/me')
    },
    updateTitle({name,avatar}:updateProfileType) {
        return instance.put<ResponseProfileType>('/auth/me', {name, avatar})
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}