import {setAppErrorAC, setAppErrorType, setAppStatusAC, setAppStatusType} from '../app/app-reducer';
import {Dispatch} from 'redux';

export const handleServerAppError = (data: any, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStatusAC('failed'))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
        dispatch(setAppStatusAC('failed'))
    }
}

export const handleServerNetworkError  = (dispatch:ErrorUtilsDispatchType, error: {message: string}) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error.message))
}


type ErrorUtilsDispatchType = Dispatch<setAppStatusType | setAppErrorType>