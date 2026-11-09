// import {type LucideIcon,ArrowDownToLine,ArrowRight,ArrowDown,ArrowLeftRight} from 'lucide-react-native'
import downArrowLineImg from '@/assets/icons/arrowDownWithLine.png';
import rightArrowImg from '@/assets/icons/arrowRight.png';
import arrowLeftRightImg from '@/assets/icons/arrowLeftRight.png';
import arrowDownImg from '@/assets/icons/arrowDown.png';
import {type ImageSourcePropType} from 'react-native';

type FinancialOperationType={
    id:number,
    img:ImageSourcePropType,
    name:string,
}
export const financialOperationsArray:FinancialOperationType[]=[
    {
        id:1,
        img:downArrowLineImg,
        name:'Пополнить счет',
    },
    {
        id:2,
        img:rightArrowImg,
        name:'Отправить перевод',
    },
    {
        id:3,
        img:arrowLeftRightImg,
        name:'Между своими',
    },
    {
        id:4,
        img:arrowDownImg,
        name:'Запросить перевод',
    },
]
