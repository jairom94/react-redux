import { createContext, useContext } from "react";

export const RadioGroupContext = createContext<{
    sale?:boolean;
    value?:string;
    name:string;
    onChange:(nameSelected:string)=>void;
}>({
    // sale:false,
    name:'',
    value:'',
    onChange:()=>{},
})

export function useRadioGroup() {
    const radioGroupValue = useContext(RadioGroupContext)
    return radioGroupValue
}

export const CheckGroupContext = createContext<{
    name:string;
    selectsItem:string[];
    onSelect:(value:string)=>void;
    onUnSelect:(value:string)=>void;
    clearSelects:()=>void;    
}>({
    name:'',
    selectsItem:[],
    onSelect:()=>{},
    onUnSelect:()=>{},
    clearSelects:()=>{},    
})

export function useCheckGroup() {
    const checkGroupValue = useContext(CheckGroupContext)
    return checkGroupValue
}