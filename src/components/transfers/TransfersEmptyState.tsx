import { SearchX } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import Gradient from "@/components/ui/Gradient";
import { gradientColors } from "@/constants/gradien";

type TransfersEmptyStateProps = {
    onClear: () => void;
};

export default function TransfersEmptyState({ onClear }: TransfersEmptyStateProps) {
    return (
        <View className="items-center rounded-3xl bg-white px-5 py-8">
            <Gradient
                colors={gradientColors.lightOrange}
                className="size-14 items-center justify-center rounded-2xl"
            >
                <SearchX size={28} color="#FF5D15" />
            </Gradient>
            <Text
                className="mt-5 text-center text-base text-black"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                Ничего не найдено
            </Text>
            <Text
                className="mt-2 text-center text-sm leading-6 text-black/50"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                Попробуйте другое имя или номер
            </Text>
            <Pressable
                accessibilityRole="button"
                onPress={onClear}
                className="mt-6 self-stretch rounded-2xl active:opacity-70"
            >
                <Gradient className="min-h-12 items-center justify-center rounded-2xl px-5 py-3">
                    <Text
                        className="text-center text-sm text-white"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Очистить поиск
                    </Text>
                </Gradient>
            </Pressable>
        </View>
    );
}
