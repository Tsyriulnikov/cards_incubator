import {AxiosResponse} from "axios";
import {instance} from "../../../common/instance/instance";


export const cardsAPI = {
    getCards(options: CardsQueryParamsType) {
        return instance.get<CardsResponseType, AxiosResponse<CardsResponseType>>(`cards/card`, {params: options})
    },
    addCards(newCard: newCardsType) {
        return instance.post('cards/card', {card: newCard})
    },
    deleteCards(_id: string) {
        return instance.delete(`cards/card?id=${_id}`)
    },
    updateCards(updateCard: updateCardsType) {
        return instance.put('cards/card', {card: updateCard})
    },
    rate(grade: number, cardID: string){
        return instance.put('cards/grade', {grade: grade, card_id: cardID} )
    },
}

export type CardsType = {
    _id: string,
    cardsPack_id: string,
    user_id: string,
    answer: string,
    question: string,
    grade: number,
    shots: number,
    comments: string,
    type: string,
    rating: number,
    more_id: string,
    created: string,
    updated: string,
    __v: number,
    answerImg: string,
    answerVideo: string,
    questionImg: string,
    questionVideo: string
}

export type CardsResponseType = {
    cards: CardsType[]
    packUserId: string,
    page: number,
    pageCount: number,
    cardsTotalCount: number,
    minGrade: number,
    maxGrade: number,
    sortCards: string

}

export type CardsQueryParamsType = {
    cardsPack_id?: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    page?: number
    sortCards?: string
    pageCount?: number
}

export type newCardsType = {

        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string

}

export type updateCardsType = {
        _id: string
        question?: string
        answer?: string

}