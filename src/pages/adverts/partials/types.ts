export type ModalType = 'delete' | 'update' | 'information'

export type Modal<data> = {
    type:ModalType | '';
    visible:boolean;
    data:data | null;
}

export type ModalWithHtml<data> = Modal<data> & {
    htmlDialog:HTMLDialogElement;
}