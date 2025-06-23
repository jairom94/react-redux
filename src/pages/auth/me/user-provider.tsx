import { useState, type ReactNode } from 'react';
import type { UserResponse } from '../types';
import { userLogged } from './service';
import { UserContext } from './context';


interface UserProviderProps {
    children:ReactNode
}
const UserProvider = ({children}:UserProviderProps) => {
    const [user,setUser] = useState<UserResponse|null>(null)
    async function handleUserLogged(){
        const user_logged =  await userLogged()
        // console.log(user_logged);
        
        setUser(user_logged)
    }
    function handleUserLogout(){
        setUser(null)
    }
    const userValue = {
        user,
        onUserLogged:handleUserLogged,
        onUserLogout:handleUserLogout
    }
    return (
        <UserContext.Provider value={userValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
