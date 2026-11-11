import { Jost_500Medium } from "@expo-google-fonts/jost";
import {
    Montserrat_600SemiBold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TransferCard from "@/components/transfers/TransferCard";
import TransfersEmptyState from "@/components/transfers/TransfersEmptyState";
import TransfersHeader from "@/components/transfers/TransfersHeader";
import TransfersSkeleton from "@/components/transfers/TransfersSkeleton";
import { receiversArray } from "@/constants/receivers";
import { selectTransfers } from "@/functions/selectTransfers";
import { useTransfer } from "@/providers/TransferProvider";

export default function Transfers() {
    const { transfers: sessionTransfers } = useTransfer();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [fontsLoaded, fontError] = useFonts({
        Montserrat_600SemiBold,
        Jost_500Medium,
    });

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1000*Math.random());
        return () => clearTimeout(timeout);
    }, []);

    const isLoading = loading || (!fontsLoaded && !fontError);
    const transfers = selectTransfers(sessionTransfers, receiversArray, query);

    if (!fontsLoaded && !fontError) {
        return (
            <SafeAreaView
                className="flex-1 items-center pt-6"
                style={{ backgroundColor: "#D9D9D910" }}
            >
                <View className="w-11/12">
                    <TransfersSkeleton />
                </View>
            </SafeAreaView>
        );
    }

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
            >
                <View className="w-11/12 flex-row items-center gap-3 pb-5 pt-3">
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Назад на главную"
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
                        Переводы
                    </Text>
                </View>

                <FlatList
                    className="w-11/12 flex-1"
                    contentContainerStyle={{ paddingBottom: 20 }}
                    data={isLoading ? [] : transfers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TransferCard transfer={item} />}
                    ItemSeparatorComponent={TransferSeparator}
                    ListHeaderComponent={
                        <TransfersHeader
                            query={query}
                            onQueryChange={setQuery}
                            count={isLoading ? null : transfers.length}
                        />
                    }
                    ListEmptyComponent={
                        isLoading ? (
                            <TransfersSkeleton />
                        ) : (
                            <TransfersEmptyState onClear={() => setQuery("")} />
                        )
                    }
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

function TransferSeparator() {
    return <View className="h-3" />;
}
