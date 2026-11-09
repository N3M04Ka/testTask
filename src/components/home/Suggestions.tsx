import { FlatList, View, Text, Image } from "react-native";
import { suggestionsArray } from "@/constants/suggestions";
import {
    Montserrat_600SemiBold,
    useFonts,
} from "@expo-google-fonts/montserrat";

export default function Suggestions() {
    const [loaded, error] = useFonts({
        Montserrat_600SemiBold,
    });
    if (!loaded && !error) return null;
    return (
        <FlatList
            data={suggestionsArray}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-5 flex-grow-0 "
            renderItem={({ item }) => (
                <View className="p-1 border-2 border-orange-500 aspect-square w-28 mx-2 rounded-3xl relative justify-end">
                    <Image source={item.image} className="h-full w-full absolute top-1 left-1"/>
                    <Text className={`text-[10px] leading-3 ml-2 mb-2 ${item.color}`} style={{fontFamily:"Montserrat_600SemiBold"}}>{item.text}</Text>
                </View>
            )}
        />
    );
}
