import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL:'https://neko-back.herokuapp.com/2.0',
})

const from = "test-front-admin <ai73a@yandex.by>";
const message = `<div style="background-color: lime; padding: 15px">
password recovery link: <a href='http://localhost:3000/set-new-password/$token$'>link</a></div>`

export const recoveryPasswordAPI = {
    recoveryPassword(email: string) {
        return instance.post('auth/forgot', {email, from, message})
    }
}
