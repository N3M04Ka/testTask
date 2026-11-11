import { FlatList, Pressable, Text, View } from "react-native";

import Gradient from "@/components/ui/Gradient";
import {
    paymentTemplates,
    paymentTones,
    type PaymentTemplate,
} from "@/constants/payments";
import { receiversArray } from "@/constants/receivers";

export default function RecentTemplates() {
    return (
        <View className="mt-5 w-11/12 rounded-3xl bg-white py-5">
            <View className="flex-row items-center justify-between gap-3 px-5">
                <Text
                    accessibilityRole="header"
                    className="min-w-0 flex-1 text-lg text-black"
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                    Недавние шаблоны
                </Text>
                <Pressable
                    disabled
                    accessibilityRole="button"
                    accessibilityLabel="Все шаблоны"
                    accessibilityState={{ disabled: true }}
                    className="min-h-11 min-w-11 items-end justify-center"
                >
                    <Text
                        className="text-sm text-black/50"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        Все
                    </Text>
                </Pressable>
            </View>
            <FlatList
                horizontal
                data={paymentTemplates}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TemplateItem template={item} />}
                contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
                style={{ flexGrow: 0, marginTop: 12 }}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
            />
        </View>
    );
}

function TemplateItem({ template }: { template: PaymentTemplate }) {
    const label = template.receiverId
        ? receiversArray.find((receiver) => receiver.id === template.receiverId)?.name
        : template.label;
    const Icon = template.icon;
    const tone = paymentTones[template.tone];

    if (!label) return null;

    return (
        <Pressable
            disabled
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ disabled: true }}
            className="w-[76px] items-center gap-3"
        >
            <Gradient
                colors={tone.colors}
                className="size-14 items-center justify-center rounded-2xl"
            >
                <Icon size={24} color={tone.iconColor} />
            </Gradient>
            <Text
                className="w-full text-center text-xs leading-5 text-black"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                {label}
            </Text>
        </Pressable>
    );
}
