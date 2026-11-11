import type { Receiver } from "@/constants/receivers";
import { type currencyType } from "./currencySymbols";
export type TransferStatus = "completed" | "processing" | "declined";

export type Transfer = {
    id: string;
    receiverId: Receiver["id"];
    date: Date;
    bank: string;
    status: TransferStatus;
    amount: number;
    currency: currencyType;
    details: string;
};

export const transferStatuses = {
    completed: {
        label: "Выполнен",
        backgroundClassName: "bg-green-50",
        textClassName: "text-green-600",
    },
    processing: {
        label: "В обработке",
        backgroundClassName: "bg-[#00000010]",
        textClassName: "text-[#000000d0]",
    },
    declined: {
        label: "Отклонён",
        backgroundClassName: "bg-red-50",
        textClassName: "text-red-500",
    },
} as const;

export const transfersArray: readonly Transfer[] = [
    {
        id: "transfer-1",
        receiverId: "2",
        date: new Date("2026-11-10T14:32:00"),
        bank: "Банк Зираат",
        status: "completed",
        amount: 5420,
        currency: "TRY",
        details: "−15 150 ₽",
    },
    {
        id: "transfer-2",
        receiverId: "1",
        date: new Date("2026-11-10T11:15:00"),
        bank: "Банк Барклайс",
        status: "processing",
        amount: -35000,
        currency: "RUB",
        details: "≈ 302,14 GBP",
    },
    {
        id: "transfer-3",
        receiverId: "2",
        date: new Date("2026-11-09T17:20:00"),
        bank: "Банк Зираат",
        status: "completed",
        amount: -7500,
        currency: "RUB",
        details: "2 680 TRY",
    },
    {
        id: "transfer-4",
        receiverId: "3",
        date: new Date("2026-11-09T10:40:00"),
        bank: "Государственный банк Индии",
        status: "declined",
        amount: -8500,
        currency: "RUB",
        details: "Ошибка шлюза",
    },
    {
        id: "transfer-5",
        receiverId: "4",
        date: new Date("2026-11-08T10:20:00"),
        bank: "Банк ББВА Мексика",
        status: "completed",
        amount: -12200,
        currency: "RUB",
        details: "2 284 MXN",
    },
    {
        id: "transfer-6",
        receiverId: "1",
        date: new Date("2026-11-08T09:10:00"),
        bank: "Банк Барклайс",
        status: "completed",
        amount: -12500,
        currency: "RUB",
        details: "≈ 108,25 GBP",
    },
];
