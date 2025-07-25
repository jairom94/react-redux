import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";
import ErrorBoundary from "../error/error-boundary";
import { createPortal } from "react-dom";
import ModalUpdate from "../../pages/adverts/partials/modal-update";
import { getModalShowed } from "../../store/selectors";
import { useAppSelector } from "../../store";
import { useEffect, useRef } from "react";
import ModalDelete from "../../pages/adverts/partials/modal-delete";

const Layout = () => {
  const { data,visible,type } = useAppSelector(getModalShowed)
  const refModal = useRef<HTMLDialogElement>(null)
  useEffect(()=>{
    if(visible){
      refModal.current?.showModal()
    }
  },[visible])
  // console.log(data);
  
  return (
    <div className="flex flex-col min-h-dvh">      
        <Header />
        <main className="flex-1 flex">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
        <Footer />
        { type === 'update' && data && createPortal(
        <ModalUpdate advert={data} ref={refModal} />,
        document.body) }   
        { type === 'delete' &&  data && createPortal(
          <ModalDelete advert={data} ref={refModal} />,
          document.body)        
        }   
    </div>
  );
};

export default Layout;
