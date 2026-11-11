
import { type currencyType } from "@/constants/currencySymbols";
export type currencyRateData={
    ID:string,
    NumCode:string,
    CharCode:string,
    Nominal:number,
    Name:string,
    Value:number,
    Previous:number
}
export async function fetchData(currency:currencyType):Promise<currencyRateData>{
    const res=await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    if(!res.ok)
        throw new Error(`HTTP ${res.status}`);
    const data= await res.json();
    // for(const[code,v] of Object.entries(data.Valute)){
    //     console.log(code);
    //     for( const [key,val] of Object.entries((v as currencyRateData)))
    //         console.log(key +" "+val)
    //     console.log();
    // }
    return data.Valute[currency];
}
