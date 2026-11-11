import { Plus } from "lucide-react-native";
import { Pressable, Text } from "react-native";

import Gradient from "@/components/ui/Gradient";
import { gradientColors } from "@/constants/gradien";



export default function AddReceiverButton() {
    return (
        <Pressable
            disabled
            accessibilityRole="button"
            accessibilityLabel="Добавить нового получателя"
            accessibilityState={{ disabled: true }}
            className="shrink-0"
        >
            <Gradient
                colors={gradientColors.orange}
                className="size-[52px] items-center justify-center rounded-2xl"
            >
                <Plus size={25} color="#FFFFFF" />
            </Gradient>
        </Pressable>
    );
}
