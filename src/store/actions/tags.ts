import { AxiosError } from "axios";
import type { AppThunk } from "..";
import type { Tag } from "../../pages/adverts/types";
import { getTags } from "../../pages/adverts/service";

//LOADED TAGS
type TagsLoadedPending = {
    type:'tags/loaded/pending',
    payload:null
}
type TagsLoadedRejected = {
    type:'tags/loaded/rejected';
    payload:Error;
}
type TagsLoadedFulFilled = {
    type:'tags/loaded/fulfilled',
    payload:Tag[]
}

//LOADED TAGS
export const tagsLoadedPending = ():TagsLoadedPending => ({
    type: "tags/loaded/pending",
    payload:null
})
export const tagsLoadedRejected = (error:Error):TagsLoadedRejected => ({
    type:"tags/loaded/rejected",
    payload:error
})
export const tagsLoadedFulFilled = (tags:Tag[]):TagsLoadedFulFilled => ({
    type:"tags/loaded/fulfilled",
    payload:tags
})

//LOADED TAGS ACTION
export function tagsLoaded():AppThunk<Promise<void>>{
    return async function (dispatch) {
        dispatch(tagsLoadedPending())
        try {
            const tags = await getTags()
            dispatch(tagsLoadedFulFilled(tags))
        } catch (error) {
            if(error instanceof AxiosError){
                dispatch(tagsLoadedRejected(error))
            }
            throw error
        }
    }
}

export type TagsActions = 
| TagsLoadedPending //Tags Loaded
| TagsLoadedRejected
| TagsLoadedFulFilled