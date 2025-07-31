import type { RootState } from ".";



export const getAuth = (state:RootState) => state.auth

export const getSessionUser = (state:RootState) => state.session

export const getAdvertsRedux = (state:RootState) => state.adverts

export const filtersRedux = (state:RootState) => state.filters

export const getAdvertRedux = (state:RootState) => state.advert

export const getTagsRedux = (state:RootState) => state.tags

export const getModalShowed = (state:RootState) => state.modal //?? {data:null,visible:false,type:'update'}

export const getUi = (state:RootState) => state.ui

