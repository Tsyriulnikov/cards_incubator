import {
    AddPackPayloadType,
    PackResponseType,
    packsAPI,
    PacksQueryParamsType, UpdatePackPayloadType
} from "../CardsPack/api-CardsPack";
import {AppRootStateType, AppThunk} from "../../app/store";
import {handleServerAppError} from "../../utils/error-utils";
import {cardStatusAC} from "./cardsList/cards-reducer";
import {setAppStatusAC} from "../../app/app-reducer";

const initialState = {
    packsTableData: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 100,
        minCardsCount: 0,
        page: 1,
        pageCount: 5
    },
    isFetching: false,
    params: {pageCount: 10, min: 0, max: 100,packName:''} as PacksQueryParamsType
};

export const packsReducer = (state: PacksInitialStateType = initialState, action: ActionPacksType): PacksInitialStateType => {
    console.log('вызов reducer')
    switch (action.type) {
        case 'CARDS-PACK/GET-PACKS':
            return {...state, packsTableData: action.packsTableData}
        case 'CARDS-PACK/SET-PARAMS':
            return {...state, params: {...state.params, ...action.params}}
        default:
            return state
    }
};

export const getPacksAC = (packsTableData: PackResponseType) => ({
    type: 'CARDS-PACK/GET-PACKS',
    packsTableData
} as const);
export const setParamsAC = (params: PacksQueryParamsType) => ({type: 'CARDS-PACK/SET-PARAMS', params} as const)

export const getPacksTC = (params?: PacksQueryParamsType): AppThunk => {

    return async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        if (params) {
            dispatch(setParamsAC(params))
        };
        const packsOptions = getState().packs.params;
        try {
            const res = await packsAPI.getPacks(packsOptions);
            dispatch(getPacksAC(res.data));
            dispatch(cardStatusAC('none'));
            dispatch(setAppStatusAC('succeeded'));
        } catch (error: any) {
            handleServerAppError(error.response.data.error, dispatch);
            dispatch(setAppStatusAC('failed'));
        }
    }
};

export const addCardsPackTC = (addPackPayload: AddPackPayloadType): AppThunk => {
    return async (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await packsAPI.addPack(addPackPayload);
            dispatch(getPacksTC());;
            dispatch(setAppStatusAC('succeeded'));
        } catch (error: any) {
            handleServerAppError(error.response.data.error, dispatch);
            dispatch(setAppStatusAC('failed'));
        }
    }
};

export const deleteCardsPackTC = (idPack: string): AppThunk => {
    return async (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await packsAPI.deletePack(idPack);
            dispatch(getPacksTC());
            dispatch(setAppStatusAC('succeeded'));
        } catch (error: any) {
            handleServerAppError(error.response.data.error, dispatch);
            dispatch(setAppStatusAC('failed'));
        }
    }
};

export const updateCardsPackTC = (updatePackPayload: UpdatePackPayloadType): AppThunk => {
    return async (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        try {
            const res = await packsAPI.updatePack(updatePackPayload);
            dispatch(getPacksTC());
            dispatch(setAppStatusAC('succeeded'));
        } catch (error: any) {
            handleServerAppError(error.response.data.error, dispatch);
            dispatch(setAppStatusAC('failed'));
        }
    }
};

export type PacksInitialStateType = {
    packsTableData: PackResponseType
    isFetching: boolean
    params: PacksQueryParamsType
};

export type ActionPacksType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof setParamsAC>

