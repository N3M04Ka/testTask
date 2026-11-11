import type { Receiver } from "@/constants/receivers";
import type { Transfer } from "@/constants/transfers";
import { selectReceivers } from "@/functions/selectReceivers";

export function selectTransfers(
    transfers: readonly Transfer[],
    receivers: readonly Receiver[],
    query: string,
): Transfer[] {
    const receiverIds = new Set(
        selectReceivers(receivers, query, false).map((receiver) => receiver.id),
    );
    return transfers.filter((transfer) => receiverIds.has(transfer.receiverId));
}
