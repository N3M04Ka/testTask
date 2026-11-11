import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import Gradient from "@/components/ui/Gradient";
import type { BankCard } from "@/constants/cards";
import { gradientColors } from "@/constants/gradien";
import { formatCurrencyNumber } from "@/functions/formatCardAmount";

type CardSpendingProps = {
    card: BankCard;
};

export default function CardSpending({ card }: CardSpendingProps) {
    const spent=card.categories.reduce((sum,val)=>val.amount+sum,0)
    const spentPercentage = Math.min(100, (spent / card.monthlyLimit) * 100);

    return (
        <View className="mt-5 w-11/12 rounded-3xl bg-white p-5">
            <View className="flex-row items-start justify-between gap-3">
                <View className="min-w-0 flex-1">
                    <Text
                        accessibilityRole="header"
                        className="text-lg text-black"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Расходы по карте
                    </Text>
                    <Text
                        className="mt-1 text-xs text-black/50"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        В ноябре 2026 г.
                    </Text>
                </View>
                <Pressable
                    disabled
                    accessibilityRole="button"
                    accessibilityLabel={`Лимит ${formatCurrencyNumber(card.monthlyLimit, card.currency,true)}`}
                    accessibilityState={{ disabled: true }}
                    className="max-w-[48%] items-end"
                >
                    <Text
                        className="text-xs text-black/50"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Лимит
                    </Text>
                    <View className="mt-1 flex-row items-center gap-1">
                        <Text
                            className="shrink text-right text-base text-[#FF5D15]"
                            style={{ fontFamily: "Jost_500Medium" }}
                        >
                            {formatCurrencyNumber(card.monthlyLimit, card.currency,true)}
                        </Text>
                        <ChevronRight size={14} color="#FF5D15" />
                    </View>
                </Pressable>
            </View>

            <View
                accessibilityRole="progressbar"
                accessibilityLabel="Использованный лимит расходов"
                accessibilityValue={{ min: 0, max: 100, now: Math.round(spentPercentage) }}
                className="mt-5 h-2.5 overflow-hidden rounded-full bg-gray-100 flex-row"
            >
                {card.categories.map((el)=>(
                    <View key={el.name} style={{ width: `${el.amount/card.monthlyLimit*100}%`, height: "100%" }}>
                        <Gradient colors={[el.color,el.color]} className="h-full rounded-full" />
                    </View>
                ))}

            </View>
            <View className="mt-3 flex-row items-start justify-between gap-3">
                <View className="min-w-0 flex-1">
                    <Text
                        className="text-2xl text-black"
                        style={{ fontFamily: "Jost_500Medium" }}
                    >
                        {formatCurrencyNumber(spent, card.currency,true)}
                    </Text>
                    <Text
                        className="text-xs text-black/50"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        потрачено
                    </Text>
                </View>
                <View className="min-w-0 flex-1 items-end">
                    <Text
                        className="text-xs text-black/50"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Осталось
                    </Text>
                    <Text
                        className="mt-1 w-full text-right text-base text-black"
                        style={{ fontFamily: "Jost_500Medium" }}
                    >
                        {formatCurrencyNumber(card.monthlyLimit - spent, card.currency,true)}
                    </Text>
                </View>
            </View>

            <View className="mt-4 flex-row gap-2">
                {card.categories.map((category) => (
                    <View key={category.name} className="min-w-0 flex-1 rounded-2xl bg-gray-50 p-3">
                        <View className="flex-row items-center gap-2">
                            <View className="size-2 rounded-full" style={{ backgroundColor: category.color }} />
                            <Text
                                className="min-w-0 flex-1 text-[10px] text-black/60"
                                style={{ fontFamily: "Montserrat_600SemiBold" }}
                            >
                                {category.name}
                            </Text>
                        </View>
                        <Text
                            className="mt-1 text-base text-black"
                            style={{ fontFamily: "Jost_500Medium" }}
                        >
                            {formatCurrencyNumber(category.amount, card.currency,true)}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
