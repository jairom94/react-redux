// import { AxiosError } from "axios";
// import type { AppThunk } from ".";
// import { getTags } from "../pages/adverts/service";
// import type {  FilterByAdverts } from "../pages/adverts/types";
// import type { Modal } from "../pages/adverts/partials/types";
// import type { Login } from "../pages/auth/types";
// import { LogIn, logOut } from "../pages/auth/service";
// import { userLogged } from "../pages/auth/me/service";


//LOGIN AUTH
// type AuthLoginPending = {
//     type:'auth/login/pending';
// }
// type AuthLoginReject = {
//     type:'auth/login/reject';
//     payload:Error;
// }
// type AuthLoginFullFilled = {
//     type:'auth/login/fullfilled';
// }

//LOGIN LOGOUT
// type AuthLogoutFullFilled = {
//     type:'auth/logout/fullfilled';
// }
// type AuthLogoutRejected = {
//     type:'auth/logout/rejected';
//     payload:Error;
// }


// //LOADED USER SESSION
// type SessionLoadedFullFilled = {
//     type:'session/loaded/fullfilled';
//     payload:string;
// }
// type SessionLoadedRejected = {
//     type:'session/loaded/rejected';
//     payload:Error;
// }

// //CLOSED USER SESSION
// type SessionClosedFullFilled = {
//     type:'session/closed/fullfilled';    
// }


// //LOADED ADVERTS
// type AdvertsLoadedPending = {
//     type:'adverts/loaded/pending',
//     payload:null
// }
// type AdvertsLoadedRejected = {
//     type:'adverts/loaded/rejected';
//     payload:Error;
// }
// type AdvertsLoadedFullFilled = {
//     type:'adverts/loaded/fullfilled',
//     payload:Advert[]
// }

// //DELETE ADVERT
// type AdvertsDeletedPending = {
//     type:'adverts/deleted/pending',
//     payload:null
// }
// type AdvertsDeletedRejected = {
//     type:'adverts/deleted/rejected';
//     payload:Error;
// }
// type AdvertsDeletedFullFilled = {
//     type:'adverts/deleted/fullfilled',
//     payload:Advert;
// }

// //CREATE ADVERT
// type AdvertsCreatedPending = {
//     type:'adverts/created/pending',
//     payload:null
// }
// type AdvertsCreatedRejected = {
//     type:'adverts/created/rejected';
//     payload:Error;
// }
// type AdvertsCreatedFullFilled = {
//     type:'adverts/created/fullfilled',
//     payload:Advert;
// }

// //LOADED ADVERT
// type AdvertLoadedPending = {
//     type:'advert/loaded/pending',
//     payload:null    
// }
// type AdvertLoadedRejected = {
//     type:'advert/loaded/rejected',
//     payload:Error;
// }
// type AdvertLoadedFullFilled = {
//     type:'advert/loaded/fullfilled',
//     payload:Advert;
// }

// //LOADED TAGS
// type TagsLoadedPending = {
//     type:'tags/loaded/pending',
//     payload:null
// }
// type TagsLoadedRejected = {
//     type:'tags/loaded/rejected';
//     payload:Error;
// }
// type TagsLoadedFullFilled = {
//     type:'tags/loaded/fullfilled',
//     payload:Tag[]
// }

// //MODAL
// type ModalShowFullFilled = {
//     type:'modal/show/fullfilled',
//     payload:Modal<Advert>;
// }

// type ModalCloseFullFilled = {
//     type:'modal/close/fullfilled',
//     // payload:Modal<Advert>;
// }

// //FILTERS ADVERTS
// type FiltersAdverts = {
//     type:'adverts/filters';
//     payload:FilterByAdverts;
// }
// type FiltersAdvertsUpdate = {
//     type:'adverts/filters/update';
//     payload:FilterByAdverts;
// }

//LOGIN AUTH
// export const authLoginPending = ():AuthLoginPending => ({
//     type:"auth/login/pending"
// })

// export const authLoginRejected = (error:Error):AuthLoginReject => ({
//     type:"auth/login/reject",
//     payload:error
// })

// export const authLoginFullFilled = ():AuthLoginFullFilled => ({
//     type:"auth/login/fullfilled"
// })

//LOGOUT AUTH
// export const authLogoutFullFilled = ():AuthLogoutFullFilled => ({
//     type:"auth/logout/fullfilled"
// })
// export const authLogoutRejected = (error:Error):AuthLogoutRejected => ({
//     type:"auth/logout/rejected",
//     payload:error
// })


// //LOADED USER SESSION
// export const sessionLoadedFullFilled = (user:string):SessionLoadedFullFilled => ({
//     type:"session/loaded/fullfilled",
//     payload:user 
// })
// export const sessionLoadedRejected = (error:Error):SessionLoadedRejected => ({
//     type:"session/loaded/rejected",
//     payload:error 
// })

// //CLOSE USER SESSION
// export const sessionClosedFullFilled = ():SessionClosedFullFilled => ({
//     type:"session/closed/fullfilled",    
// })



// //MODAL
// export const modalShowFullFilled = (modal:Modal<Advert>):ModalShowFullFilled => {
//     // console.log(modal);    
//     return {
//         type:"modal/show/fullfilled",
//         payload:modal
//     }
// }
// export const modalCloseFullFilled = ():ModalCloseFullFilled=> {    
//     return {
//         type:"modal/close/fullfilled",
//         // payload:modal
//     }
// }



// //LOADED TAGS
// export const advertsLoadedPending = ():AdvertsLoadedPending => ({
//     type: "adverts/loaded/pending",
//     payload:null
// })
// export const advertsLoadedRejected = (error:Error):AdvertsLoadedRejected => ({
//     type:"adverts/loaded/rejected",
//     payload:error
// })
// export const advertsLoadedFullFilled = (adverts:Advert[]):AdvertsLoadedFullFilled => ({
//     type:"adverts/loaded/fullfilled",
//     payload:adverts
// })

// //DELETE ADVERT
// export const advertsDeletedPending = ():AdvertsDeletedPending => ({
//     type: "adverts/deleted/pending",
//     payload:null
// })
// export const advertsDeletedRejected = (error:Error):AdvertsDeletedRejected => ({
//     type:"adverts/deleted/rejected",
//     payload:error
// })
// export const advertsDeletedFullFilled = (advertDeleted:Advert):AdvertsDeletedFullFilled => ({
//     type:"adverts/deleted/fullfilled",
//     payload:advertDeleted
// })

// //CREATED ADVERT
// export const advertsCreatedPending = ():AdvertsCreatedPending => ({
//     type: "adverts/created/pending",
//     payload:null
// })
// export const advertsCreatedRejected = (error:Error):AdvertsCreatedRejected => ({
//     type:"adverts/created/rejected",
//     payload:error
// })
// export const advertsCreatedFullFilled = (advert:Advert):AdvertsCreatedFullFilled => ({
//     type:"adverts/created/fullfilled",
//     payload:advert
// })

// //ADVERT LOADED
// export const advertLoadedPending = ():AdvertLoadedPending => ({
//     type: "advert/loaded/pending",
//     payload:null
// })
// export const advertLoadedRejected = (error:Error):AdvertLoadedRejected => ({
//     type:"advert/loaded/rejected",
//     payload:error
// })
// export const advertLoadedFullFilled = (advert:Advert):AdvertLoadedFullFilled => ({
//     type:"advert/loaded/fullfilled",
//     payload:advert
// })

// type UiResetError = {
//   type: "ui/reset-error";
// };

// LOADED TAGS
// export const tagsLoadedPending = ():TagsLoadedPending => ({
//     type: "tags/loaded/pending",
//     payload:null
// })
// export const tagsLoadedRejected = (error:Error):TagsLoadedRejected => ({
//     type:"tags/loaded/rejected",
//     payload:error
// })
// export const tagsLoadedFullFilled = (tags:Tag[]):TagsLoadedFullFilled => ({
//     type:"tags/loaded/fullfilled",
//     payload:tags
// })

// //UI RESET ACTION
// export const uiResetError = ():UiResetError => ({
//     type:"ui/reset-error"
// })

// //FITLER ADVERTS ACTION
// export const filterAdverts = (filters:FilterByAdverts):FiltersAdverts =>({
//     type:"adverts/filters",
//     payload:filters
// })

// export const filterAdvertsUpdate = (filters:FilterByAdverts):FiltersAdvertsUpdate =>({
//     type:"adverts/filters/update",
//     payload:filters
// })



/**
 * THUNKS TO ACTIONS
 */

//LOGIN ACTION
// export function authLogin(credentials:Login):AppThunk<Promise<void>> {
//     return async function (dispatch) {
//         dispatch(authLoginPending())
//         try {
//             await LogIn(credentials)
//             dispatch(authLoginFullFilled())
//         } catch (error) {
//             if(error instanceof Error) {
//                 dispatch(authLoginRejected(error))
//             }
//             throw error
//         }
//     }
// }

// //SESSION LOADED
// export function sessionLoaded():AppThunk<Promise<void>> {
//     return async function (dispatch) {
//         // dispatch(authLoginPending())
//         try {
//             const user = await userLogged()
//             // await LogIn(credentials)
//             dispatch(sessionLoadedFullFilled(user.username))
//         } catch (error) {
//             if(error instanceof Error) {
//                 dispatch(sessionLoadedRejected(error))
//             }
//             throw error
//         }
//     }
// }

//LOGOUT ACTION
// export function authLogout():AppThunk<Promise<void>> {
//     return async function (dispatch) {
//         // dispatch(authLogoutPending())
//         try {            
//             await logOut();
//             dispatch(authLogoutFullFilled());
//         } catch (error) {
//             if(error instanceof Error) {
//                 dispatch(authLogoutRejected(error))
//             }
//             throw error
//         }
//     }
// }

// //LOADED ADVERT DETAIL ACTION
// export function advertLoaded(advertId:string):AppThunk<Advert|null>{
//     return function (dispatch,getState) {
//         dispatch(advertLoadedPending())
//         try {
//             const advert = getState().adverts?.find(a => a.id === advertId) ?? null
//             dispatch(advertLoadedFullFilled(advert!))
//             return advert
//         } catch (error) {
//             if(error instanceof AxiosError){
//                 dispatch(advertLoadedRejected(error))
//             }
//             throw error
//         }
//     }
// }


// //LOADED TAGS ACTION
// export function tagsLoaded():AppThunk<Promise<void>>{
//     return async function (dispatch) {
//         dispatch(tagsLoadedPending())
//         try {
//             const tags = await getTags()
//             dispatch(tagsLoadedFullFilled(tags))
//         } catch (error) {
//             if(error instanceof AxiosError){
//                 dispatch(tagsLoadedRejected(error))
//             }
//             throw error
//         }
//     }
// }



// //LOADED ADVERTS ACTION
// export function advertsLoaded(filterByTag:string):AppThunk<Promise<void>>{
//     return async function (dispatch) {
//         dispatch(advertsLoadedPending())
//         try {
//             const adverts = await getAdverts(filterByTag)            
//             dispatch(advertsLoadedFullFilled(adverts))
//         } catch (error) {
//             if(error instanceof AxiosError){
//                 dispatch(advertsLoadedRejected(error))
//             }
//             throw error
//         }
//     }
// }

// //CREATED ADVERT ACTION
// export function advertsCreated(newAdvert:Advert):AppThunk<Promise<Advert>>{
//     return async function (dispatch) {
//         dispatch(advertsCreatedPending())
//         try {
//             const { id } = await createAdvert(newAdvert)
//             const advert = await detailAdvert((id ?? '').toString())
//             dispatch(advertsCreatedFullFilled(advert))
//             return advert
//         } catch (error) {
//             if(error instanceof AxiosError){
//                 dispatch(advertsCreatedRejected(error))
//             }
//             throw error
//         }
//     }
// }

// //DELETED ADVERT ACTION
// export function advertsDeletedOne(advertId:string):AppThunk<Promise<void>>{
//     return async function (dispatch) {
//         dispatch(advertsDeletedPending())
//         try {
//             const advert = await detailAdvert(advertId)                      
//             await deleteAdvert(advertId)
//             dispatch(advertsDeletedFullFilled(advert))
//         } catch (error) {
//             if(error instanceof AxiosError){
//                 dispatch(advertsDeletedRejected(error))
//             }
//             throw error
//         }
//     }
// }

// export type Actions = 
// | AuthLoginPending //Auth Login
// | AuthLoginReject
// | AuthLoginFullFilled
// | AuthLogoutRejected
// | AuthLogoutFullFilled //Auth logout 
// | SessionLoadedRejected
// | SessionLoadedFullFilled //Session user Loaded
// | SessionClosedFullFilled //Session user closed
// | FiltersAdverts //Filter by adverts
// | AdvertsLoadedPending //Adverts Loaded
// | AdvertsLoadedRejected
// | AdvertsLoadedFullFilled 
// | AdvertsCreatedPending //Adverts Created
// | AdvertsCreatedRejected
// | AdvertsCreatedFullFilled
// | AdvertsDeletedPending //Adverts Deleted
// | AdvertsDeletedRejected
// | AdvertsDeletedFullFilled
// | TagsLoadedPending //Tags Loaded
// | TagsLoadedRejected
// | TagsLoadedFullFilled
// | ModalShowFullFilled //Modal
// | ModalCloseFullFilled
// | AdvertLoadedPending //Advert
// | AdvertLoadedRejected
// | AdvertLoadedFullFilled
// | UiResetError //Ui