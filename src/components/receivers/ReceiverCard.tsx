import { ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import type { Receiver } from "@/constants/receivers";

type ReceiverCardProps = {
    receiver: Receiver;
    onPress?: () => void;
    secondaryText?: string;
    description?: string;
};

export default function ReceiverCard({
    receiver, onPress, secondaryText = receiver.phone, description = receiver.description,
}: ReceiverCardProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={!onPress}
            accessibilityRole={onPress ? "button" : undefined}
            accessibilityLabel={onPress ? `${receiver.name}. ${secondaryText}. ${description}` : undefined}
            className="min-h-28 flex-row items-center gap-3 rounded-3xl bg-white p-5"
        >
            <View className="flex-1 gap-1">
                <Text
                    className="text-base text-black"
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                    {receiver.name}
                </Text>
                <Text
                    className="text-base text-black/50"
                    style={{ fontFamily: "Jost_500Medium" }}
                >
                    {secondaryText}
                </Text>
                <Text
                    className="text-xs leading-5 text-black/50"
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                    {description}
                </Text>
            </View>
            <ChevronRight size={20} color="#00000080" />
        </Pressable>
    );
}
