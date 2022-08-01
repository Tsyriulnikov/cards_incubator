import {
    PackResponseType,
    packsAPI,
    PacksQueryParamsType} from "../CardsPack/api-CardsPack";
import {Dispatch} from "redux";
import {authApi} from "../singIn/auth-api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../../app/store";
import {setProfileAC} from "../profile/profile-reducer";
// import {AppRootStateType} from "./store";


const initialState = {
    packsTableData: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 0
    },
    isFetching: false,
    options: {pageCount: 10} as PacksQueryParamsType
}

export const packsReducer = (state: PacksInitialStateType = initialState, action: ActionType): PacksInitialStateType => {
    switch (action.type) {
        case "GET-PACKS":
            return {...state, packsTableData: action.packsTableData}
        case "SET-OPTIONS":
            return {...state, options: {...state.options, ...action.options}}
        default:
            return state
    }
}

export const getPacksAC = (packsTableData: PackResponseType) => ({type: "GET-PACKS", packsTableData} as const)
export const setOptionsAC = (options: PacksQueryParamsType) => ({type: "SET-OPTIONS", options} as const)



export const getStartPacksTC = () => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
    const packsOptions = getState().packs.options
    authApi.me()
        .then(res => {
            dispatch(setProfileAC(res.data))
            // dispatch(setUserID(res.data._id))
            packsAPI.getPacks(packsOptions)
                .then(res => {
                    dispatch(getPacksAC(res.data))
                })
                .catch((e) => {
                })
        })
        .finally(() => {
            })
}
export const getPacksTC = (options?: PacksQueryParamsType) => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {

    if (options) {
        dispatch(setOptionsAC(options))
    }
    const packsOptions = getState().packs.options

    packsAPI.getPacks(packsOptions)
        .then(res => {
            dispatch(getPacksAC(res.data))
        })
        .catch((e) => {

        })
        .finally(() => {
        })
}

// export const addCardsPackTC = (addPackPayload: AddPackPayloadType): ThunkType => (dispatch) => {
//
//     packsAPI.addPack(addPackPayload)
//         .then(() => {
//             dispatch(getPacksTC())
//         })
//         .finally(() => {
//
//         })
// }
// export const deleteCardsPackTC = (idPack: string): ThunkType => (dispatch) => {
//     dispatch(isFetchingAC(true))
//     packsAPI.deletePack(idPack)
//         .then(() => {
//             dispatch(getPacksTC())
//         })
//         .finally(() => {
//             dispatch(isFetchingAC(false))
//         })
// }
// export const updateCardsPackTC = (updatePackPayload: updatePackPayloadType): ThunkType => (dispatch) => {
//
//     packsAPI.updatePack(updatePackPayload)
//         .then(() => {
//             dispatch(getPacksTC())
//         })
//         .finally(() => {
//
//         })
// }


// Types
export type SelectValueType = 5 | 10 | 25 | 50 | 100;


export type PacksInitialStateType = {
    packsTableData: PackResponseType
    options: PacksQueryParamsType
}

type ThunkType = ThunkAction<void, AppRootStateType, {}, ActionType>

type ActionType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof setOptionsAC>
    | ReturnType<typeof setProfileAC>
    // | ReturnType<typeof setUserID>