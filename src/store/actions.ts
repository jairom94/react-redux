import { AxiosError } from "axios";
import type { AppThunk } from ".";
import { createAdvert, deleteAdvert, detailAdvert, getAdverts, getTags } from "../pages/adverts/service";
import type { Advert, Tag } from "../pages/adverts/types";
import type { Modal } from "../pages/adverts/partials/types";

//LOADED ADVERTS
type AdvertsLoadedPending = {
    type:'adverts/loaded/pending',
    payload:null
}
type AdvertsLoadedRejected = {
    type:'adverts/loaded/rejected';
    payload:Error;
}
type AdvertsLoadedFullFilled = {
    type:'adverts/loaded/fullfilled',
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
type AdvertsDeletedFullFilled = {
    type:'adverts/deleted/fullfilled',
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
type AdvertsCreatedFullFilled = {
    type:'adverts/created/fullfilled',
    payload:Advert;
}

//LOADED TAGS
type TagsLoadedPending = {
    type:'tags/loaded/pending',
    payload:null
}
type TagsLoadedRejected = {
    type:'tags/loaded/rejected';
    payload:Error;
}
type TagsLoadedFullFilled = {
    type:'tags/loaded/fullfilled',
    payload:Tag[]
}

//MODAL
type ModalShowFullFilled = {
    type:'modal/show/fullfilled',
    payload:Modal<Advert>;
}

type ModalCloseFullFilled = {
    type:'modal/close/fullfilled',
    // payload:Modal<Advert>;
}

//MODAL
export const modalShowFullFilled = (modal:Modal<Advert>):ModalShowFullFilled => {
    // console.log(modal);    
    return {
        type:"modal/show/fullfilled",
        payload:modal
    }
}
export const modalCloseFullFilled = ():ModalCloseFullFilled=> {
    // console.log(modal);    
    return {
        type:"modal/close/fullfilled",
        // payload:modal
    }
}





//LOADED TAGS
export const advertsLoadedPending = ():AdvertsLoadedPending => ({
    type: "adverts/loaded/pending",
    payload:null
})
export const advertsLoadedRejected = (error:Error):AdvertsLoadedRejected => ({
    type:"adverts/loaded/rejected",
    payload:error
})
export const advertsLoadedFullFilled = (adverts:Advert[]):AdvertsLoadedFullFilled => ({
    type:"adverts/loaded/fullfilled",
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
export const advertsDeletedFullFilled = (advertDeleted:Advert):AdvertsDeletedFullFilled => ({
    type:"adverts/deleted/fullfilled",
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
export const advertsCreatedFullFilled = (advert:Advert):AdvertsCreatedFullFilled => ({
    type:"adverts/created/fullfilled",
    payload:advert
})
type UiResetError = {
  type: "ui/reset-error";
};

//LOADED TAGS
export const tagsLoadedPending = ():TagsLoadedPending => ({
    type: "tags/loaded/pending",
    payload:null
})
export const tagsLoadedRejected = (error:Error):TagsLoadedRejected => ({
    type:"tags/loaded/rejected",
    payload:error
})
export const tagsLoadedFullFilled = (tags:Tag[]):TagsLoadedFullFilled => ({
    type:"tags/loaded/fullfilled",
    payload:tags
})

//LOADED TAGS ACTION
export function tagsLoaded():AppThunk<Promise<void>>{
    return async function (dispatch) {
        dispatch(tagsLoadedPending())
        try {
            const tags = await getTags()
            dispatch(tagsLoadedFullFilled(tags))
        } catch (error) {
            if(error instanceof AxiosError){
                dispatch(tagsLoadedRejected(error))
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
            dispatch(advertsLoadedFullFilled(adverts))
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
            dispatch(advertsCreatedFullFilled(advert))
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
            dispatch(advertsDeletedFullFilled(advert))
        } catch (error) {
            if(error instanceof AxiosError){
                dispatch(advertsDeletedRejected(error))
            }
            throw error
        }
    }
}

export const uiResetError = ():UiResetError => ({
    type:"ui/reset-error"
})

export type Actions = 
| AdvertsLoadedPending
| AdvertsLoadedRejected
| AdvertsLoadedFullFilled
| AdvertsCreatedPending
| AdvertsCreatedRejected
| AdvertsCreatedFullFilled
| AdvertsDeletedPending
| AdvertsDeletedRejected
| AdvertsDeletedFullFilled
| TagsLoadedPending
| TagsLoadedRejected
| TagsLoadedFullFilled
| ModalShowFullFilled
| ModalCloseFullFilled
| UiResetError