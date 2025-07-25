import type { Modal } from "../pages/adverts/partials/types";
import type { Advert, Tag } from "../pages/adverts/types";
import type { Actions } from "./actions";

export type State = {
  auth: boolean;
  advertSelected:Advert | null;
  adverts: Advert[] | null;
  tags: Tag[] | null;
  ui: {
    pending: boolean;
    error: Error | null;
  };
  modal: Modal<Advert>;
};

const defaultState: State = {
  auth: false,
  advertSelected:null,
  adverts: null,
  tags: null,
  ui: {
    pending: false,
    error: null,
  },
  modal: {
    data: null,
    type: "",
    visible: false,
  },
};

export function auth(state=defaultState.auth,action:Actions):State['auth']{
    switch (action.type) {
        case "auth/login/pending":
            return false
        case "auth/login/reject":
            return false
        case "auth/login/fullfilled":
            return true
        default:
            return state
    }
}


export function tags(
  state = defaultState.tags,
  action: Actions,
): State["tags"] {
  switch (action.type) {
    //LOADED
    case "tags/loaded/pending":
      return null;
    case "tags/loaded/rejected":
      return null;
    case "tags/loaded/fullfilled":
      return action.payload;
    default:
      return state;
  }
}

export function adverts(
  state = defaultState.adverts,
  action: Actions,
): State["adverts"] {
  switch (action.type) {
    //LOADED
    case "adverts/loaded/pending":
      return null;
    case "adverts/loaded/rejected":
      return null;
    case "adverts/loaded/fullfilled":
      return action.payload;
    //CREATED
    case "adverts/created/pending":
      return state;
    case "adverts/created/rejected":
      return state;
    case "adverts/created/fullfilled":
      return [...(state ?? []), action.payload];
    //DELETE
    case "adverts/deleted/pending":
      return state;
    case "adverts/deleted/rejected":
      return state;
    case "adverts/deleted/fullfilled":
      return [
        ...(state ?? []).filter((advert) => advert.id !== action.payload.id),
      ];
    default:
      return state;
  }
}


export function advert(
  state = defaultState.advertSelected,
  action: Actions,
): State["advertSelected"] {
  switch (action.type) {
    //LOADED
    case "advert/loaded/pending":
      return null;
    case "advert/loaded/rejected":
      return null;
    case "advert/loaded/fullfilled":
      return action.payload;  
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action: Actions): State["ui"] {
  switch (action.type) {
    //LOADED TAGS UI
    case "tags/loaded/pending":
      return { pending: true, error: null };
    case "tags/loaded/rejected":
      return { pending: false, error: action.payload };
    case "tags/loaded/fullfilled":
      return { pending: false, error: null };
    //LOADED ADVERT UI
    case "adverts/loaded/pending":
      return { pending: true, error: null };
    case "adverts/loaded/rejected":
      return { pending: false, error: action.payload };
    case "adverts/loaded/fullfilled":
      return { pending: false, error: null };
    //DELETE ADVERT UI
    case "adverts/deleted/pending":
      return { pending: true, error: null };
    case "adverts/deleted/rejected":
      return { pending: false, error: action.payload };
    case "adverts/deleted/fullfilled":
      return { pending: false, error: null };
    //CREATE ADVERT UI
    case "adverts/created/pending":
      return { pending: true, error: null };
    case "adverts/created/rejected":
      return { pending: false, error: action.payload };
    case "adverts/created/fullfilled":
      return { pending: false, error: null };
    case "ui/reset-error":
      return { ...state, error: null };
    default:
      return state;
  }
}

export function modal(
  state = defaultState.modal,
  action: Actions,
): State["modal"] {
  switch (action.type) {
    case "modal/show/fullfilled": {
      const { data, type, visible } = action.payload;
      const response: Modal<Advert> = {
        data,
        type,
        visible,
      };
      return response;
    }
    case "modal/close/fullfilled":
      return { data: null, type: "", visible: false };
    default:
      return state;
  }
}
