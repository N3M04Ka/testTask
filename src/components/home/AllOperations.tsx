import { Pressable, View, Text } from "react-native";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import {
    Montserrat_600SemiBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import { Jost_500Medium } from "@expo-google-fonts/jost";
import { OperationsArray, operationImageStyle, transactionColor } from "@/constants/operations";
import { currencySymbols } from "@/constants/currencySymbols";
import { operationDateFormat } from "@/functions/operationDateFormat";

export default function AllOperations() {;
    const [loaded, error] = useFonts({
        Montserrat_600SemiBold,
        Jost_500Medium,
    });
    if (!loaded && !error) return null;
    return (
        <View className="bg-white w-11/12 rounded-3xl p-5 mt-5">
            <Pressable
                accessibilityRole="button"
                accessibilityLabel="Все операции. Открыть историю переводов"
                onPress={() => router.push("/transfers")}
                className="min-h-11 flex-row gap-1 items-center active:opacity-70"
            >
                <Text
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                    className="text-2xl mb-1"
                >
                    Все операции
                </Text>
                <ChevronRight color={"#00000080"} />
            </Pressable>
            <View>
                {OperationsArray.map((item) => {
                    const iconStyle=operationImageStyle[item.operationSign]
                    return(
                    <View key={item.id}className="flex-row justify-between border-b border-b-gray-200 my-2 items-center py-3">
                        <View className="flex-row items-center gap-3">
                            <View style={{backgroundColor:iconStyle.backgroundColor}} className="w-14 rounded-2xl aspect-square items-center justify-center">
                                <item.icon color={iconStyle.color}/>
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontFamily: "Montserrat_600SemiBold",
                                    }}
                                    className="text-xl"
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "Montserrat_600SemiBold",
                                        color: "#00000080",
                                    }}
                                >
                                    {operationDateFormat(item.date)}
                                </Text>
                            </View>
                        </View>
                        <Text
                            style={{ fontFamily: "Jost_500Medium" }}
                            className={`text-2xl ${transactionColor[item.operationSign]}`}
                        >
                            {item.operationSign + "" + item.amount+" "+currencySymbols[item.shortCurrancyName]}
                        </Text>
                    </View>
                )})}
            </View>
        </View>
    );
}
