import type { currencyType } from "@/constants/currencySymbols";
import { gradientColors } from "@/constants/gradien";

export type BankCard = {
    id: string;
    title: string;
    subtitle: string;
    currency: currencyType;
    balance: number;
    rubleEquivalent?: number;
    lastFour: string;
    expires: string;
    theme: "dark" | "orange";
    cashback?: number;
    monthlyLimit: number;
    categories: readonly {
        name: string;
        amount: number;
        color: string;
    }[];
};

export const cardGradientColors = {
    dark: ["#303030", "#000000"],
    orange: gradientColors.orange,
} as const;

export const bankCards: readonly BankCard[] = [
    {
        id: "main-card",
        title: "Основная карта",
        subtitle: "Основная · Активна",
        currency: "RUB",
        balance: 15009050,
        lastFour: "4412",
        expires: "08/28",
        theme: "dark",
        cashback: 15,
        monthlyLimit: 10000000,
        categories: [
            { name: "Супермаркеты", amount: 412000, color: "#FF6027" },
            { name: "Рестораны", amount: 2927000, color: "#FF9468" },
        ],
    },
    {
        id: "travel-card",
        title: "Для путешествий",
        subtitle: "IDR / Рубли",
        currency: "IDR",
        balance: 36955282,
        rubleEquivalent: 184776,
        lastFour: "8904",
        expires: "11/27",
        theme: "orange",
        monthlyLimit: 20000000,
        categories: [
            { name: "Супермаркеты", amount: 824000, color: "#FF6027" },
            { name: "Рестораны", amount: 585400, color: "#FF9468" },
        ],
    },
];
