import { useEffect } from "react";
import { Animated, useAnimatedValue, View } from "react-native";

export default function TransfersSkeleton() {
    const opacity = useAnimatedValue(0.4);

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                    isInteraction: false,
                }),
                Animated.timing(opacity, {
                    toValue: 0.4,
                    duration: 400,
                    useNativeDriver: true,
                    isInteraction: false,
                }),
            ]),
        );
        animation.start();
        return () => animation.stop();
    }, [opacity]);

    return (
        <View accessibilityRole="progressbar" accessibilityLabel="Загрузка переводов" className="gap-3">
            {[1, 2, 3].map((id) => (
                <View key={id} className="rounded-3xl bg-white p-5" accessible={false}>
                    <Animated.View style={{ opacity }}>
                        <View className="flex-row justify-between gap-5">
                            <View className="h-5 w-2/5 rounded-md bg-gray-200" />
                            <View className="h-6 w-1/3 rounded-md bg-gray-200" />
                        </View>
                        <View className="mt-3 h-3 w-1/3 rounded-md bg-gray-200" />
                        <View className="mt-2 h-3 w-1/2 rounded-md bg-gray-200" />
                        <View className="mt-4 h-6 w-24 rounded-full bg-gray-200" />
                    </Animated.View>
                </View>
            ))}
        </View>
    );
}
