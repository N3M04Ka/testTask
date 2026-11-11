import type { Receiver } from "@/constants/receivers";

export function selectReceivers(
    receivers: readonly Receiver[],
    query: string,
    sortByName: boolean,
): Receiver[] {
    const text = query.trim().toLocaleLowerCase("ru");

    const looksLikePhone = /^[\d\s+().-]+$/.test(text);
    const digits = looksLikePhone ? text.replace(/\D/g, "") : "";

    const result = receivers.filter((receiver) => {
        const nameMatches = receiver.name.toLocaleLowerCase("ru").includes(text);
        const phoneMatches =
            digits !== "" && receiver.phone.replace(/\D/g, "").includes(digits);

        return nameMatches || phoneMatches;
    });

    if (sortByName) {
        result.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    }

    return result;
}
