import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";
import ErrorBoundary from "../error/error-boundary";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-dvh">      
        <Header />
        <main className="flex-1 flex">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />      
    </div>
  );
};

export default Layout;
