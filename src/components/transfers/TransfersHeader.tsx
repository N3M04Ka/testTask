import { Search, X } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

import Gradient from "@/components/ui/Gradient";
import { gradientColors } from "@/constants/gradien";

type TransfersHeaderProps = {
    query: string;
    onQueryChange: (query: string) => void;
    count: number | null;
};

export default function TransfersHeader({ query, onQueryChange, count }: TransfersHeaderProps) {
    return (
        <View className="pb-4">
            <View className="min-h-[52px] flex-row items-center gap-2 rounded-2xl bg-white pl-4 pr-2">
                <Search size={18} color="#00000080" />
                <TextInput
                    accessibilityLabel="Поиск по имени или номеру"
                    placeholder="Поиск по имени или номеру"
                    placeholderTextColor="#00000080"
                    className="min-h-[52px] min-w-0 flex-1 py-3 text-sm text-black"
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                    value={query}
                    onChangeText={onQueryChange}
                    autoCorrect={false}
                    autoCapitalize="none"
                    autoComplete="off"
                    returnKeyType="search"
                    underlineColorAndroid="transparent"
                />
                {query.length > 0 && (
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Очистить поиск"
                        onPress={() => onQueryChange("")}
                        className="size-10 items-center justify-center rounded-xl active:bg-gray-100"
                    >
                        <X size={18} color="#00000080" />
                    </Pressable>
                )}
            </View>
            <View className="mt-6 min-h-8 flex-row items-center gap-2">
                <Text
                    accessibilityRole="header"
                    className="shrink text-lg text-black"
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                    История переводов
                </Text>
                {count !== null && (
                    <Gradient
                        colors={gradientColors.lightOrange}
                        className="min-w-7 items-center justify-center rounded-full px-2 py-1"
                    >
                        <Text
                            className="text-sm text-black"
                            style={{ fontFamily: "Jost_500Medium" }}
                        >
                            {count}
                        </Text>
                    </Gradient>
                )}
            </View>
        </View>
    );
}
