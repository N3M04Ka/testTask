import { Stack } from "expo-router";
// import { TransferProvider } from "@/providers/TransferProvider";
// import "../styles/global.css";
export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="transfers" />
            <Stack.Screen name="transfer" />
        </Stack>
    );
}
