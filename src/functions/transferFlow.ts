import type { Receiver } from "@/constants/receivers";
import type { TransferMethod } from "@/constants/transferFlow";
import type { Transfer } from "@/constants/transfers";

export type TransferDraft = {
    id: string;
    method: TransferMethod;
    receiverId: string | null;
    amountInput: string;
    phase: "editing" | "submitting" | "completed";
};

export type TransferSession = {
    draft: TransferDraft | null;
    localTransfers: Transfer[];
};

export type TransferSessionAction =
    | { type: "start"; id: string; method: TransferMethod }
    | { type: "selectReceiver"; receiverId: string }
    | { type: "setAmount"; value: string }
    | { type: "submit"; transfer: Transfer }
    | { type: "complete"; id: string };

export function validateTransferAmount(input: string, balanceMinor: number) {
    const value = input.replace(/\s/g, "");
    if (!value) return { amountMinor: null, error: "Введите сумму перевода" };
    if (!/^\d+(?:[.,]\d{1,2})?$/.test(value)) {
        return { amountMinor: null, error: "Введите сумму с точностью до двух знаков" };
    }

    const [rubles, kopecks = ""] = value.split(/[.,]/);
    const amountMinor = Number(rubles) * 100 + Number(kopecks.padEnd(2, "0"));
    if (!Number.isSafeInteger(amountMinor) || amountMinor > balanceMinor) {
        return { amountMinor: null, error: "Недостаточно средств на карте" };
    }
    if (amountMinor <= 0) {
        return { amountMinor: null, error: "Сумма должна быть больше 0 ₽" };
    }
    return { amountMinor, error: null };
}

export function formatTransferMoney(amountMinor: number) {
    return (amountMinor / 100).toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: amountMinor % 100 === 0 ? 0 : 2,
        maximumFractionDigits: 2,
    });
}

export function selectCardReceivers(
    receivers: readonly Receiver[],
    lastFour: Readonly<Record<string, string>>,
    query: string,
    sortByName: boolean,
) {
    const text = query.trim().toLocaleLowerCase("ru");
    const digits = /^[\d\s•*-]+$/.test(text) ? text.replace(/\D/g, "") : "";
    const matches = receivers.filter((receiver) =>
        receiver.name.toLocaleLowerCase("ru").includes(text)
        || (digits !== "" && lastFour[receiver.id]?.includes(digits)),
    );
    return sortByName
        ? matches.sort((a, b) => a.name.localeCompare(b.name, "ru"))
        : matches;
}

export function transferSessionReducer(
    state: TransferSession,
    action: TransferSessionAction,
): TransferSession {
    switch (action.type) {
        case "start":
            return {
                ...state,
                draft: {
                    id: action.id,
                    method: action.method,
                    receiverId: null,
                    amountInput: "",
                    phase: "editing",
                },
            };
        case "selectReceiver":
            if (!state.draft || state.draft.phase !== "editing") return state;
            return {
                ...state,
                draft: {
                    ...state.draft,
                    receiverId: action.receiverId,
                    amountInput: state.draft.receiverId === action.receiverId
                        ? state.draft.amountInput : "",
                },
            };
        case "setAmount":
            if (!state.draft || state.draft.phase !== "editing") return state;
            return { ...state, draft: { ...state.draft, amountInput: action.value } };
        case "submit":
            if (!state.draft || state.draft.phase !== "editing"
                || action.transfer.id !== state.draft.id
                || action.transfer.receiverId !== state.draft.receiverId
                || state.localTransfers.some((item) => item.id === action.transfer.id)) {
                return state;
            }
            return {
                draft: { ...state.draft, phase: "submitting" },
                localTransfers: [action.transfer, ...state.localTransfers],
            };
        case "complete":
            if (!state.localTransfers.some((item) => item.id === action.id && item.status === "processing")) {
                return state;
            }
            return {
                draft: state.draft?.id === action.id
                    ? { ...state.draft, phase: "completed" } : state.draft,
                localTransfers: state.localTransfers.map((item) =>
                    item.id === action.id ? { ...item, status: "completed" } : item,
                ),
            };
    }
}
