import type { RootState } from ".";
import type { Advert, Tag } from "../pages/adverts/types";


export const getAuth = (state:RootState) => state.auth

const EMPTY_ARRAY: Advert[] = [];
export const getAdvertsRedux = (state:RootState) => state.adverts ?? EMPTY_ARRAY

export const getAdvertRedux = (state:RootState) => state.advert

const EMPTY_ARRAY_TAG: Tag[] = []
export const getTagsRedux = (state:RootState) => state.tags ?? EMPTY_ARRAY_TAG

export const getModalShowed = (state:RootState) => state.modal //?? {data:null,visible:false,type:'update'}

export const getUi = (state:RootState) => state.ui