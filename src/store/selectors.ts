import type { RootState } from ".";
import type { Advert } from "../pages/adverts/types";

const EMPTY_ARRAY: Advert[] = [];
export const getAdvertsRedux = (state:RootState) => state.adverts ?? EMPTY_ARRAY

export const getUi = (state:RootState) => state.ui