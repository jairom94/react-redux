import type { AppThunk } from "..";
// import { LogIn, logOut } from "../../pages/auth/service";
import type { Login, User } from "../../pages/auth/types";
import { sessionLoaded } from "./session";

//LOGIN AUTH
type AuthLoginPending = {
    type:'auth/login/pending';
}
type AuthLoginReject = {
    type:'auth/login/rejected';
    payload:Error;
}
type AuthLoginFulFilled = {
    type:'auth/login/fulfilled';
}

//LOGIN LOGOUT
type AuthLogoutFulFilled = {
    type:'auth/logout/fulfilled';
}
type AuthLogoutRejected = {
    type:'auth/logout/rejected';
    payload:Error;
}

//SIGNUP AUTH
type AuthSignupPending = {
    type:'auth/signup/pending';
}
type AuthSignupReject = {
    type:'auth/signup/rejected';
    payload:Error;
}
type AuthSignupFulFilled = {
    type:'auth/signup/fulfilled';
}

//LOGIN AUTH
export const authLoginPending = ():AuthLoginPending => ({
    type:"auth/login/pending"
})

export const authLoginRejected = (error:Error):AuthLoginReject => ({
    type:"auth/login/rejected",
    payload:error
})

export const authLoginFulFilled = ():AuthLoginFulFilled => ({
    type:"auth/login/fulfilled"
})

//LOGOUT AUTH
export const authLogoutFulFilled = ():AuthLogoutFulFilled => ({
    type:"auth/logout/fulfilled"
})
export const authLogoutRejected = (error:Error):AuthLogoutRejected => ({
    type:"auth/logout/rejected",
    payload:error
})

//SIGNUP AUTH
export const authSignupPending = ():AuthSignupPending => ({
    type:"auth/signup/pending"
})  
export const authSignupRejected = (error:Error):AuthSignupReject => ({
    type:"auth/signup/rejected",
    payload:error
})
export const authSignupFulFilled = ():AuthSignupFulFilled => ({
    type:"auth/signup/fulfilled"
})

//LOGIN ACTION
export function authLogin(credentials:Login):AppThunk<Promise<void>> {
    return async function (dispatch,_getState,{ api,router }) {        
        dispatch(authLoginPending())
        try {

            await api.auth.LogIn(credentials)
            dispatch(authLoginFulFilled())
            await dispatch(sessionLoaded())
            const to = router.state.location.state?.from ?? "/";
            router.navigate(to, { replace: true });

        } catch (error) {
            if(error instanceof Error) {
                dispatch(authLoginRejected(error))
            }
            throw error
        }
    }
}

//LOGOUT ACTION
export function authLogout():AppThunk<Promise<void>> {
    return async function (dispatch,_getState,{api}) {
        // dispatch(authLogoutPending())
        try {            
            await api.auth.logOut();
            dispatch(authLogoutFulFilled());
        } catch (error) {
            if(error instanceof Error) {
                dispatch(authLogoutRejected(error))
            }
            throw error
        }
    }
}

//SIGNUP ACTION
export function authSignup(newUser:User):AppThunk<Promise<void>> {
    return async function (dispatch,_getState,{ api }) {
        dispatch(authSignupPending())
        try {
            await api.auth.singUp(newUser)
            dispatch(authSignupFulFilled())
            const { email, password } = newUser
            dispatch(authLogin({ email,password,remember:true }))
        } catch (error) {
            if(error instanceof Error) {
                dispatch(authSignupRejected(error))
            }
            throw error
        }
    }
}

export type AuthActions =
| AuthLoginPending //Auth Login
| AuthLoginReject
| AuthLoginFulFilled
| AuthLogoutRejected
| AuthLogoutFulFilled //Auth logout 
| AuthSignupPending //Auth Signup
| AuthSignupReject
| AuthSignupFulFilled //Auth Signup

