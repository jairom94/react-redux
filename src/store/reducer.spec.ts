import { adverts, auth } from "./reducer"


describe("reducer auth",()=>{
    test("should return state when actions not controlled",()=>{
        // @ts-expect-error: just by test
        const result = auth(false,{
            type:"advert/loaded/fulfilled"
        })
        expect(result).toBe(false)
    })

    test("should return state false when actions -> 'auth/login/pending'",()=>{        
        const result = auth(undefined,{
            type:"auth/login/pending"
        })
        expect(result).toBe(false)
    })

    test("should return state false when actions -> 'auth/login/rejected'",()=>{        
        const result = auth(undefined,{
            type:"auth/login/rejected",
            payload: new Error('Ha ocurrido un error')
        })
        expect(result).toBe(false)
    })

    test("should return state true when actions -> 'auth/login/fulfilled'",()=>{        
        const result = auth(undefined,{
            type:"auth/login/fulfilled",            
        })
        expect(result).toBe(true)
    })
})

describe("reducer adverts",()=>{
    test("should return empty array when action -> 'adverts/loaded/pending'",()=>{
        const result = adverts(undefined,{
            type:"adverts/loaded/pending",
            payload:[]
        })
        expect(result).toHaveLength(0)
    })

    test("should return a adverts list action -> 'adverts/loaded/fulfilled'",()=>{
        const adverts_test = [{id:'1'},{id:'2'}]
        const result = adverts(undefined,{
            type:"adverts/loaded/fulfilled",
            // @ts-expect-error just by test
            payload:adverts_test
        })
        expect(result).toEqual(adverts_test)
    })
})