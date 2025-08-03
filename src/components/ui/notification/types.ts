export type Icons = 'success' | 'info' | 'warning' | 'error'

export interface Notification {
    id:string;
    message :string;
    type: Icons;
    createdAt: number;
}

export type PrevNotification = Omit<Notification, "id" | "createdAt">