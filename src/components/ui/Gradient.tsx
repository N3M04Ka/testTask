import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

type GradientProps = {
    children?: React.ReactNode;
    className?: string;
    colors?: readonly [string, string, ...string[]];
};

export default function Gradient({
    children,
    className = "",
    colors = ["#FF9468", "#FF6027", "#FF1A00"],
}: GradientProps) {
    return (
        <View className={`overflow-hidden ${className}`}>
            <LinearGradient
                colors={colors}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFill}
            />
            {children}
        </View>
    );
}
