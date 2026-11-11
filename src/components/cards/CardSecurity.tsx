import {
    Banknote,
    ChevronRight,
    KeyRound,
    ShieldCheck,
    ShoppingBag,
    type LucideIcon,
} from "lucide-react-native";
import { Pressable, Text, View, Switch } from "react-native";
import {useState} from 'react';

type ControlsType = {
    title: string;
    description: string;
    Icon: LucideIcon;
};
const controls: ControlsType[] = [
    {
        title: "Покупки в интернете",
        description: "С подтверждением кодом",
        Icon: ShoppingBag,
    },
    { title: "Снятие наличных", description: "В банкоматах", Icon: Banknote },
    {
        title: "Защита за границей",
        description: "Блокировка подозрительных списаний",
        Icon: ShieldCheck,
    },
];

function CardSecurityItem({ title, Icon, description }: ControlsType) {
    const [isEnabled,setIsEnabled]=useState<boolean>(true);
    return (
        <View key={title} className="mt-5 flex-row items-center gap-3">
            <View className="size-10 items-center justify-center rounded-xl bg-gray-100">
                <Icon size={20} color="#00000080" />
            </View>
            <View className="min-w-0 flex-1">
                <Text
                    className="text-sm text-black"
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                    {title}
                </Text>
                <Text
                    className="mt-1 text-xs leading-5 text-black/50"
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                    {description}
                </Text>
            </View>
            <Switch
                value={isEnabled}
                onChange={()=>setIsEnabled(p=>!p)}
                trackColor={{ true: "#FF6027", false: "#00000040" }}
                thumbColor={"#ffffff"}
                ios_backgroundColor="#00000040"
            />
        </View>
    );
}
export default function CardSecurity() {
    return (
        <View className="mt-5 w-11/12 rounded-3xl bg-white p-5">
            <Text
                accessibilityRole="header"
                className="text-lg text-black"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                Безопасность карты
            </Text>
            {controls.map((el) => (
                <CardSecurityItem
                    title={el.title}
                    description={el.description}
                    Icon={el.Icon}
                    key={el.title}
                />
            ))}
            <Pressable
                disabled
                accessibilityRole="button"
                accessibilityLabel="Изменить ПИН-код"
                accessibilityState={{ disabled: true }}
                className="mt-5 flex-row items-center gap-3 border-t border-gray-100 pt-5"
            >
                <View className="size-10 items-center justify-center rounded-xl bg-gray-100">
                    <KeyRound size={20} color="#00000080" />
                </View>
                <View className="min-w-0 flex-1">
                    <Text
                        className="text-sm text-black"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Изменить ПИН-код
                    </Text>
                    <Text
                        className="mt-1 text-xs leading-5 text-black/50"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Для банкоматов и терминалов
                    </Text>
                </View>
                <ChevronRight size={18} color="#00000080" />
            </Pressable>
        </View>
    );
}
