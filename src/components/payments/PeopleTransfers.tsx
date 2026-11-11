import { ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import Gradient from "@/components/ui/Gradient";
import { paymentTones, peopleTransferOptions } from "@/constants/payments";
import { useTransfer } from "@/providers/TransferProvider";

export default function PeopleTransfers() {
    const { startTransfer } = useTransfer();
    return (
        <View className="mt-5 w-11/12 rounded-3xl bg-white p-5">
            <Text
                accessibilityRole="header"
                className="mb-1 text-lg text-black"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                Людям
            </Text>
            {peopleTransferOptions.map(({ id, title, description, icon: Icon, tone }) => (
                <Pressable
                    key={id}
                    disabled={id !== "phone" && id !== "card"}
                    onPress={id === "phone" || id === "card" ? () => {
                        startTransfer(id);
                        router.push("/app/transfer/recipient");
                    } : undefined}
                    accessibilityRole="button"
                    accessibilityLabel={[title, description].filter(Boolean).join(". ")}
                    accessibilityState={{ disabled: id !== "phone" && id !== "card" }}
                    className="mt-3 flex-row items-center gap-3 rounded-2xl bg-gray-50 p-3"
                >
                    <Gradient
                        colors={paymentTones[tone].colors}
                        className="size-11 items-center justify-center rounded-2xl"
                    >
                        <Icon size={22} color={paymentTones[tone].iconColor} />
                    </Gradient>
                    <View className="min-w-0 flex-1 gap-1">
                        <Text
                            className="text-sm leading-5 text-black"
                            style={{ fontFamily: "Montserrat_600SemiBold" }}
                        >
                            {title}
                        </Text>
                        <Text
                            className="text-xs leading-5 text-black/50"
                            style={{ fontFamily: "Montserrat_600SemiBold" }}
                        >
                            {description}
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-1">

                        <ChevronRight size={16} color="#00000080" />
                    </View>
                </Pressable>
            ))}
        </View>
    );
}
