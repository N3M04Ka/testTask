import { ArrowDownWideNarrow, Search, X } from "lucide-react-native";
import { Pressable, Text, TextInput, View } from "react-native";

import AddReceiverButton from "@/components/receivers/AddReceiverButton";
import Gradient from "@/components/ui/Gradient";
import { gradientColors } from "@/constants/gradien";

type ReceiversHeaderProps = {
    query: string;
    onQueryChange: (query: string) => void;
    count: number;
    sortByName: boolean;
    onToggleSort: () => void;
};

export default function ReceiversHeader({
    query,
    onQueryChange,
    count,
    sortByName,
    onToggleSort,
}: ReceiversHeaderProps) {
    return (
        <View className="pb-4">
            <View className="flex-row items-center gap-3">
                <View className="min-h-[52px] flex-1 flex-row items-center gap-2 rounded-2xl bg-white pl-4 pr-2">
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
                <AddReceiverButton />
            </View>

            <View className="mt-6 flex-row items-center justify-between gap-3">
                <View className="flex-1 flex-row items-center gap-2">
                    <Text
                        accessibilityRole="header"
                        className="shrink text-lg text-black"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        {sortByName ? "Получатели по имени" : "Недавние получатели"}
                    </Text>
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
                </View>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                        sortByName
                            ? "Сортировка по имени. Показать недавних получателей"
                            : "Сортировка по недавним. Отсортировать по имени"
                    }
                    accessibilityState={{ selected: sortByName }}
                    onPress={onToggleSort}
                    className="rounded-2xl active:opacity-70"
                >
                    <Gradient
                        colors={gradientColors.lightOrange}
                        className="size-11 items-center justify-center rounded-2xl"
                    >
                        <ArrowDownWideNarrow size={20} color="#FF5D15" />
                    </Gradient>
                </Pressable>
            </View>
        </View>
    );
}
