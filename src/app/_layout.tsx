import { Stack } from "expo-router";
import { TransferProvider } from "@/providers/TransferProvider";
import "@/styles/global.css";
export default function RootLayout() {
    return (
        <TransferProvider>
            <Stack screenOptions={{headerShown:false}}>
                {/* <Stack.Screen name="/app"/> */}
                <Stack.Screen name="index"/>
            </Stack>
        </TransferProvider>
    );
}
