import type { AdvertsActions } from "./adverts";
import type { AuthActions } from "./auth";
import type { ModalActions } from "./modal";
import type { SessionActions } from "./session";
import type { TagsActions } from "./tags";
import type { UiActions } from "./ui";

export * from './auth';
export * from './session';
export * from './adverts';
export * from './modal';
export * from './ui';
export * from './tags';



export type Actions = 
| AuthActions
| SessionActions
| AdvertsActions
| UiActions
| TagsActions
| ModalActions