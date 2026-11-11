import { Jost_500Medium } from "@expo-google-fonts/jost";
import {
    Montserrat_600SemiBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PaymentsSearch from "@/components/payments/PaymentsSearch";
import PaymentServices from "@/components/payments/PaymentServices";
import PeopleTransfers from "@/components/payments/PeopleTransfers";
import RecentTemplates from "@/components/payments/RecentTemplates";

export default function Payments() {
    const [query, setQuery] = useState("");
    const [fontsLoaded, fontError] = useFonts({
        Montserrat_600SemiBold,
        Jost_500Medium,
    });

    if (!fontsLoaded && !fontError) return null;

    function goBack() {
        Keyboard.dismiss();
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/");
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <SafeAreaView
                className="flex-1 items-center pt-3"
                style={{ backgroundColor: "#D9D9D910" }}
                edges={["top", "left", "right"]}
            >
                <View className="w-11/12 flex-row items-center gap-3 pb-5 pt-3">
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Назад"
                        onPress={goBack}
                        className="size-11 items-center justify-center rounded-2xl bg-white active:opacity-70"
                    >
                        <ChevronLeft size={24} color="#000000" />
                    </Pressable>
                    <Text
                        accessibilityRole="header"
                        className="flex-1 text-3xl text-black"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Платежи
                    </Text>
                </View>

                <ScrollView
                    style={{ flex: 1, width: "100%" }}
                    contentContainerStyle={{ alignItems: "center", paddingBottom: 48 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >
                    <View className="w-11/12">
                        <PaymentsSearch query={query} onQueryChange={setQuery} />
                    </View>
                    <RecentTemplates />
                    <PeopleTransfers />
                    <PaymentServices />
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
