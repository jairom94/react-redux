import { type ComponentProps, type ReactNode } from 'react';


interface ModalProps extends ComponentProps<'dialog'> {    
    children:ReactNode;
}
const Modal = ({children,...props}:ModalProps) => {
    return (
        <dialog className={`
        backdrop:backdrop-blur-xl backdrop:bg-gradient-to-b 
        backdrop:from-white/20 backdrop:to-transparent
        backdrop:pointer-events-none m-auto rounded-md
        shadow-2xl
        `} {...props}>
            {children}
        </dialog>
    );
};

export default Modal;
