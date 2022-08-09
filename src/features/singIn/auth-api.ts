import {ResponseProfileType} from "../profile/profile-reducer";
import {instance} from "../../common/instance/instance";

export const authApi = {
    me() {
        return instance.post<ResponseProfileType>('auth/me')
    },
    login(data: LoginParamsType) {
        return instance.post<ResponseProfileType>('auth/login', data)
    }
};

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
};