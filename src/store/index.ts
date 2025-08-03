import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as thunk from 'redux-thunk'
import type { Actions } from "./actions";
import * as reducers from './reducer'
import * as auth from '../pages/auth/service'
import * as adverts from '../pages/adverts/service'
import type { createBrowserRouter } from "react-router";


const rootReducer = combineReducers(reducers)

type Router = ReturnType<typeof createBrowserRouter>

type ExtraArgument = {
    api : {
        auth:typeof auth;
        adverts:typeof adverts;
    },
    router:Router
}

export default function configureStore(
    preloadedState:Partial<reducers.State>,
    router:Router
){
    const store = createStore(
        rootReducer,
        preloadedState as never,
        composeWithDevTools(
            applyMiddleware(
                thunk.withExtraArgument<reducers.State,Actions,ExtraArgument>({
                    api:{auth,adverts},
                    router
                }),
            )
        )
    )

    return store
}

export type AppStore = ReturnType<typeof configureStore>
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
// export type AppDispatch = AppStore["dispatch"];
export type AppDispatch = thunk.ThunkDispatch<RootState, ExtraArgument, Actions>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// useSelector conoce la forma del estado
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppThunk<ReturnType = void> = thunk.ThunkAction<
  ReturnType,
  RootState,
  ExtraArgument,
  Actions
>;