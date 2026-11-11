import { CreditCard } from "lucide-react-native";
import { Text, View } from "react-native";

import Gradient from "@/components/ui/Gradient";
import { gradientColors } from "@/constants/gradien";
import { transferSourceCard } from "@/constants/transferFlow";
import { formatTransferMoney } from "@/functions/transferFlow";

export default function TransferSourceCard() {
    return (
        <View className="mt-5 w-11/12 rounded-3xl bg-white p-5">
            <Text
                className="mb-4 text-xs text-black/50"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                Откуда переводим
            </Text>
            <View className="flex-row items-center gap-3">
                <Gradient
                    colors={gradientColors.lightGray}
                    className="size-12 items-center justify-center rounded-2xl"
                >
                    <CreditCard size={24} color="#000000d4" />
                </Gradient>
                <View className="min-w-0 flex-1">
                    <Text
                        className="text-sm text-black"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        {transferSourceCard.title} •••• {transferSourceCard.lastFour}
                    </Text>
                    <Text
                        className="mt-1 text-sm text-black/50"
                        style={{ fontFamily: "Jost_500Medium" }}
                    >
                        Доступно {formatTransferMoney(transferSourceCard.balance)}
                    </Text>
                </View>
            </View>
        </View>
    );
}
