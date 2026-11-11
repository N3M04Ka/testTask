import { Pressable, Text, View } from "react-native";

import Gradient from "@/components/ui/Gradient";
import { paymentServices, paymentTones } from "@/constants/payments";

export default function PaymentServices() {
    const rows = [paymentServices.slice(0, 2), paymentServices.slice(2, 4)];

    return (
        <View className="mt-5 w-11/12 rounded-3xl bg-white p-5">
            <Text
                accessibilityRole="header"
                className="mb-1 text-lg text-black"
                style={{ fontFamily: "Montserrat_600SemiBold" }}
            >
                Платежи и услуги
            </Text>
            {rows.map((row) => (
                <View key={row[0].id} className="mt-3 flex-row gap-3">
                    {row.map(({ id, title, description, icon: Icon, tone }) => (
                        <Pressable
                            key={id}
                            disabled
                            accessibilityRole="button"
                            accessibilityLabel={`${title}. ${description}`}
                            accessibilityState={{ disabled: true }}
                            className="min-h-40 min-w-0 flex-1 items-start rounded-2xl bg-gray-50 p-3"
                        >
                            <Gradient
                                colors={paymentTones[tone].colors}
                                className="size-11 items-center justify-center rounded-2xl"
                            >
                                <Icon size={22} color={paymentTones[tone].iconColor} />
                            </Gradient>
                            <Text
                                className="mt-3 w-full text-sm leading-5 text-black"
                                style={{ fontFamily: "Montserrat_600SemiBold" }}
                            >
                                {title}
                            </Text>
                            <Text
                                className="mt-1 w-full text-xs leading-5 text-black/50"
                                style={{ fontFamily: "Montserrat_600SemiBold" }}
                            >
                                {description}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            ))}
        </View>
    );
}
