import { FlatList, View, Text, Image, ScrollView, Pressable } from "react-native";
import {
    Montserrat_600SemiBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import { Jost_500Medium } from "@expo-google-fonts/jost";
import Gradient from "../ui/Gradient";
import { gradientColors } from "@/constants/gradien";
import CountryFlag from 'react-native-country-flag';
import { currencySymbols } from "@/constants/currencySymbols";
import { formatCurrencyNumber } from "@/functions/formatCardAmount";
import plusImg from '@/assets/icons/plus.png'
import { fetchData } from "@/functions/fetchData";
import {useEffect,useState} from 'react';
import { bankAccountData,type bankAccountDataType } from "@/constants/bankAccount";

// const TotalBalanceValue = 15009050;

type currancyInfoProps={
    data:bankAccountDataType
}

function CurrancyInfo({data}:currancyInfoProps) {
    // console.log(data)
    return (
        <Gradient className={"w-52 aspect-[1.85] pl-5 py-4 box-border rounded-3xl justify-between mx-2"} colors={gradientColors.lightGray}>
            <View className="flex-row gap-2 items-center ">
                <CountryFlag isoCode={data.isoCode} size={15} />
                <Text style={{fontFamily:"Montserrat_600SemiBold"}} className="text-lg ">{data.currency}</Text>
            </View>
            <View className="flex-row gap-2 items-center">
                <Text style={{ fontFamily: "Jost_500Medium" }} className="font-bold text-xl">{formatCurrencyNumber(data.amount,data.currency)}</Text>
                <Text style={{ fontFamily: "Jost_500Medium",color:'#00000080' }} className="font-bold text-lg">{currencySymbols[data.currency]}</Text>
            </View>
        </Gradient>
    );
}
export default function TotalBalance() {
    const [loaded, error] = useFonts({
        Montserrat_600SemiBold,
        Jost_500Medium,
    });
    const [TotalBalance,setTotalBalance]=useState<number>(0);
    useEffect(()=>{
        async function load(){
            try{
                let calculatedTotalBalance=0;
                for(const [_,value] of Object.entries(bankAccountData)){
                    // console.log(value);
                    const data=await fetchData(value.currency);
                    if(value.currency=='RUB'){
                        // console.log(value.amount);
                        calculatedTotalBalance+=value.amount/100;
                        continue;
                    }
                    // console.log(data);
                    const valueAmount=(value.currency =='JPY'||value.currency =='IDR'?value.amount:value.amount/100);
                    const v=valueAmount*data.Value/data.Nominal;
                    // console.log(value.currency,value.amount,valueAmount,data.Value,data.Nominal)
                    // console.log(v)
                    calculatedTotalBalance+=v;
                }
                calculatedTotalBalance=Math.floor(calculatedTotalBalance*100);
                setTotalBalance(()=>calculatedTotalBalance);
                // console.log(formatCurrencyNumber(calculatedTotalBalance,'RUB',false))
            }
            catch(err){
                console.log(err);
            }
        }
        load();
    },[]);

    if (!loaded && !error) return null;

    return (
        <Gradient className="w-11/12 rounded-3xl p-5 mt-5">
            <View className="items-start pl-3">
                <Text
                    style={{
                        fontFamily: "Montserrat_600SemiBold",
                        color: "#ffffffd0",
                    }}
                    className="text-start text-xl"
                >
                    Общий баланс
                </Text>
                <View className="flex-row my-3">
                    <Text
                        style={{ fontFamily: "Jost_500Medium" }}
                        className="text-[50px] text-white "
                    >
                        {formatCurrencyNumber(Math.floor(TotalBalance/100)*100,'RUB',false)}.
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Jost_500Medium",
                            color: "#ffffff80",
                        }}
                        className="text-[50px]"
                    >
                        {TotalBalance % 100} ₽
                    </Text>
                </View>
            </View>
            <View className="flex-grow-0 rounded-3xl py-5 bg-white mt-2">
                <Text
                    style={{
                        fontFamily: "Montserrat_600SemiBold",
                    }}
                    className="text-xl pl-5"
                >
                    Валюты
                </Text>
                <FlatList
                    data={bankAccountData}
                    horizontal
                    className="flex-grow-0 mt-3"
                    keyExtractor={item=>item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    ListFooterComponent={
                        <Gradient className="w-52 aspect-[1.85] justify-center pl-5 items-start box-border rounded-3xl gap-5 mx-2" colors={gradientColors.lightOrange}>
                            <Pressable className="bg-white p-3 rounded-lg">
                                <Image source={plusImg} className="aspect-square w-4"/>
                            </Pressable>
                            <Text style={{color:"#FF5D15"}} className="text-lg font-semibold ">Добавить валюту</Text>
                        </Gradient>
                    }
                    renderItem={({item})=>
                        <CurrancyInfo data={item} />
                    }
                />
            </View>
        </Gradient>
    );
}
