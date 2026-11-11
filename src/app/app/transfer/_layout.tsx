import { Jost_500Medium } from "@expo-google-fonts/jost";
import { Montserrat_600SemiBold, useFonts } from "@expo-google-fonts/montserrat";
import { Redirect, Stack } from "expo-router";
import { useState } from "react";

import { getTransferReceiver, transferSourceCard } from "@/constants/transferFlow";
import { validateTransferAmount } from "@/functions/transferFlow";
import { useTransfer } from "@/providers/TransferProvider";

export default function TransferLayout() {
    const { draft } = useTransfer();
    const [fontsLoaded, fontError] = useFonts({ Montserrat_600SemiBold, Jost_500Medium });
    const [statusDraftId, setStatusDraftId] = useState<string | null>(null);

    if (!draft) return <Redirect href="/app/payments" />;
    if (!fontsLoaded && !fontError) return null;

    const receiverSelected = getTransferReceiver(draft.receiverId) !== null;
    const amountValid = validateTransferAmount(draft.amountInput, transferSourceCard.balance).error === null;

    return (
        <Stack screenOptions={{ headerShown: false, animation: "none" }}>
            {/* Remove earlier steps only after the status route replaces confirmation. */}
            <Stack.Protected guard={draft.phase === "editing"
                || (draft.phase === "submitting" && statusDraftId !== draft.id)}>
                <Stack.Screen name="recipient" />
                <Stack.Protected guard={receiverSelected}>
                    <Stack.Screen name="amount" />
                    <Stack.Protected guard={amountValid}>
                        <Stack.Screen name="confirm" />
                    </Stack.Protected>
                </Stack.Protected>
            </Stack.Protected>
            <Stack.Screen
                name="status"
                options={{ gestureEnabled: false }}
                listeners={{ focus: () => {
                    if (draft.phase !== "editing") setStatusDraftId(draft.id);
                } }}
            />
        </Stack>
    );
}
