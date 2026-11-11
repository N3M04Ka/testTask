import { router } from "expo-router";
import { Keyboard, Text, View } from "react-native";

import TransferButton from "@/components/transfer/TransferButton";
import TransferRecipientSummary from "@/components/transfer/TransferRecipientSummary";
import TransferScreen from "@/components/transfer/TransferScreen";
import TransferSourceCard from "@/components/transfer/TransferSourceCard";
import { transferSourceCard } from "@/constants/transferFlow";
import { formatTransferMoney, validateTransferAmount } from "@/functions/transferFlow";
import { useTransfer } from "@/providers/TransferProvider";

export default function TransferConfirm() {
    const { draft, submitTransfer } = useTransfer();
    if (!draft?.receiverId) return null;
    const { amountMinor } = validateTransferAmount(draft.amountInput, transferSourceCard.balance);
    if (amountMinor === null) return null;

    return (
        <TransferScreen
            title="Подтверждение перевода"
            footer={
                <TransferButton
                    title="Подтвердить перевод"
                    disabled={draft.phase !== "editing"}
                    onPress={() => {
                        Keyboard.dismiss();
                        if (submitTransfer()) router.replace("/app/transfer/status");
                    }}
                />
            }
        >
            <TransferRecipientSummary receiverId={draft.receiverId} method={draft.method} />
            <TransferSourceCard />
            <View className="mt-5 w-11/12 gap-4 rounded-3xl bg-white p-5">
                <Text className="text-lg text-black" style={{ fontFamily: "Montserrat_600SemiBold" }}>
                    Детали перевода
                </Text>
                <DetailRow label="Сумма" amountMinor={amountMinor} />
                <DetailRow label="Комиссия" amountMinor={0} />
                <View className="border-t border-gray-100 pt-4">
                    <DetailRow label="Итого" amountMinor={amountMinor} total />
                </View>
            </View>
        </TransferScreen>
    );
}

function DetailRow({ label, amountMinor, total = false }: {
    label: string; amountMinor: number; total?: boolean;
}) {
    return (
        <View className="flex-row items-center justify-between gap-3">
            <Text
                className={`min-w-0 flex-1 ${total ? "text-base text-black" : "text-sm text-black/50"}`}
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                {label}
            </Text>
            <Text
                className={total ? "shrink text-right text-2xl text-black" : "shrink text-right text-lg text-black"}
                style={{ fontFamily: "Jost_500Medium" }}
            >
                {formatTransferMoney(amountMinor)}
            </Text>
        </View>
    );
}
