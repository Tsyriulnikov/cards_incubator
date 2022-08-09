import {ResponseProfileType, updateProfileType} from "./profile-reducer";
import {instance} from "../../common/instance/instance";

export const profileAPI= {
    logout() {
        return instance.delete('auth/me')
    },
    updateTitle({name,avatar}:updateProfileType) {
        return instance.put<ResponseProfileType, updateProfileType>('/auth/me', {name, avatar})
    }
};

