import { type ReactNode } from 'react';
import { CheckGroupContext } from './context';

interface CheckGroupProps {
    value:string[];
    name:string;
    onChange:()=>{
        onSelect(value: string): void;
        onUnSelect(value: string): void;
        clearSelects():void;
    };    
    newKey:number;
    children:ReactNode;
}
const CheckGroup = ({name,value,onChange,newKey,children}:CheckGroupProps) => {    
    const { onSelect,onUnSelect,clearSelects } = onChange()
    // const cont = useRef(0);
    const checkGroupValue = {
        name,
        selectsItem:value,
        onSelect,
        onUnSelect,
        clearSelects,                        
    }          
    
      
    return (
        <CheckGroupContext.Provider value={checkGroupValue}>
            <label>Categorias</label>
            <div key={newKey}>
                {children}
            </div>
        </CheckGroupContext.Provider>
    );
};

export default CheckGroup;
