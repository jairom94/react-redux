import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";
import ErrorBoundary from "../error/error-boundary";
import { createPortal } from "react-dom";
import ModalUpdate from "../../pages/adverts/partials/modal-update";
import { getModalShowed } from "../../store/selectors";
import { useAppSelector } from "../../store";
import { useEffect, useRef } from "react";

const Layout = () => {
  const { data,visible } = useAppSelector(getModalShowed)
  const refModalUpdate = useRef<HTMLDialogElement>(null)
  useEffect(()=>{
    if(visible){
      refModalUpdate.current?.showModal()
    }
  },[visible])
  console.log(data);
  
  return (
    <div className="flex flex-col min-h-dvh">      
        <Header />
        <main className="flex-1 flex">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
        { data && createPortal(
        <ModalUpdate advert={data} ref={refModalUpdate} />,
        document.body) }      
    </div>
  );
};

export default Layout;
