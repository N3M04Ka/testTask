import { Microchip, Plus, Wifi } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import Gradient from "@/components/ui/Gradient";
import { cardGradientColors, type BankCard } from "@/constants/cards";
import { gradientColors } from "@/constants/gradien";
import { formatCurrencyNumber } from "@/functions/formatCardAmount";

type BankCardViewProps = {
    card: BankCard | null;
};

export default function BankCardView({ card }: BankCardViewProps) {
    if (!card) {
        return (
            <Pressable
                disabled
                accessibilityRole="button"
                accessibilityLabel="Добавить карту"
                accessibilityState={{ disabled: true }}
                className="flex-1"
            >
                <Gradient
                    colors={gradientColors.lightOrange}
                    className="flex-1 justify-between rounded-3xl p-5"
                >
                    <View className="size-12 items-center justify-center rounded-xl bg-white">
                        <Plus size={24} color="#FF5D15" />
                    </View>
                    <Text
                        className="text-lg text-[#FF5D15]"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Добавить карту
                    </Text>
                </Gradient>
            </Pressable>
        );
    }

    return (
        <View
            className="flex-1"
            accessible
            accessibilityLabel={`${card.title}, баланс ${formatCurrencyNumber(card.balance, card.currency,true)}, номер заканчивается на ${card.lastFour}, срок ${card.expires}`}
        >
            <Gradient
                colors={cardGradientColors[card.theme]}
                className="flex-1 justify-between rounded-3xl p-5"
            >
                <View className="flex-row items-start justify-between gap-3">
                    <View className="flex-1">
                        <Text
                            className="text-sm text-white"
                            style={{ fontFamily: "Montserrat_600SemiBold" }}
                        >
                            {card.title}
                        </Text>
                        <Text
                            className="mt-1 text-xs text-white/70"
                            style={{ fontFamily: "Montserrat_600SemiBold" }}
                        >
                            {card.subtitle}
                        </Text>
                    </View>
                    <View className="rounded-lg bg-white/15 px-2 py-1">
                        <Text
                            className="text-xs text-white"
                            style={{ fontFamily: "Montserrat_600SemiBold" }}
                        >
                            МИР
                        </Text>
                    </View>
                </View>

                <View className="py-3">
                    <Text
                        className="text-xs text-white/70"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        {card.currency === "IDR" ? "Баланс в Индонезии" : "Баланс карты"}
                    </Text>
                    <Text
                        className="mt-1 text-[30px] leading-[38px] text-white"
                        style={{ fontFamily: "Jost_500Medium" }}
                    >
                        {formatCurrencyNumber(card.balance, card.currency,true)}
                    </Text>
                    {card.rubleEquivalent !== undefined && (
                        <Text
                            className="mt-1 text-xs text-white/70"
                            style={{ fontFamily: "Jost_500Medium" }}
                        >
                            ≈ {formatCurrencyNumber(card.rubleEquivalent, "RUB",true)}
                        </Text>
                    )}
                </View>

                <View className="flex-row items-center justify-between gap-2">
                    <View className="flex-row items-center gap-2">
                        <Microchip size={22} color="#FFFFFFB0" />
                        <Text
                            className="text-base tracking-wider text-white"
                            style={{ fontFamily: "Jost_500Medium" }}
                        >
                            •••• {card.lastFour}
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                        <Text
                            className="text-xs text-white/80"
                            style={{ fontFamily: "Jost_500Medium" }}
                        >
                            {card.expires}
                        </Text>
                        <View className="rotate-90">
                            <Wifi size={18} color="#FFFFFFB0" />
                        </View>
                    </View>
                </View>
                {card.cashback !== undefined && (
                    <Text
                        className="mt-2 text-[10px] text-white/70"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Кэшбэк {card.cashback}%
                    </Text>
                )}
            </Gradient>
        </View>
    );
}
