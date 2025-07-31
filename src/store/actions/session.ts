import type { AppThunk } from "..";
import { userLogged } from "../../pages/auth/me/service";

//LOADED USER SESSION
type SessionLoadedFulFilled = {
    type:'session/loaded/fulfilled';
    payload:string;
}
type SessionLoadedRejected = {
    type:'session/loaded/rejected';
    payload:Error;
}

//CLOSED USER SESSION
type SessionClosedFulFilled = {
    type:'session/closed/fulfilled';    
}

//LOADED USER SESSION
export const sessionLoadedFulFilled = (user:string):SessionLoadedFulFilled => ({
    type:"session/loaded/fulfilled",
    payload:user 
})
export const sessionLoadedRejected = (error:Error):SessionLoadedRejected => ({
    type:"session/loaded/rejected",
    payload:error 
})

//CLOSE USER SESSION
export const sessionClosedFullFilled = ():SessionClosedFulFilled => ({
    type:"session/closed/fulfilled",    
})

//SESSION LOADED
export function sessionLoaded():AppThunk<Promise<void>> {
    return async function (dispatch) {
        // dispatch(authLoginPending())
        try {
            const user = await userLogged()
            // await LogIn(credentials)
            dispatch(sessionLoadedFulFilled(user.username))
        } catch (error) {
            if(error instanceof Error) {
                dispatch(sessionLoadedRejected(error))
            }
            throw error
        }
    }
}

export type SessionActions = 
| SessionLoadedRejected
| SessionLoadedFulFilled //Session user Loaded
| SessionClosedFulFilled //Session user closed