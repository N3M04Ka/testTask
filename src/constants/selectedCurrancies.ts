
export type CurrancyType={
    id:number,
    isoCode:string,
    shortCurrancyName:string,
    convertorFunction:()=>void,
}
export const selectedCurrencies:CurrancyType[]=[
    {
        id:1,
        isoCode:'us',
        shortCurrancyName:"USD",
        convertorFunction:()=>{},
    },
    {
        id:2,
        isoCode:'eu',
        shortCurrancyName:"EUR",
        convertorFunction:()=>{},
    },
    {
        id:3,
        isoCode:'id',
        shortCurrancyName:"IDR",
        convertorFunction:()=>{},
    },
]
