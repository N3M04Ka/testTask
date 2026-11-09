import { FlatList, View, Text, Image } from "react-native";
import {
    Montserrat_600SemiBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import Gradient from "../ui/Gradient";
import { financialOperationsArray } from "@/constants/financialOperations";
import { gradientColors } from "@/constants/gradien";

export default function FinancialOperations() {
    const [loaded, error] = useFonts({
        Montserrat_600SemiBold,
    });
    if (!loaded && !error) return null;
    return (
        <View className="bg-white py-5 px-3 rounded-3xl flex-row w-11/12 justify-between mt-5">
            {financialOperationsArray.map((el)=>(
                <View key={el.id} className=" items-center flex-1">
                    <Gradient className="w-14 aspect-square rounded-2xl items-center justify-center" colors={gradientColors.lightOrange}>
                        <Image source={el.img} className="mt-2 h-9"/>
                    </Gradient>
                    <Text className="text-[13px] text-center mt-2 " style={{fontFamily:"Montserrat_600SemiBold"}}>{el.name}</Text>
                </View>
            ))}
        </View>
    );
}
