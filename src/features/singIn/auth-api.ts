import axios from 'axios'
import {ResponseProfileType} from "../profile/profile-reducer";


export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const authAPI = {
    me() {
        return instance.post<ResponseProfileType>('auth/me')
    },

    login(data: LoginParamsType) {
        return instance.post('auth/login', data)
    }
};


export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
}
