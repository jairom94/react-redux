import type { Login } from "../../pages/auth/types"
import { authLogin } from "./auth"

describe('thunk authLogin',()=>{
    afterEach(()=>{
        dispatch.mockClear();
        router.navigate.mockClear();
    })
    const credentials:Login = {
        email:'jairo@example.com',
        password:'1234',
        remember:false
    }
    const thunk = authLogin(credentials)
    const dispatch = vi.fn()
    const api = {
        auth: {
            LogIn:vi.fn()
        }
    }
    const from = '/from'
    const router = {
        state: {location:{state:from}},
        navigate:vi.fn()
    }
    test('when login resolve',async()=>{
        api.auth.LogIn = vi.fn().mockResolvedValue(undefined)

        // @ts-expect-error: just a test no need getState
        await thunk(dispatch,undefined,{api,router})
        
        expect(dispatch).toHaveBeenNthCalledWith(1,{
            type:"auth/login/pending"
        })
        expect(dispatch).toHaveBeenNthCalledWith(2,{
            type:"auth/login/fulfilled"
        })
    })
    test('when login rejected',async()=>{
        const error = new Error('unauthorized')
        api.auth.LogIn = vi.fn().mockRejectedValue(error)

        await expect(()=>
            // @ts-expect-error: just a test no need getStore
            thunk(dispatch,undefined,{api,router})
        ).rejects.toThrowError(error)

        expect(dispatch).toHaveBeenNthCalledWith(1,{
            type:"auth/login/pending"
        })
        expect(dispatch).toHaveBeenNthCalledWith(2,{
            type:"auth/login/rejected",
            payload:error
        })
    })
})


