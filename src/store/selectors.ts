import type { RootState } from ".";



export const getAuth = (state:RootState) => state.auth

export const getSessionUser = (state:RootState) => state.session

export const getAdvertsRedux = (state:RootState) => state.adverts.data

export const isLoadedAdverts = (state:RootState) => state.adverts.loaded

export const filtersRedux = (state:RootState) => state.filters

export const getAdvertRedux = (advertId?:string) => {
    return function (state:RootState) {
        return state.adverts.data.find(advert => advert.id === advertId) ?? null
    }
}

export const getTagsRedux = (state:RootState) => state.tags

export const getModalShowed = (state:RootState) => state.modal //?? {data:null,visible:false,type:'update'}

export const getUi = (state:RootState) => state.ui

