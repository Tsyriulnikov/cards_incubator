import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../app/app-reducer'
import {Dispatch} from 'redux'

export const handleServerAppError =(errorResponse: string , dispatch: Dispatch<SetAppErrorActionType  | SetAppStatusActionType>) => {
    if (errorResponse) {
        dispatch(setAppErrorAC(errorResponse))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
