import {instance} from "../../common/instance/instance";

export const newPasswordAPI = {
    newPassword(password: string, resetPasswordToken: string | undefined)  {
        return instance.post('auth/set-new-password', {password, resetPasswordToken})
    }
};
