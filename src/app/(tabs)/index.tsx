import Profile from "@/components/home/Profile";
import Suggestions from "@/components/home/Suggestions";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FinancialOperations from "@/components/home/FInancialOperations";
import TotalBalance from "@/components/home/TotalBalance";
import AllOperations from "@/components/home/AllOperations";

export default function Index() {
    return (
        <SafeAreaView
            className="items-center pt-3"
            style={{ backgroundColor: "#D9D9D910" }}
            edges={["top","left","right"]}
        >
            <ScrollView  className="pt-3 h-full" contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#D9D9D910" }}>
                <Profile />
                <Suggestions />
                <TotalBalance />
                <FinancialOperations />
                <AllOperations />
            </ScrollView>
        </SafeAreaView>
    );
}
