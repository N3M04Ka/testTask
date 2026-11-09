import Gradient from "@/components/ui/Gradient";
import { Tabs, router } from "expo-router";
import { CreditCard, Home, SquareArrowRight, Users } from "lucide-react-native";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { gradientColors } from "../../constants/gradien";

import qrcodeImg from "@/assets/icons/qrCode.png";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#000000",
                tabBarInactiveTintColor: "#00000080",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Главная",
                    tabBarIcon: ({ color, focused }) => (
                        <Home color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="payments"
                options={{
                    title: "Платежи",
                    tabBarIcon: ({ color, focused }) => (
                        <SquareArrowRight color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="scannerBtn"
                options={{
                    title: "",
                    tabBarButton: () => (
                        <View className="flex-1 items-center">
                            <Pressable
                                onPress={() => router.push("/scannerBtn")}
                                style={{elevation:6}}
                                className="bottom-7 active:scale-95 bg-[#FF5A24] rounded-3xl"
                            >
                                <Gradient
                                    className="w-[70px] aspect-square rounded-3xl items-center justify-center"
                                    colors={gradientColors.orange}
                                >
                                    <Image
                                        source={qrcodeImg}
                                        className="size-10 mt-2.5"
                                    />
                                </Gradient>
                            </Pressable>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="cards"
                options={{
                    title: "Карты",
                    tabBarIcon: ({ color, focused }) => (
                        <CreditCard color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="receivers"
                options={{
                    title: "Получатели",
                    tabBarIcon: ({ color, focused }) => (
                        <Users color={color} size={24} />
                    ),
                }}
            />
        </Tabs>
    );
}
