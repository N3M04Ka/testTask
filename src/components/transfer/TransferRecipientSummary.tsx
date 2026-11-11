import { Text, View } from "react-native";

import { getTransferReceiver, transferMethodLabels, type TransferMethod } from "@/constants/transferFlow";

type TransferRecipientSummaryProps = {
    receiverId: string;
    method: TransferMethod;
};

export default function TransferRecipientSummary({ receiverId, method }: TransferRecipientSummaryProps) {
    const recipient = getTransferReceiver(receiverId);
    if (!recipient) return null;

    return (
        <View className="w-11/12 rounded-3xl bg-white p-5">
            <Text
                className="text-xs text-black/50"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                {transferMethodLabels[method]}
            </Text>
            <Text
                className="mt-3 text-lg text-black"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                {recipient.receiver.name}
            </Text>
            <Text
                className="mt-1 text-lg text-black"
                style={{ fontFamily: "Jost_500Medium" }}
            >
                {method === "phone" ? recipient.receiver.phone : recipient.maskedCard}
            </Text>
            <Text
                className="mt-2 text-sm leading-5 text-black/50"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                {recipient.bank}
            </Text>
        </View>
    );
}
