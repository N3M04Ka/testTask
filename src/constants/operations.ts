import {type LucideIcon,ArrowLeftRight,ArrowDownToLine,ArrowRight,ArrowUpFromLine} from 'lucide-react-native'
export type OperationType={
    id:number,
    icon:LucideIcon,
    name:string,
    date:Date,
    amount:number,
    operationSign:string,
    shortCurrancyName:string,
}
type operationImgStyleType={
    backgroundColor:string,
    color:string,
}
export const transactionColor:Record<string,string>={
    '+':'text-green-500',
    '-':'text-red-500',
    ' ':'text-gray-500'
}

export const operationImageStyle:Record<string,operationImgStyleType>={
    '+':{
        backgroundColor:'#FFEEE7',
        color:'#FF9468'
    },
    '-':{
        backgroundColor:'#FFEEE7',
        color:'#FF9468'
    },
    ' ':{
        backgroundColor:'#D9D9D9a0',
        color:'#000000d0'
    },
}

export const OperationsArray:OperationType[]=[
    {
        id:1,
        icon:ArrowDownToLine,
        name:'Пополнение',
        date: new Date('2026-11-08T03:24:12'),
        amount:400,
        operationSign:'+',
        shortCurrancyName:"USD"
    },
    {
        id:2,
        icon:ArrowLeftRight,
        name:'Между своими',
        date: new Date('2026-11-02T08:32:12'),
        amount:100.12,
        operationSign:' ',
        shortCurrancyName:"RUB",
    },
    {
        id:3,
        icon:ArrowRight,
        name:'Перевод',
        date: new Date('2025-11-02T03:24:12'),
        amount:123,
        operationSign:'-',
        shortCurrancyName:"EUR"
    },
    {
        id:4,
        icon:ArrowUpFromLine,
        name:'Списание',
        date: new Date('2026-11-02T23:59:59'),
        amount:321,
        operationSign:'-',
        shortCurrancyName:"IDR",
    },
]
