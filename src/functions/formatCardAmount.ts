import { currencySymbols, type currencyType } from "@/constants/currencySymbols";
export function formatCurrencyNumber(value: number,currency:currencyType,showCurrency:boolean=false): string {
    const decimalPart=value%100;
    if(!(currency=='IDR'||currency=='JPY'))
        value=Math.floor(value/100);
    const digits = String(value);
    const parts: string[] = [];
    for (let end = digits.length; end > 0; end -= 3) {
        const start = Math.max(0, end - 3);
        parts.unshift(digits.slice(start, end));
    }

    return parts.join(" ")+(currency=='JPY'||currency=='IDR'?"":(decimalPart==0?"":"."+decimalPart))+`${showCurrency?" "+currencySymbols[currency]:""}`;
}
// function getDecimalPart(amount:number,currency:currencyType){
//     if()
//         return "";
//     else
//         return
// }
// export function formatCardAmount(amount: number, currency: currencyType): string {
//     // const value = amount.toLocaleString("ru-RU", {
//     //     minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
//     //     maximumFractionDigits: 2,
//     // });

//     return `${formatIntegerPartOfNumber(amount,currency)}${getDecimalPart(amount,currency)} ${currencySymbols[currency]}`;
// }
