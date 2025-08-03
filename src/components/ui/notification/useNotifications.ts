import { useCallback, useRef, useState } from "react";
import type { Notification, PrevNotification } from "./types";


function useNotifications(){
    const [notifications,setNotifications] = useState<Notification[]>([])
      const timeoutMapRef = useRef<Map<string,number>>(new Map());

    const removeNoti = useCallback((notificationId:string)=>{
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        const timeoutId = timeoutMapRef.current.get(notificationId)
        if(timeoutId){
            clearTimeout(timeoutId)
            timeoutMapRef.current.delete(notificationId)
        }
    },[])

    const addNoti = useCallback((newNoti:PrevNotification) => {
        const fullNotification:Notification = {
            ...newNoti,
            id: crypto.randomUUID(),
            createdAt: Date.now()
        }
        setNotifications([...notifications,fullNotification])

        const timeoutId = setTimeout(() => {
            removeNoti(fullNotification.id)
        }, 5000);

        timeoutMapRef.current.set(fullNotification.id,timeoutId)
    },[removeNoti,notifications])
    

    const handleNotifications = useCallback((currentNotifications: Notification[]) => {
        setNotifications(currentNotifications);
    }, []);

    return { notifications,addNoti,handleNotifications }
}

export default useNotifications