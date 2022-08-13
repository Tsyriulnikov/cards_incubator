import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ActionProfileType, profileReducer} from "../features/profile/profile-reducer";
import {AppActionsType, appReducer} from "./app-reducer";
import {signUpReducer} from "../features/singUp/signUp-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {ActionNewPassType, resetPasswordReducer} from "../features/newPassword/newPassword-reducer";
import {ActionRecPassType, passwordRecoverReducer} from "../features/recoveryPassword/recoveryPassword-reducer";
import {ActionsAuthType, authReducer} from "../features/singIn/auth-reducer";
import {ActionPacksType, packsReducer} from "../features/CardsPack/packsList/cardsPack-reducer";
import {ActionCardsType, cardsReducer} from "../features/CardsPack/cardsList/cards-reducer";
import {ActionModalType, modalReducer} from "../common/modal/modal-reducer";

export const rootReducer = combineReducers({
    profile: profileReducer,
    app: appReducer,
    registration: signUpReducer,
    auth: authReducer,
    recoveryPass: passwordRecoverReducer,
    newPass: resetPasswordReducer,
    // cardsPack: packsReducer,
    packs: packsReducer,
    cards: cardsReducer,
    modal: modalReducer
});

//Для DEVTools  Redux
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppRootActionsType
    >

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppRootActionsType = ActionsType
export type ActionsType = AppActionsType
    | ActionsAuthType
    | ActionPacksType
    | ActionCardsType
    | ActionRecPassType
    | ActionProfileType
    | ActionNewPassType
    | ActionModalType

// @ts-ignore
window.store = store;