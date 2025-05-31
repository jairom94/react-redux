import { type ChangeEvent, type ComponentProps } from 'react';
import { useCheckGroup } from './context';


interface CheckItemProps extends Omit<ComponentProps<'input'>,'type' | 'checked'> {
    label:string;
}
const CheckItem = ({label,...props}:CheckItemProps) => {
    // const [checked,setChecked] = useState(false)
    const { onSelect,onUnSelect,selectsItem,clearSelects } = useCheckGroup()
    function handleChange(e:ChangeEvent<HTMLInputElement>){                
        if(e.target.checked){
            onSelect(e.target.name)
        }else{
            onUnSelect(e.target.name)            
            if (selectsItem.length === 0) {
                clearSelects()
            }
        }
    }    
    // const cont = useRef(0)
    // cont.current+=1
    // console.log(cont.current);
    // console.log(selectsItem);
    
    return (
        <div className='class-name'>
            <input 
            type="checkbox"                        
            onChange={handleChange}
            {...props}
            />
            <label htmlFor={props.id}>{label}</label>
        </div>
    );
};

export default CheckItem;
