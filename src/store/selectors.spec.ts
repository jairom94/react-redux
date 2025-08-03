import type { RootState } from "."
import type { Advert } from "../pages/adverts/types"
import { getAdvertRedux } from "./selectors"

describe('getAdvert',()=>{
    // @ts-expect-error just a test
    const advert:Advert = {
        id:'uno'
    }
    // @ts-expect-error just a test
    const state:RootState = {
        adverts:{
            loaded:false,
            data:[advert]
        }
    }
    test('should return a advert',()=>{        
        const result = getAdvertRedux('uno')(state)
        expect(result).toEqual(advert)
    })
})