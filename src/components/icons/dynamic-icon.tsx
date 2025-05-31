import React, { type ComponentProps } from 'react';
import { LifestyleIcon } from './lifestyle-icon';
import { MobileIcon } from './mobile-icon';
import { MotorIcon } from './motor-cion';
import { WorkIcon } from './work-icon';


const iconMap = {
    'lifestyle':LifestyleIcon,
    'mobile':MobileIcon,
    'motor':MotorIcon,
    'work':WorkIcon    
}

type typeIcon = keyof typeof iconMap
interface DynamicIconProps extends ComponentProps<'span'>{
    icon:typeIcon;
}
const DynamicIcon = ({icon,...props}:DynamicIconProps) => {
    const Icon = iconMap[icon]
    return (
        <span {...props}>
            {<Icon />}
        </span>
    );
};

export default DynamicIcon;
