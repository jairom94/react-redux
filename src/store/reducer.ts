import type { Modal } from "../pages/adverts/partials/types";
import type { Advert, Tag } from "../pages/adverts/types"
import type { Actions } from "./actions";

export type State = {
    adverts: Advert[] | null;
    tags: Tag[] | null;
    ui: {
        pending: boolean;
        error: Error | null;
    };
    modal:Modal<Advert>
}

const defaultState: State = {  
  adverts: null,
  tags:null,
  ui: {
    pending: false,
    error: null,
  },
  modal:{
    data:null,
    type:'',
    visible:false
  }
};

export function tags(state=defaultState.tags,action:Actions):State["tags"] {
    switch (action.type) {
        //LOADED
        case "tags/loaded/pending":
            return null
        case "tags/loaded/rejected":
            return null
        case "tags/loaded/fullfilled":
            return action.payload            
        default:
            return state
    }
}

export function adverts(state=defaultState.adverts,action:Actions):State["adverts"]{
    switch (action.type) {
        //LOADED
        case "adverts/loaded/pending":
            return null
        case "adverts/loaded/rejected":            
            return null       
        case "adverts/loaded/fullfilled":
            return action.payload
        //CREATED
        case "adverts/created/pending":
            return state
        case "adverts/created/rejected":
            return state
        case "adverts/created/fullfilled":
            return [...(state ?? []),action.payload]
        //DELETE
        case "adverts/deleted/pending":
            return state
        case "adverts/deleted/rejected":
            return state
        case "adverts/deleted/fullfilled":
            return [...(state ?? []).filter(advert => advert.id !== action.payload.id)]
        default:
            return state;
    }
}

export function ui(state=defaultState.ui,action:Actions):State["ui"]{
    switch (action.type) {
        //LOADED TAGS UI
        case "tags/loaded/pending":
            return { pending: true,error:null }
        case "tags/loaded/rejected":
            return { pending:false,error:action.payload }
        case "tags/loaded/fullfilled":
            return { pending:false,error:null }
        //LOADED ADVERT UI
        case "adverts/loaded/pending":            
            return { pending:true,error:null }
        case "adverts/loaded/rejected":
            return { pending:false,error:action.payload}
        case "adverts/loaded/fullfilled":
            return {pending:false,error:null}                 
        //DELETE ADVERT UI
        case "adverts/deleted/pending":
            return {pending:true,error:null}
        case "adverts/deleted/rejected":
            return {pending:false,error:action.payload}
        case "adverts/deleted/fullfilled":
            return {pending:false,error:null}
        //CREATE ADVERT UI
        case "adverts/created/pending":
            return {pending:true,error:null}
        case "adverts/created/rejected":
            return {pending:false,error:action.payload}
        case "adverts/created/fullfilled":
            return {pending:false,error:null}
        case "ui/reset-error":
            return {...state,error:null}
        default:
            return state
    }
}

export function modal(state= defaultState.modal,action:Actions):State['modal']{
    switch (action.type) {
        case "modal/show/fullfilled": {
            const { data,type } = action.payload
            const response:Modal<Advert> = {
                data,type,visible:true
            }
            return response
        }
        case "modal/close/fullfilled":
            return { data:null,type:'',visible:false }
        default:
            return state;
    }
}