import { Pressable, Text } from "react-native";

import Gradient from "@/components/ui/Gradient";
import { gradientColors } from "@/constants/gradien";

type TransferButtonProps = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
};

export default function TransferButton({ title, onPress, disabled = false }: TransferButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={title}
            accessibilityState={{ disabled }}
            className="rounded-2xl active:opacity-80"
        >
            <Gradient
                colors={disabled ? gradientColors.lightGray : gradientColors.orange}
                className="min-h-14 items-center justify-center rounded-2xl px-4 py-4"
            >
                <Text
                    className={`text-center text-base ${disabled ? "text-black/40" : "text-white"}`}
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                    {title}
                </Text>
            </Gradient>
        </Pressable>
    );
}
