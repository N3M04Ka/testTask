import { bankCards } from "@/constants/cards";
import { receiversArray } from "@/constants/receivers";
import { transfersArray } from "@/constants/transfers";

export type TransferMethod = "phone" | "card";

export const transferMethodLabels: Record<TransferMethod, string> = {
    phone: "По номеру телефона",
    card: "По номеру карты",
};

export const transferSourceCard = bankCards.find((card) => card.id === "main-card")!;

export const receiverCardLastFour: Readonly<Record<string, string>> = {
    "1": "1458",
    "2": "6029",
    "3": "2841",
    "4": "7623",
    "5": "9306",
    "6": "5184",
};

export function getTransferReceiver(receiverId: string | null) {
    const receiver = receiversArray.find((item) => item.id === receiverId);
    if (!receiver) return null;

    const bank = transfersArray.find((item) => item.receiverId === receiver.id)?.bank
        ?? receiver.description.split(" • ")[0];

    return {
        receiver,
        bank,
        maskedCard: `•••• ${receiverCardLastFour[receiver.id]}`,
    };
}
