import type { Modal } from "../pages/adverts/partials/types";
import type { Advert, FilterByAdverts, Tag } from "../pages/adverts/types";
// import type { UserResponse } from "../pages/auth/types";
import type { Actions } from './actions';

export type State = {
  auth: boolean;
  session:string;
  advertSelected: Advert | null;
  adverts: Advert[];
  tags: Tag[];
  filters:FilterByAdverts

  ui: {
    pending: boolean;
    error: Error | null;
  };
  modal: Modal<Advert>;
};

const defaultState: State = {
  auth: false,
  session:'',
  advertSelected: null,
  adverts: [],
  tags: [],
  filters:{
    name:'',
    // sale:null,
    tags:[],
    price:[0,0],
    range:[0,0]
  },
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

export function auth(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login/pending":
      return false;
    case "auth/login/reject":
      return false;
    case "auth/login/fulfilled":
      return true;
    case "auth/logout/rejected":
      return false;
    case "auth/logout/fulfilled":
      return false;
    default:
      return state;
  }
}

export function session(state=defaultState.session,action:Actions):State['session'] {
  switch (action.type) {
    //LOADED
    case "session/loaded/fulfilled":
      return action.payload
    case "session/loaded/rejected":
      return ''
    case "session/closed/fulfilled":
      return ''
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
      return [];
    case "tags/loaded/rejected":
      return [];
    case "tags/loaded/fulfilled":
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
      return [];
    case "adverts/loaded/rejected":
      return [];
    case "adverts/loaded/fulfilled":
      return action.payload;
    //CREATED
    case "adverts/created/pending":
      return state;
    case "adverts/created/rejected":
      return state;
    case "adverts/created/fulfilled":
      return [...state, action.payload];
    //DELETE
    case "adverts/deleted/pending":
      return state;
    case "adverts/deleted/rejected":
      return state;
    case "adverts/deleted/fulfilled":
      return [
        ...(state ?? []).filter((advert) => advert.id !== action.payload.id),
      ];
    default:
      return state;
  }
}

export function filters(state=defaultState.filters,action:Actions):State['filters']{
  switch (action.type) {
    case "adverts/filters/fulfilled":
      return action.payload       
    default:
      return state
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
    case "advert/loaded/fulfilled":
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
    case "tags/loaded/fulfilled":
      return { pending: false, error: null };
    //LOADED ADVERT UI
    case "adverts/loaded/pending":
      return { pending: true, error: null };
    case "adverts/loaded/rejected":
      return { pending: false, error: action.payload };
    case "adverts/loaded/fulfilled":
      return { pending: false, error: null };
    //DELETE ADVERT UI
    case "adverts/deleted/pending":
      return { pending: true, error: null };
    case "adverts/deleted/rejected":
      return { pending: false, error: action.payload };
    case "adverts/deleted/fulfilled":
      return { pending: false, error: null };
    //CREATE ADVERT UI
    case "adverts/created/pending":
      return { pending: true, error: null };
    case "adverts/created/rejected":
      return { pending: false, error: action.payload };
    case "adverts/created/fulfilled":
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
    case "modal/show/fulfilled": {
      const { data, type, visible } = action.payload;
      const response: Modal<Advert> = {
        data,
        type,
        visible,
      };
      return response;
    }
    case "modal/close/fulfilled":
      return { data: null, type: "", visible: false };
    default:
      return state;
  }
}
