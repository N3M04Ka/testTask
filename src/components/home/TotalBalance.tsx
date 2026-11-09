import { FlatList, View, Text, Image, ScrollView, Pressable } from "react-native";
import {
    Montserrat_600SemiBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import { Jost_500Medium } from "@expo-google-fonts/jost";
import Gradient from "../ui/Gradient";
import { gradientColors } from "@/constants/gradien";
import CountryFlag from 'react-native-country-flag';
import { type CurrancyType,selectedCurrencies } from "@/constants/selectedCurrancies";
import { currencySymbols } from "@/constants/currencySymbols";

import plusImg from '@/assets/icons/plus.png'

const TotalBalanceValue = 15009050;

type currancyInfoProps={
    item:CurrancyType;
}

function formatNumber(value: number): string {
    const digits = String(value); // "12345678"
    const parts: string[] = [];

    for (let end = digits.length; end > 0; end -= 3) {
        const start = Math.max(0, end - 3);
        parts.unshift(digits.slice(start, end));
    }

    return parts.join(" ");
}

function CurrancyInfo({item}:currancyInfoProps) {
    return (
        <Gradient className={"w-52 aspect-[1.85] pl-5 py-4 box-border rounded-3xl justify-between mx-2"} colors={gradientColors.lightGray}>
            <View className="flex-row gap-2 items-center ">
                <CountryFlag isoCode={item.isoCode} size={15} />
                <Text style={{fontFamily:"Montserrat_600SemiBold"}} className="text-lg ">{item.shortCurrancyName}</Text>
            </View>
            <View className="flex-row gap-2 items-center">
                <Text style={{ fontFamily: "Jost_500Medium" }} className="font-bold text-xl">{formatNumber(123123123)}</Text>
                <Text style={{ fontFamily: "Jost_500Medium",color:'#00000080' }} className="font-bold text-lg">{currencySymbols[item.shortCurrancyName]}</Text>
            </View>
        </Gradient>
    );
}
export default function TotalBalance() {
    const [loaded, error] = useFonts({
        Montserrat_600SemiBold,
        Jost_500Medium,
    });
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
                        {formatNumber(Math.floor(TotalBalanceValue / 100))}.
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Jost_500Medium",
                            color: "#ffffff80",
                        }}
                        className="text-[50px]"
                    >
                        {TotalBalanceValue % 100} ₽
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
                    data={selectedCurrencies}
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
                        <CurrancyInfo item={item} />
                    }
                />
            </View>
        </Gradient>
    );
}
