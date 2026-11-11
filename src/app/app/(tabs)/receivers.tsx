import { Jost_500Medium } from "@expo-google-fonts/jost";
import {
    Montserrat_600SemiBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AddReceiverButton from "@/components/receivers/AddReceiverButton";
import ReceiverCard from "@/components/receivers/ReceiverCard";
import ReceiversHeader from "@/components/receivers/ReceiversHeader";
import { receiversArray } from "@/constants/receivers";
import { selectReceivers } from "@/functions/selectReceivers";

export default function Receivers() {
    const [query, setQuery] = useState("");
    const [sortByName, setSortByName] = useState(false);
    const [fontsLoaded, fontError] = useFonts({
        Montserrat_600SemiBold,
        Jost_500Medium,
    });
    const receivers = selectReceivers(receiversArray, query, sortByName);

    if (!fontsLoaded && !fontError) return null;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            testID="receivers-keyboard-layout"
        >
            <SafeAreaView
                className="flex-1 items-center pt-3"
                style={{ backgroundColor: "#D9D9D910" }}
                edges={["top", "left", "right"]}
            >
                <View className="w-11/12 pb-5 pt-3">
                    <Text
                        accessibilityRole="header"
                        className="text-3xl text-black"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Получатели
                    </Text>
                </View>

                <FlatList
                    className="w-11/12 flex-1"
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={receivers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <ReceiverCard receiver={item} />}
                    ItemSeparatorComponent={ReceiverSeparator}
                    ListHeaderComponent={
                        <ReceiversHeader
                            query={query}
                            onQueryChange={setQuery}
                            count={receivers.length}
                            sortByName={sortByName}
                            onToggleSort={() => setSortByName((current) => !current)}
                        />
                    }
                    ListEmptyComponent={
                        <View className="items-center rounded-3xl bg-white px-5 py-10">
                            <Text
                                className="text-center text-base text-black"
                                style={{ fontFamily: "Montserrat_600SemiBold" }}
                            >
                                Получатели не найдены
                            </Text>
                            <Text
                                className="mt-2 text-center text-sm text-black/50"
                                style={{ fontFamily: "Montserrat_600SemiBold" }}
                            >
                                Попробуйте другое имя или номер
                            </Text>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

function ReceiverSeparator() {
    return <View className="h-3" />;
}
