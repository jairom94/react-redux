import { useEffect, useState } from "react";
import type { Icons } from "./types";


interface NotificationProps {
    message: string; 
    type: Icons; 
    onDelete:()=>void; 
    createdAt:number;  
}
const Notification = ({ message, type, onDelete,createdAt }: NotificationProps) => { 
  const [progress, setProgress] = useState(0);
  const duration = 5000
  useEffect(() => {
    const intervalMs = 10;

    const interval = setInterval(() => {
      const elapsed = Date.now() - createdAt;
      const percentage = Math.min((elapsed / duration) * 100,100);
      setProgress(percentage);

      if (elapsed >= duration) {
        clearInterval(interval);
        onDelete();
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [createdAt, onDelete]); 
  
  const icons = {
  success: "M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  info: "M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  warning: "M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  error: "m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
}; 
  return (
    <li className={`notification-item ${type}`}>        
      <div className="notification-content">
        <div className="notification-icon">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d={icons[type]}
            />
          </svg>
        </div>
        <div className="notification-text">{message}</div>
      </div>
      <button 
      onClick={onDelete}
      className="notification-icon notification-close">
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18 17.94 6M18 18 6.06 6"
          ></path>
        </svg>
      </button>
      <div
        className="notification-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </li>
  );
};

export default Notification;
