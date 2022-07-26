import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://back-from-friday-project.herokuapp.com/2.0/'
})


export const signUpApi = {

    registration(email: string, password: string) {
        return instance.post('auth/register', {email, password})

    }
}




// export const getTimeAPI = (time: string) => {
//     return instance.get(`ping?frontTime=${time}`)
// }


//types
// export type nameType = {}