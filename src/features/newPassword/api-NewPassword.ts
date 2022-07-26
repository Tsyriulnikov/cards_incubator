import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL:'https://neko-back.herokuapp.com/2.0',
})

export const newPasswordAPI = {
    newPassword(password: string, resetPasswordToken: string | undefined)  {
        return instance.post('auth/set-new-password', {password, resetPasswordToken})
    }
}
