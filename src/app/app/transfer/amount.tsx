import { router } from "expo-router";
import { Keyboard, Text, TextInput, View } from "react-native";

import TransferButton from "@/components/transfer/TransferButton";
import TransferRecipientSummary from "@/components/transfer/TransferRecipientSummary";
import TransferScreen from "@/components/transfer/TransferScreen";
import TransferSourceCard from "@/components/transfer/TransferSourceCard";
import { currencySymbols } from "@/constants/currencySymbols";
import { transferSourceCard } from "@/constants/transferFlow";
import { formatTransferMoney, validateTransferAmount } from "@/functions/transferFlow";
import { useTransfer } from "@/providers/TransferProvider";

export default function TransferAmount() {
    const { draft, setAmountInput } = useTransfer();
    if (!draft?.receiverId) return null;
    const { error } = validateTransferAmount(draft.amountInput, transferSourceCard.balance);

    return (
        <TransferScreen
            title="Сумма перевода"
            footer={
                <TransferButton
                    title="Продолжить"
                    disabled={error !== null}
                    onPress={() => {
                        if (error) return;
                        Keyboard.dismiss();
                        router.push("/app/transfer/confirm");
                    }}
                />
            }
        >
            <TransferRecipientSummary receiverId={draft.receiverId} method={draft.method} />
            <View className="mt-5 w-11/12 rounded-3xl bg-white p-5">
                <Text
                    className="text-sm text-black/50"
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                    Сумма перевода
                </Text>
                <View className="mt-3 flex-row items-center gap-3">
                    <TextInput
                        testID="transfer-amount"
                        accessibilityLabel="Сумма перевода в рублях"
                        value={draft.amountInput}
                        onChangeText={setAmountInput}
                        keyboardType="decimal-pad"
                        placeholder="0"
                        placeholderTextColor="#00000040"
                        selectionColor="#FF5D15"
                        className="min-h-16 min-w-0 flex-1 py-2 text-4xl text-black"
                        style={{ fontFamily: "Jost_500Medium" }}
                        autoComplete="off"
                        autoCorrect={false}
                        returnKeyType="done"
                        onSubmitEditing={Keyboard.dismiss}
                        underlineColorAndroid="transparent"
                    />
                    <Text className="text-3xl text-black" style={{ fontFamily: "Jost_500Medium" }}>
                        {currencySymbols.RUB}
                    </Text>
                </View>
                {error ? (
                    <Text
                        accessibilityLiveRegion="polite"
                        className={`mt-2 text-xs leading-5 ${draft.amountInput ? "text-red-500" : "text-black/50"}`}
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        {error}
                    </Text>
                ) : null}
                <View className="mt-5 flex-row items-center justify-between gap-3 border-t border-gray-100 pt-4">
                    <Text className="text-sm text-black/50" style={{ fontFamily: "Montserrat_600SemiBold" }}>
                        Комиссия
                    </Text>
                    <Text className="text-base text-black" style={{ fontFamily: "Jost_500Medium" }}>
                        {formatTransferMoney(0)}
                    </Text>
                </View>
            </View>
            <TransferSourceCard />
        </TransferScreen>
    );
}
