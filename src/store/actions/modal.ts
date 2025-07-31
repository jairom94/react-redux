import type { Modal } from "../../pages/adverts/partials/types";
import type { Advert } from "../../pages/adverts/types";

//MODAL
type ModalShowFulFilled = {
    type:'modal/show/fulfilled',
    payload:Modal<Advert>;
}

type ModalCloseFulFilled = {
    type:'modal/close/fulfilled',
    // payload:Modal<Advert>;
}


//MODAL
export const modalShowFullFilled = (modal:Modal<Advert>):ModalShowFulFilled => {
    // console.log(modal);    
    return {
        type:"modal/show/fulfilled",
        payload:modal
    }
}
export const modalCloseFullFilled = ():ModalCloseFulFilled=> {    
    return {
        type:"modal/close/fulfilled",
        // payload:modal
    }
}

export type ModalActions = 
| ModalShowFulFilled //Modal
| ModalCloseFulFilled