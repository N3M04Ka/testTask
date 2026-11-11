import { Redirect, useFocusEffect } from "expo-router";
import { CircleCheck } from "lucide-react-native";
import { useCallback } from "react";
import { ActivityIndicator, BackHandler, Text, View } from "react-native";

import TransferButton from "@/components/transfer/TransferButton";
import TransferRecipientSummary from "@/components/transfer/TransferRecipientSummary";
import TransferScreen, { exitTransfer } from "@/components/transfer/TransferScreen";
import { operationDateFormat } from "@/functions/operationDateFormat";
import { formatTransferMoney } from "@/functions/transferFlow";
import { useTransfer } from "@/providers/TransferProvider";

export default function TransferStatusScreen() {
    const { draft, transfers } = useTransfer();

    useFocusEffect(useCallback(() => {
        const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
            exitTransfer();
            return true;
        });
        return () => subscription.remove();
    }, []));

    const transfer = transfers.find((item) => item.id === draft?.id);
    if (!draft?.receiverId || !transfer) return <Redirect href="/app/transfer/recipient" />;
    const completed = transfer.status === "completed";

    return (
        <TransferScreen
            title="Статус перевода"
            onBack={exitTransfer}
            footer={<TransferButton title="Готово" onPress={exitTransfer} />}
        >
            <View className="mb-5 w-11/12 items-center rounded-3xl bg-white px-5 py-8">
                <View className={`size-20 items-center justify-center rounded-3xl ${completed ? "bg-green-50" : "bg-[#FFEEE7]"}`}>
                    {completed ? <CircleCheck size={44} color="#16A34A" />
                        : <ActivityIndicator size="large" color="#FF5D15" />}
                </View>
                <Text
                    accessibilityLiveRegion="polite"
                    className="mt-6 text-center text-2xl text-black"
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                    {completed ? "Перевод выполнен" : "Перевод в обработке"}
                </Text>
                <Text className="mt-3 w-full text-center text-4xl text-black" style={{ fontFamily: "Jost_500Medium" }}>
                    {formatTransferMoney(Math.round(Math.abs(transfer.amount) * 100))}
                </Text>
                <Text className="mt-3 text-center text-sm text-black/50" style={{ fontFamily: "Montserrat_600SemiBold" }}>
                    {operationDateFormat(transfer.date)}
                </Text>
            </View>
            <TransferRecipientSummary receiverId={draft.receiverId} method={draft.method} />
        </TransferScreen>
    );
}
