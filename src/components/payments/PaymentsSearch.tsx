import { Search } from "lucide-react-native";
import { Keyboard, TextInput, View } from "react-native";

type PaymentsSearchProps = {
    query: string;
    onQueryChange: (query: string) => void;
};

export default function PaymentsSearch({ query, onQueryChange }: PaymentsSearchProps) {
    return (
        <View className="min-h-14 flex-row items-center gap-3 rounded-2xl bg-white px-4">
            <Search size={18} color="#00000080" />
            <TextInput
                value={query}
                onChangeText={onQueryChange}
                placeholder="Поиск операции, услуги или банка"
                accessibilityLabel="Поиск операции, услуги или банка"
                placeholderTextColor="#00000080"
                className="min-w-0 flex-1 py-4 text-xs text-black"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
                autoCorrect={false}
                autoCapitalize="none"
                autoComplete="off"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                underlineColorAndroid="transparent"
            />
        </View>
    );
}
