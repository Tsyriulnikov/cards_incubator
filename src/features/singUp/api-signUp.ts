import {ResponseProfileType} from "../profile/profile-reducer";
import {instance} from "../../common/instance/instance";

export const signUpApi = {

    registration(email: string, password: string) {
        return instance.post<ResponseProfileType>('auth/register', {email, password})
    }
};

