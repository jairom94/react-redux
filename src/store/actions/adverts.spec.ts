import { advertsLoaded, advertsLoadedPending, advertsLoadedRejected } from "./adverts";


describe('actions  adverts/loaded',()=>{
    test('should return -> adverts/loaded/pending',()=>{
        const result = advertsLoadedPending()
        expect(result.type).toBe('adverts/loaded/pending')
        expect(result.payload).toHaveLength(0)
    })

    test('should return -> adverts/loaded/rejected',()=>{
        const error = new Error('error')
        const result = advertsLoadedRejected(error)
        expect(result.type).toBe('adverts/loaded/rejected')
        expect(result.payload).toEqual(error)
    })
})



describe('thunk advertsLoaded',()=>{
    afterEach(()=>{
        dispatch.mockClear();
        // router.navigate.mockClear();
    })
    
    const thunk = advertsLoaded('')
    const dispatch = vi.fn()
    const api = {
        adverts: {
            getAdverts:vi.fn()
        }
    }        

    const fakeAdverts = [{id:'1'},{id:'2'}]
    test('when advertsLoaded fulfilled',async()=>{
        api.adverts.getAdverts = vi.fn().mockResolvedValue(fakeAdverts)        
        const getState = vi.fn(() => ({
            adverts: { loaded: false },
        }));
        // @ts-expect-error: getSate mock
        await thunk(dispatch,getState,{api})   
        expect(api.adverts.getAdverts).toHaveBeenCalled()     
        expect(dispatch).toHaveBeenNthCalledWith(1,{
            type:"adverts/loaded/pending",
            payload:[]            
        })
        expect(dispatch).toHaveBeenNthCalledWith(2,{
            type:"adverts/loaded/fulfilled",
            payload:fakeAdverts
        })
    })

    test('when advertsLoaded rejected',async()=>{
        const error = new Error('ERR_CONNECTION_REFUSED')
        api.adverts.getAdverts = vi.fn().mockRejectedValue(error)
        
        const getState = vi.fn(() => ({
            adverts: { loaded: false },
        }));
        
        await expect(() =>
      // @ts-expect-error: getState mock
            thunk(dispatch, getState, { api }),
        ).rejects.toThrowError(error);
                
        expect(api.adverts.getAdverts).toHaveBeenCalled()     
        expect(dispatch).toHaveBeenNthCalledWith(1,{
            type:"adverts/loaded/pending",
            payload:[]            
        })
        expect(dispatch).toHaveBeenNthCalledWith(2,{
            type:"adverts/loaded/rejected",
            payload:error
        })
    })

    test('when advertsLoaded, loaded is true',async()=>{
        api.adverts.getAdverts = vi.fn().mockResolvedValue(fakeAdverts)
        const getState = vi.fn(() => ({
            adverts: { loaded: true,data:fakeAdverts },
        }));

        // @ts-expect-error: getSate mock
        await thunk(dispatch,getState,{api})   
        expect(dispatch).not.toHaveBeenCalled()    
        
    })
})