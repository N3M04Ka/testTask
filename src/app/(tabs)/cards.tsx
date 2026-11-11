import { Jost_500Medium } from "@expo-google-fonts/jost";
import {
    Montserrat_600SemiBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CardActions from "@/components/cards/CardActions";
import CardCarousel from "@/components/cards/CardCarousel";
import CardSecurity from "@/components/cards/CardSecurity";
import CardSpending from "@/components/cards/CardSpending";
import { bankCards } from "@/constants/cards";

export default function Cards() {
    const [selectedCardIndex, setSelectedCardIndex] = useState(0);
    const [fontsLoaded, fontError] = useFonts({
        Montserrat_600SemiBold,
        Jost_500Medium,
    });
    const selectedCard = bankCards[selectedCardIndex];

    if (!fontsLoaded && !fontError) return null;

    return (
        <SafeAreaView
            className="flex-1 pt-3"
            style={{ backgroundColor: "#D9D9D910" }}
            edges={["top", "left", "right"]}
        >
            <ScrollView
                contentContainerStyle={{ alignItems: "center", paddingBottom: 48 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="w-11/12 pb-5 pt-3">
                    <Text
                        accessibilityRole="header"
                        className="text-3xl text-black"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Мои карты
                    </Text>
                </View>
                <CardCarousel onCardSelect={setSelectedCardIndex} />
                <CardActions />
                <CardSpending card={selectedCard} />
                <CardSecurity />
            </ScrollView>
        </SafeAreaView>
    );
}
