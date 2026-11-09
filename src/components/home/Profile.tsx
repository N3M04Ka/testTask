import {
    Montserrat_600SemiBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import { ChevronRight } from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";
import Gradient from "../ui/Gradient";

import giftImg from "@/assets/icons/gift.png";
import notificationImg from "@/assets/icons/notification.png";
import personImg from "@/assets/images/ава.png";
import { gradientColors } from "@/constants/gradien";

export default function Profile() {
    const [loaded, error] = useFonts({
        Montserrat_600SemiBold,
    });
    if (!loaded && !error) return null;
    return (
        <View className="flex-row w-11/12 items-center justify-between">
            <View className="flex-row gap-3">
                <Image source={personImg} />
                <View>
                    <Text style={{ fontFamily: "Montserrat_600SemiBold" }} className="text-xl">
                        Никита В.
                    </Text>
                    <View className="flex-row items-center">
                        <Text
                            style={{ fontFamily: "Montserrat_600SemiBold" }}
                            className="text-lg text-gray-600 pb-0.5"
                        >
                            Мой профиль
                        </Text>
                        <ChevronRight size={18} color="#4b5563" />
                    </View>
                </View>
            </View>
            <View className="flex-row gap-2 items-center">
                <Pressable>
                    <Gradient className="flex flex-row px-2 pb-1 pt-[2px] pr-4 rounded-2xl items-center w-full">
                        <Image source={giftImg} className="mt-3" />
                        <Text
                            style={{ fontFamily: "Montserrat_600SemiBold" }}
                            className="text-white text-xl"
                        >
                            Бонус
                        </Text>
                    </Gradient>
                </Pressable>
                <Pressable>
                    <Gradient
                        className="flex flex-row pr-2 rounded-2xl relative border-white border-2"
                        colors={gradientColors.lightOrange}
                    >
                        <Image
                            source={notificationImg}
                            className="mt-3 ml-2 w-10 aspect-square"
                        />
                        <Gradient
                            className="bg-orange-600 w-2 aspect-square rounded absolute z-10 left-8 top-3 border-white border"
                            colors={gradientColors.orange}
                        />
                    </Gradient>
                </Pressable>
            </View>
        </View>
    );
}
