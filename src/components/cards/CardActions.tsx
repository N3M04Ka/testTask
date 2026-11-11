import { ArrowDownToLine, FileText, SlidersHorizontal, Snowflake,type LucideIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import Gradient from "@/components/ui/Gradient";
import { gradientColors } from "@/constants/gradien";

type gradientColors=readonly [string,string,...string[]];
type ActionType={
    title:string,
    icon:LucideIcon,
    color:string,
    backGroundGradient:gradientColors,
}
const actions:ActionType[] = [
    { title: "Пополнить", icon: ArrowDownToLine, color:"#FF5D15",backGroundGradient:gradientColors.lightOrange},
    { title: "Реквизиты", icon: FileText, color:"#000000d4",backGroundGradient:gradientColors.lightGray},
    { title: "Лимиты", icon: SlidersHorizontal, color:"#000000d4",backGroundGradient:gradientColors.lightGray},
    { title: "Заморозка", icon: Snowflake, color:"#0BA3FF",backGroundGradient:gradientColors.lightBlue},
];

export default function CardActions() {
    return (
        <View className="mt-5 w-11/12 flex-row gap-1 rounded-3xl bg-white px-3 py-5">
            {actions.map(({ title, icon: Icon,color,backGroundGradient }) => (
                <Pressable
                    key={title}
                    disabled
                    accessibilityRole="button"
                    accessibilityLabel={title}
                    accessibilityState={{ disabled: true }}
                    className="min-w-0 flex-1 items-center gap-3"
                >
                    <Gradient
                        colors={backGroundGradient}
                        className="size-12 items-center justify-center rounded-2xl"
                    >
                        <Icon size={22} color={color} />
                    </Gradient>
                    <Text
                        className="w-full text-center text-xs text-black"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        {title}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}
