import { createPortal } from 'react-dom';
import NotificationComponent from './notification';
import type { Notification } from './types';


interface NotficationsProps {
    notifications:Notification[];
    handleNotifications:(notifications:Notification[])=>void;
}
const Notfications = ({notifications,handleNotifications}:NotficationsProps) => {
    const portalNotifications = document.querySelector('#notifications-root')
    function handleClickDelete(notificationId:string){
        const deleteNotis = notifications.filter(n => n.id !== notificationId)
        handleNotifications(deleteNotis)
    }
    return createPortal(
    <ul className='notification-container'>
        { notifications.map(notification => (
            <NotificationComponent 
            key={notification.id} 
            onDelete={()=>handleClickDelete(notification.id)} 
            message={notification.message} 
            createdAt={notification.createdAt}
            type={notification.type} 
            />
        )) }
    </ul>
    ,portalNotifications as HTMLDivElement)
};

export default Notfications;
