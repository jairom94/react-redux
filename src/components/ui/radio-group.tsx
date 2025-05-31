import { type ReactNode } from 'react';
import { RadioGroupContext } from './context';


interface RadioProviderProps {
    value?:string;
    name:string;    
    onChange:(nameSelected:string)=>void; 
    newKey:number;   
    children:ReactNode;
}
const RadioGroup = ({onChange,newKey,children,name,...props}:RadioProviderProps) => {
    // const [valueSelected,setValueSelected] = useState('');    
    const radioGroupValue = {        
        name,
        value:props.value,        
        onChange
    }        
    
    return (
        <RadioGroupContext.Provider value={radioGroupValue}>            
            <fieldset>
            <legend>Tipo de anuncio</legend>            
            <div key={newKey}>
                {children}
            </div>
            </fieldset>
        </RadioGroupContext.Provider>
    );
};

export default RadioGroup;
