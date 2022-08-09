import {AxiosResponse} from "axios";
import {instance} from "../../common/instance/instance";

export const packsAPI = {
    getPacks(packQueryParams: PacksQueryParamsType) {
        return instance.get<PackResponseType, AxiosResponse<PackResponseType>>('cards/pack', {params: packQueryParams})
    },
    addPack(addPackPayload: AddPackPayloadType) {
        return instance.post<AddPackPayloadType, AxiosResponse<{newCardsPack: CardPacksType,token: string, tokenDeathTime: Date}>>('cards/pack', {cardsPack: addPackPayload})
    },
    deletePack(idPack: string) {
        return instance.delete<AxiosResponse<{deletedCardsPack: CardPacksType, token: string, tokenDeathTime: Date}>>(`cards/pack?id=${idPack}`)
    },
    updatePack(updatePackPayload: UpdatePackPayloadType) {
        return instance.put<UpdatePackPayloadType, AxiosResponse<{updatedCardsPack: CardPacksType, token: string, tokenDeathTime: Date}>>('cards/pack', {cardsPack: updatePackPayload})
    }
};

export type CardPacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grate: number
    shots: number
    deckCover: string
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: string
};

export type PackResponseType = {
    cardPacks: Array<CardPacksType>
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
};

export type PacksQueryParamsType = {
    packName?: string
    pageCount?: number
    min?: number
    max?: number
    page?: number
    user_id?: string | null
    sortPacks?: string
};

export type AddPackPayloadType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
};

export type UpdatePackPayloadType = {
    _id: string
    name?: string
};
