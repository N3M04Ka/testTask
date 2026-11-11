import { type currencyType } from "./currencySymbols";
export type bankAccountDataType={
    id:number,
    currency:currencyType,
    amount:number,
    isoCode:string,
}
export const bankAccountData:bankAccountDataType[] = [
    { id:1,currency: "RUB", amount: 9845050,isoCode:"ru" },
    { id:2,currency: "IDR", amount: 36955282,isoCode:"id" },
    { id:3,currency: "TRY", amount: 1250075,isoCode:"tr" },
    { id:4,currency: "USD", amount: 25000,isoCode:"us" },
    { id:5,currency: "KZT", amount: 15000000,isoCode:"kz" },
];
