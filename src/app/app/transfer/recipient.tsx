import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Keyboard, Text, View } from "react-native";

import ReceiverCard from "@/components/receivers/ReceiverCard";
import ReceiversHeader from "@/components/receivers/ReceiversHeader";
import TransferEmptyState from "@/components/transfer/TransferEmptyState";
import TransferScreen from "@/components/transfer/TransferScreen";
import { receiversArray } from "@/constants/receivers";
import { getTransferReceiver, receiverCardLastFour, transferMethodLabels } from "@/constants/transferFlow";
import { selectReceivers } from "@/functions/selectReceivers";
import { selectCardReceivers } from "@/functions/transferFlow";
import { useTransfer } from "@/providers/TransferProvider";

export default function TransferRecipient() {
    const { draft, selectReceiver } = useTransfer();
    const [query, setQuery] = useState("");
    const [sortByName, setSortByName] = useState(false);
    if (!draft) return null;

    const receivers = draft.method === "phone"
        ? selectReceivers(receiversArray, query, sortByName)
        : selectCardReceivers(receiversArray, receiverCardLastFour, query, sortByName);

    return (
        <TransferScreen title="Выберите получателя" scroll={false}>
            <FlatList
                className="w-11/12 flex-1"
                contentContainerStyle={{ paddingBottom: 20 }}
                data={receivers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const details = getTransferReceiver(item.id);
                    return (
                        <ReceiverCard
                            receiver={item}
                            secondaryText={draft.method === "card" ? details?.maskedCard : item.phone}
                            description={details?.bank}
                            onPress={() => {
                                Keyboard.dismiss();
                                selectReceiver(item.id);
                                router.push("/app/transfer/amount");
                            }}
                        />
                    );
                }}
                ListHeaderComponent={
                    <View>
                        <Text
                            className="mb-4 text-sm text-black/50"
                            style={{ fontFamily: "Montserrat_600SemiBold" }}
                        >
                            {transferMethodLabels[draft.method]}
                        </Text>
                        <ReceiversHeader
                            query={query}
                            onQueryChange={setQuery}
                            count={receivers.length}
                            sortByName={sortByName}
                            onToggleSort={() => setSortByName((current) => !current)}
                            showAddButton={false}
                        />
                    </View>
                }
                ListEmptyComponent={<TransferEmptyState />}
                ItemSeparatorComponent={RecipientSeparator}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
            />
        </TransferScreen>
    );
}

function RecipientSeparator() {
    return <View className="h-3" />;
}
