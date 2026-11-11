import { Text, View } from "react-native";

export default function TransferEmptyState() {
    return (
        <View className="items-center rounded-3xl bg-white px-5 py-10">
            <Text
                className="text-center text-base text-black"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                Получатели не найдены
            </Text>
            <Text
                className="mt-2 text-center text-sm text-black/50"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                Попробуйте другое имя или номер
            </Text>
        </View>
    );
}
