import { AxiosError } from "axios";
import type { AppThunk } from "..";
import type { Advert, FilterByAdverts } from "../../pages/adverts/types";
import { createAdvert, deleteAdvert, detailAdvert, getAdverts } from "../../pages/adverts/service";

//LOADED ADVERTS
type AdvertsLoadedPending = {
    type:'adverts/loaded/pending',
    payload:null
}
type AdvertsLoadedRejected = {
    type:'adverts/loaded/rejected';
    payload:Error;
}
type AdvertsLoadedFulFilled = {
    type:'adverts/loaded/fulfilled',
    payload:Advert[]
}

//DELETE ADVERT
type AdvertsDeletedPending = {
    type:'adverts/deleted/pending',
    payload:null
}
type AdvertsDeletedRejected = {
    type:'adverts/deleted/rejected';
    payload:Error;
}
type AdvertsDeletedFulFilled = {
    type:'adverts/deleted/fulfilled',
    payload:Advert;
}

//CREATE ADVERT
type AdvertsCreatedPending = {
    type:'adverts/created/pending',
    payload:null
}
type AdvertsCreatedRejected = {
    type:'adverts/created/rejected';
    payload:Error;
}
type AdvertsCreatedFulFilled = {
    type:'adverts/created/fulfilled',
    payload:Advert;
}

//LOADED ADVERT
type AdvertLoadedPending = {
    type:'advert/loaded/pending',
    payload:null    
}
type AdvertLoadedRejected = {
    type:'advert/loaded/rejected',
    payload:Error;
}
type AdvertLoadedFulFilled = {
    type:'advert/loaded/fulfilled',
    payload:Advert;
}

//FILTERS ADVERTS
type FiltersAdverts = {
    type:'adverts/filters/fulfilled';
    payload:FilterByAdverts;
}

type FiltersLoadedAdverts = {
    type:'adverts/filters/loaded/fulfilled';
    payload:Advert[];
}



//LOADED ADVERTS
export const advertsLoadedPending = ():AdvertsLoadedPending => ({
    type: "adverts/loaded/pending",
    payload:null
})
export const advertsLoadedRejected = (error:Error):AdvertsLoadedRejected => ({
    type:"adverts/loaded/rejected",
    payload:error
})
export const advertsLoadedFulFilled = (adverts:Advert[]):AdvertsLoadedFulFilled => ({
    type:"adverts/loaded/fulfilled",
    payload:adverts
})


//DELETE ADVERT
export const advertsDeletedPending = ():AdvertsDeletedPending => ({
    type: "adverts/deleted/pending",
    payload:null
})
export const advertsDeletedRejected = (error:Error):AdvertsDeletedRejected => ({
    type:"adverts/deleted/rejected",
    payload:error
})
export const advertsDeletedFulFilled = (advertDeleted:Advert):AdvertsDeletedFulFilled => ({
    type:"adverts/deleted/fulfilled",
    payload:advertDeleted
})

//CREATED ADVERT
export const advertsCreatedPending = ():AdvertsCreatedPending => ({
    type: "adverts/created/pending",
    payload:null
})
export const advertsCreatedRejected = (error:Error):AdvertsCreatedRejected => ({
    type:"adverts/created/rejected",
    payload:error
})
export const advertsCreatedFulFilled = (advert:Advert):AdvertsCreatedFulFilled => ({
    type:"adverts/created/fulfilled",
    payload:advert
})

//ADVERT LOADED
export const advertLoadedPending = ():AdvertLoadedPending => ({
    type: "advert/loaded/pending",
    payload:null
})
export const advertLoadedRejected = (error:Error):AdvertLoadedRejected => ({
    type:"advert/loaded/rejected",
    payload:error
})
export const advertLoadedFulFilled = (advert:Advert):AdvertLoadedFulFilled => ({
    type:"advert/loaded/fulfilled",
    payload:advert
})


//FILTER ADVERTS ACTION
export const filterAdverts = (filters:FilterByAdverts):FiltersAdverts =>({
    type:"adverts/filters/fulfilled",
    payload:filters
})


//LOADED ADVERT DETAIL ACTION
export function advertLoaded(advertId:string):AppThunk<Advert|null>{
    return function (dispatch,getState) {
        dispatch(advertLoadedPending())
        try {
            const advert = getState().adverts.find(a => a.id === advertId) ?? null
            dispatch(advertLoadedFulFilled(advert!))
            return advert
        } catch (error) {
            if(error instanceof AxiosError){
                dispatch(advertLoadedRejected(error))
            }
            throw error
        }
    }
}

//LOADED ADVERTS ACTION
export function advertsLoaded(filterByTag:string):AppThunk<Promise<void>>{
    return async function (dispatch) {
        dispatch(advertsLoadedPending())
        try {
            const adverts = await getAdverts(filterByTag)            
            dispatch(advertsLoadedFulFilled(adverts))
        } catch (error) {
            if(error instanceof AxiosError){
                dispatch(advertsLoadedRejected(error))
            }
            throw error
        }
    }
}

//CREATED ADVERT ACTION
export function advertsCreated(newAdvert:Advert):AppThunk<Promise<Advert>>{
    return async function (dispatch) {
        dispatch(advertsCreatedPending())
        try {
            const { id } = await createAdvert(newAdvert)
            const advert = await detailAdvert((id ?? '').toString())
            dispatch(advertsCreatedFulFilled(advert))
            return advert
        } catch (error) {
            if(error instanceof AxiosError){
                dispatch(advertsCreatedRejected(error))
            }
            throw error
        }
    }
}

//DELETED ADVERT ACTION
export function advertsDeletedOne(advertId:string):AppThunk<Promise<void>>{
    return async function (dispatch) {
        dispatch(advertsDeletedPending())
        try {
            const advert = await detailAdvert(advertId)                      
            await deleteAdvert(advertId)
            dispatch(advertsDeletedFulFilled(advert))
        } catch (error) {
            if(error instanceof AxiosError){
                dispatch(advertsDeletedRejected(error))
            }
            throw error
        }
    }
}







export type AdvertsActions = 
| AdvertsLoadedPending //Adverts Loaded
| AdvertsLoadedRejected
| AdvertsLoadedFulFilled 
| AdvertsCreatedPending //Adverts Created
| AdvertsCreatedRejected
| AdvertsCreatedFulFilled
| AdvertsDeletedPending //Adverts Deleted
| AdvertsDeletedRejected
| AdvertsDeletedFulFilled
| AdvertLoadedPending //Advert
| AdvertLoadedRejected
| AdvertLoadedFulFilled
| FiltersAdverts //Filter by adverts
| FiltersLoadedAdverts