import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    type ReactNode,
} from "react";

import {
    getTransferReceiver,
    transferMethodLabels,
    transferSourceCard,
    type TransferMethod,
} from "@/constants/transferFlow";
import { transfersArray, type Transfer } from "@/constants/transfers";
import {
    transferSessionReducer,
    validateTransferAmount,
    type TransferDraft,
} from "@/functions/transferFlow";

type TransferContextValue = {
    draft: TransferDraft | null;
    transfers: readonly Transfer[];
    startTransfer: (method: TransferMethod) => void;
    selectReceiver: (receiverId: string) => void;
    setAmountInput: (value: string) => void;
    submitTransfer: () => boolean;
};

const TransferContext = createContext<TransferContextValue | null>(null);

export function TransferProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(transferSessionReducer, {
        draft: null,
        localTransfers: [],
    });
    const sequence = useRef(0);
    const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
    const { draft } = state;

    useEffect(() => {
        const pendingTimers = timers.current;
        return () => {
            pendingTimers.forEach(clearTimeout);
            pendingTimers.clear();
        };
    }, []);

    const transfers = useMemo(() =>
        [...state.localTransfers, ...transfersArray]
            .sort((a, b) => b.date.getTime() - a.date.getTime()),
    [state.localTransfers]);

    function startTransfer(method: TransferMethod) {
        sequence.current += 1;
        dispatch({ type: "start", id: `local-${Date.now()}-${sequence.current}`, method });
    }

    function selectReceiver(receiverId: string) {
        if (getTransferReceiver(receiverId)) {
            dispatch({ type: "selectReceiver", receiverId });
        }
    }

    function setAmountInput(value: string) {
        dispatch({ type: "setAmount", value });
    }

    function submitTransfer() {
        if (!draft || draft.phase !== "editing" || timers.current.has(draft.id)) return false;
        const recipient = getTransferReceiver(draft.receiverId);
        const { amountMinor } = validateTransferAmount(draft.amountInput, transferSourceCard.balance);
        if (!recipient || amountMinor === null) return false;

        const id = draft.id;
        dispatch({
            type: "submit",
            transfer: {
                id,
                receiverId: recipient.receiver.id,
                date: new Date(),
                bank: recipient.bank,
                status: "processing",
                amount: -amountMinor / 100,
                currency: "RUB",
                details: `${transferMethodLabels[draft.method]} · ${
                    draft.method === "phone" ? recipient.receiver.phone : recipient.maskedCard
                }`,
            },
        });
        timers.current.set(id, setTimeout(() => {
            dispatch({ type: "complete", id });
            timers.current.delete(id);
        }, 800));
        return true;
    }

    return (
        <TransferContext.Provider value={{
            draft, transfers, startTransfer, selectReceiver, setAmountInput, submitTransfer,
        }}>
            {children}
        </TransferContext.Provider>
    );
}

export function useTransfer() {
    const context = useContext(TransferContext);
    if (!context) throw new Error("TransferProvider is missing");
    return context;
}
