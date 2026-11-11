// fakeTransferApi.ts — имитация бэкенда переводов. Этот файл не меняйте, только импортируйте.
export type TransferStatus = "pending" | "success" | "failed";

export type Transfer = {
    id: string;
    recipientId: string;
    amountKopecks: number;
    status: TransferStatus;
    createdAt: string;
};

export class TransferApiError extends Error {
    constructor(
        public code: "NETWORK" | "SERVER" | "NOT_FOUND" | "VALIDATION",
        message: string,
    ) {
        super(message);
    }
}

type Stored = Transfer & { settlesAt: number; outcome: TransferStatus };

const store = new Map<string, Stored>();
const byIdempotencyKey = new Map<string, string>();
let random = Math.random;

function mulberry32(seed: number) {
    return () => {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const view = ({ settlesAt, outcome, ...transfer }: Stored): Transfer => ({
    ...transfer,
    status: Date.now() >= settlesAt ? outcome : "pending",
});

/** Вызовите один раз при старте приложения: initTransferApi('p2p-2026'). */
export function initTransferApi(seed: string) {
    random = mulberry32(
        [...seed].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7),
    );
}

export async function createTransfer(input: {
    recipientId: string;
    amountKopecks: number;
    idempotencyKey?: string;
}): Promise<Transfer> {
    await sleep(300 + random() * 2200);
    if (random() < 0.1)
        throw new TransferApiError("SERVER", "Сервис временно недоступен");
    if (!Number.isInteger(input.amountKopecks) || input.amountKopecks <= 0) {
        throw new TransferApiError(
            "VALIDATION",
            "amountKopecks должен быть целым числом больше 0",
        );
    }

    const knownId =
        input.idempotencyKey && byIdempotencyKey.get(input.idempotencyKey);
    if (knownId) return view(store.get(knownId)!);

    const id = `tr_${Date.now().toString(36)}${Math.floor(random() * 1e6).toString(36)}`;
    store.set(id, {
        id,
        recipientId: input.recipientId,
        amountKopecks: input.amountKopecks,
        createdAt: new Date().toISOString(),
        status: "pending",
        settlesAt: Date.now() + 3000 + random() * 7000,
        outcome: random() < 0.2 ? "failed" : "success",
    });
    if (input.idempotencyKey) byIdempotencyKey.set(input.idempotencyKey, id);

    if (random() < 0.05)
        throw new TransferApiError("NETWORK", "Таймаут: ответ не получен");
    return view(store.get(id)!);
}

export async function getTransfer(id: string): Promise<Transfer> {
    await sleep(200 + random() * 600);
    if (random() < 0.05)
        throw new TransferApiError("SERVER", "Сервис временно недоступен");
    const stored = store.get(id);
    if (!stored)
        throw new TransferApiError("NOT_FOUND", `Перевод ${id} не найден`);
    return view(stored);
}
