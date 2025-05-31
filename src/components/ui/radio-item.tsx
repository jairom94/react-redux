import { type ChangeEvent, type ComponentProps } from 'react';
import { useRadioGroup } from './context';


interface RadioItemProps extends Omit<ComponentProps<'input'>,'type' | 'name' | 'checked'> {
    label:string;
}
const RadioItem = ({label,...props}:RadioItemProps) => {    
    const { name,onChange } = useRadioGroup() 
    // const [checked,setChecked] = useState<boolean>();
    function handleOnChange(e:ChangeEvent<HTMLInputElement>) {
        // setChecked(e.target.checked)  
        // alert(e.target.value)
        onChange(e.target.value)              
    }
    return (
        <div className='class-name'>
            <input 
            type="radio"             
            id={props.id}
            name={name}                      
            onChange={handleOnChange} 
            {...props} />
            <label htmlFor={props.id}>{label}</label>
        </div>
    );
};

export default RadioItem;
