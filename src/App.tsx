import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/home.page";
import SignPage from "./pages/auth/signup-page";
import Layout from "./components/layout/layout";
import { lazy, Suspense } from "react";
import LoginLoader from "./components/ui/login-loader";
import AdvertsPage from "./pages/adverts/adverts-page";
import NewAdvertPage from "./pages/adverts/new-advert-page";
import AdvertPage from "./pages/adverts/advert-page";
import RequireAuth from "./pages/auth/require-auth";
// import LoginPage from "./pages/auth/login-page";
//package json dev concurrently \"npm:dev:vite\" \"npm:lint:watch\" \"npm:format:watch\"

const LoginPage = lazy(() => import("./pages/auth/login-page"));

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/adverts">
          <Route index element={
            <RequireAuth>
              <AdvertsPage />
            </RequireAuth>
            } />
          <Route path="new" element={
            <RequireAuth>
              <NewAdvertPage />
            </RequireAuth>
          } />
          <Route path=":advertId" element={
            <RequireAuth>
              <AdvertPage />
            </RequireAuth>
            } />
        </Route>
        
      </Route>
      <Route path="/signup" element={<SignPage />} />
      <Route
        path="/login"
        element={
          <Suspense fallback={<LoginLoader />}>
            <LoginPage />
          </Suspense>
        }
      />   
      <Route path="/not-found" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/not-found" />} />  
    </Routes>
  );
}

export default App;
