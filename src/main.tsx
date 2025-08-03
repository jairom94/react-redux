import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import "./components/ui/notification/notification.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
// import AuthProvider from "./pages/auth/auth-provider.tsx";
import storage from "./utils/storage.ts";
import { setAuthorizationHeader } from "./api/client.ts";
// import UserProvider from "./pages/auth/me/user-provider.tsx";
import { Provider } from "react-redux";
import configureStore from "./store/index.ts";
import ErrorBoundary from "./components/error/error-boundary.tsx";

const accessToken = storage.get('auth')
const username = storage.get('me') ?? ''
if (accessToken) {
  setAuthorizationHeader(accessToken)
}

const router = createBrowserRouter([{path:'*',element: <App />}])
const store = configureStore({auth:!!accessToken,session:username},router)

createRoot(document.getElementById("root")!).render(
  <StrictMode>  
    <ErrorBoundary>
      <Provider store={store}>      
      <RouterProvider router={router} />
      </Provider>
      </ErrorBoundary>  
  </StrictMode>,
);
