import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import type { ReactNode } from "react";
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

type TransferScreenProps = {
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    scroll?: boolean;
    onBack?: () => void;
};

export function exitTransfer() {
    Keyboard.dismiss();
    router.dismissTo("/app/payments");
}

export default function TransferScreen({
    title, children, footer, scroll = true, onBack,
}: TransferScreenProps) {
    function goBack() {
        Keyboard.dismiss();
        if (onBack) onBack();
        else if (router.canGoBack()) router.back();
        else router.replace("/app/payments");
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
                        onPress={goBack}
                        accessibilityRole="button"
                        accessibilityLabel="Назад"
                        className="size-11 items-center justify-center rounded-2xl bg-white active:opacity-70"
                    >
                        <ChevronLeft size={24} color="#000000" />
                    </Pressable>
                    <Text
                        accessibilityRole="header"
                        className="min-w-0 flex-1 text-2xl leading-8 text-black"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        {title}
                    </Text>
                </View>
                {scroll ? (
                    <ScrollView
                        style={{ flex: 1, width: "100%" }}
                        contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                ) : children}
                {footer ? <View className="w-11/12 pb-4 pt-3">{footer}</View> : null}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
