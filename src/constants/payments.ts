import {
    ArrowLeftRight,
    ArrowUpRight,
    Building2,
    CreditCard,
    Globe,
    Heart,
    House,
    Landmark,
    Plus,
    QrCode,
    Smartphone,
    Wifi,
    type LucideIcon,
} from "lucide-react-native";

import { currencySymbols } from "@/constants/currencySymbols";
import { gradientColors } from "@/constants/gradien";
import type { Receiver } from "@/constants/receivers";

export const paymentTones = {
    orange: { colors: gradientColors.lightOrange, iconColor: "#FF5D15" },
    gray: { colors: gradientColors.lightGray, iconColor: "#000000d4" },
    blue: { colors: gradientColors.lightBlue, iconColor: "#0BA3FF" },
} as const;

type PaymentTone = keyof typeof paymentTones;

type PaymentIcon = {
    icon: LucideIcon;
    tone: PaymentTone;
};

export type PaymentTemplate = PaymentIcon & { id: string } & (
    | { label: string; receiverId?: never }
    | { label?: never; receiverId: Receiver["id"] }
);

export type PeopleTransferOption = PaymentIcon & {
    id: string;
    title: string;
    description: string;
};

export type PaymentService = PaymentIcon & {
    id: string;
    title: string;
    description: string;
};

export const paymentTemplates: readonly PaymentTemplate[] = [
    { id: "create", label: "Создать", icon: Plus, tone: "orange" },
    { id: "mother", label: "Маме", icon: Heart, tone: "gray" },
    { id: "elif", receiverId: "2", icon: ArrowUpRight, tone: "blue" },
    { id: "rent", label: "Аренда", icon: House, tone: "gray" },
    { id: "ivan", receiverId: "6", icon: ArrowUpRight, tone: "orange" },
];

export const peopleTransferOptions: readonly PeopleTransferOption[] = [
    {
        id: "phone",
        title: "По номеру телефона",
        description: "СБП, без комиссии, мгновенно",
        icon: Smartphone,
        tone: "orange",
    },
    {
        id: "card",
        title: "По номеру карты",
        description: "На карты банков России и мира",
        icon: CreditCard,
        tone: "gray",
    },
    {
        id: "abroad",
        title: "За рубеж",
        description: "Турция, СНГ, ОАЭ, Индонезия и Европа",
        icon: Globe,
        tone: "blue",
    },
    {
        id: "own-accounts",
        title: "Между своими счетами",
        description: "Моментально между картами и валютами",
        icon: ArrowLeftRight,
        tone: "gray",
    },
];

export const paymentServices: readonly PaymentService[] = [
    {
        id: "qr",
        title: "Оплата по QR",
        description: "В магазинах и по чекам",
        icon: QrCode,
        tone: "orange",
    },
    {
        id: "bank-details",
        title: "По реквизитам",
        description: "Юрлицам, ИП, налоги",
        icon: Landmark,
        tone: "gray",
    },
    {
        id: "internet",
        title: "Связь и интернет",
        description: "МТС, Билайн, Т2, Мегафон",
        icon: Wifi,
        tone: "blue",
    },
    {
        id: "utilities",
        title: "ЖКХ и госуслуги",
        description: "Штрафы, коммунальные платежи",
        icon: Building2,
        tone: "gray",
    },
];
