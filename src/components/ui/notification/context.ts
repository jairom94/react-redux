import { createContext, useContext } from "react";
import type { PrevNotification } from "./types";

interface NotificationContextType{
    addNoti:(notification:PrevNotification)=>void;
}

export const NotificationContext = createContext<NotificationContextType | null>(null)

export function useNotification(){
    const context = useContext(NotificationContext)
    if(!context){
        throw new Error('useNotification must be used within NotificationProvider')        
    }
    return context
}