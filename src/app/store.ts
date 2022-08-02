import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {profileReducer} from "../features/profile/profile-reducer";
import {appReducer} from "./app-reducer";
import {signUpReducer} from "../features/singUp/signUp-reducer";
import thunkMiddleware from 'redux-thunk'
import {resetPasswordReducer} from "../features/newPassword/newPassword-reducer";
import {passwordRecoverReducer} from "../features/recoveryPassword/recoveryPassword-reducer";
import {authReducer} from "../features/singIn/auth-reducer";
import {packsReducer} from "../features/CardsPack/cardsPack-reducer";




export const rootReducer = combineReducers({
    profile: profileReducer,
    app: appReducer,
    registration:signUpReducer,
    auth: authReducer,
    recoveryPass:passwordRecoverReducer,
    newPass:resetPasswordReducer,
    cardsPack:packsReducer,
    packs: packsReducer,
})

//Для DEVTools  Redux
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//





// export const store = createStore(rootReducer)

export const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunkMiddleware)));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;