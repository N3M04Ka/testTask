import assert from "node:assert/strict";
import { test } from "node:test";

import {
    formatTransferMoney,
    selectCardReceivers,
    transferSessionReducer,
    validateTransferAmount,
} from "../src/functions/transferFlow.ts";

const balance = 15009050;

for (const [input, amountMinor] of [
    ["0,01", 1], ["10,05", 1005], ["10.50", 1050], ["10.5", 1050],
    ["1 000,50", 100050], ["1\u00a0000,50", 100050], ["150090,50", balance],
]) {
    test(`Сумма ${input} преобразуется в целые копейки`, () => {
        assert.deepEqual(validateTransferAmount(input, balance), { amountMinor, error: null });
    });
}

for (const input of ["", " ", "0", "0,00", "-1", "-0.01", "текст", "1e3", "10,001", "1,2.3", "10,", "150090,51", "999999999999999999999"]) {
    test(`Сумма «${input}» блокирует продолжение`, () => {
        const result = validateTransferAmount(input, balance);
        assert.equal(result.amountMinor, null);
        assert.equal(typeof result.error, "string");
    });
}

test("Формат рублей сохраняет ведущий ноль в копейках", () => {
    assert.match(formatTransferMoney(1005), /10,05/);
    assert.match(formatTransferMoney(1), /0,01/);
    assert.match(formatTransferMoney(0), /^0\D*₽$/);
});

const recipients = [
    { id: "1", name: "Элиф Демир", phone: "+90 123", description: "Банк" },
    { id: "2", name: "Иван Иванов", phone: "+375 123", description: "Банк" },
];
const cardNumbers = { "1": "6029", "2": "5184" };

test("Поиск по карте учитывает имя, маску и последние цифры, без поиска по телефону", () => {
    assert.deepEqual(selectCardReceivers(recipients, cardNumbers, "ЭЛИФ", false), [recipients[0]]);
    assert.deepEqual(selectCardReceivers(recipients, cardNumbers, "•••• 6029", false), [recipients[0]]);
    assert.deepEqual(selectCardReceivers(recipients, cardNumbers, "5184", false), [recipients[1]]);
    assert.deepEqual(selectCardReceivers(recipients, cardNumbers, "+375 123", false), []);
    assert.deepEqual(selectCardReceivers(recipients, cardNumbers, "нет такого", false), []);
    assert.deepEqual(selectCardReceivers(recipients, cardNumbers, "", true), [recipients[1], recipients[0]]);
    assert.deepEqual(recipients.map((item) => item.id), ["1", "2"]);
});

const initial = { draft: null, localTransfers: [] };
function editingState(id = "attempt-1") {
    let state = transferSessionReducer(initial, { type: "start", id, method: "phone" });
    state = transferSessionReducer(state, { type: "selectReceiver", receiverId: "1" });
    return transferSessionReducer(state, { type: "setAmount", value: "10,05" });
}
function operation(id = "attempt-1") {
    return {
        id, receiverId: "1", date: new Date("2026-11-11T12:00:00"),
        bank: "Банк", status: "processing", amount: -10.05, currency: "RUB", details: "По номеру телефона",
    };
}

test("Повторное подтверждение создаёт только одну операцию", () => {
    const editing = editingState();
    const action = { type: "submit", transfer: operation() };
    const submitted = transferSessionReducer(editing, action);
    assert.equal(submitted.draft.phase, "submitting");
    assert.equal(submitted.localTransfers.length, 1);
    assert.equal(transferSessionReducer(submitted, action), submitted);
    assert.equal(editing.draft.phase, "editing");
    assert.equal(editing.localTransfers.length, 0);
    const completed = transferSessionReducer(submitted, { type: "complete", id: "attempt-1" });
    assert.equal(completed.draft.phase, "completed");
    assert.equal(completed.localTransfers[0].status, "completed");
    assert.equal(transferSessionReducer(completed, action), completed);
    assert.equal(transferSessionReducer(completed, { type: "complete", id: "attempt-1" }), completed);
});

test("Черновик сохраняет сумму для того же получателя и сбрасывает при смене", () => {
    const editing = editingState();
    assert.equal(transferSessionReducer(editing, { type: "selectReceiver", receiverId: "1" }).draft.amountInput, "10,05");
    assert.equal(transferSessionReducer(editing, { type: "selectReceiver", receiverId: "2" }).draft.amountInput, "");
    const submitted = transferSessionReducer(editing, { type: "submit", transfer: operation() });
    assert.equal(transferSessionReducer(submitted, { type: "setAmount", value: "100" }), submitted);
    assert.equal(transferSessionReducer(submitted, { type: "selectReceiver", receiverId: "2" }), submitted);
});

test("Завершение старой отправки не меняет новый черновик и сохраняет историю", () => {
    const submitted = transferSessionReducer(editingState(), { type: "submit", transfer: operation() });
    const next = transferSessionReducer(submitted, { type: "start", id: "attempt-2", method: "card" });
    const completed = transferSessionReducer(next, { type: "complete", id: "attempt-1" });
    assert.equal(completed.localTransfers[0].status, "completed");
    assert.equal(completed.draft.id, "attempt-2");
    assert.equal(completed.draft.phase, "editing");
    assert.equal(completed.draft.receiverId, null);
    assert.equal(completed.draft.amountInput, "");
    assert.equal(completed.draft.method, "card");
});

test("Повторные переводы одному получателю имеют разные идентификаторы", () => {
    let state = transferSessionReducer(editingState(), { type: "submit", transfer: operation() });
    state = transferSessionReducer(state, { type: "start", id: "attempt-2", method: "card" });
    state = transferSessionReducer(state, { type: "selectReceiver", receiverId: "1" });
    state = transferSessionReducer(state, { type: "setAmount", value: "10,05" });
    state = transferSessionReducer(state, { type: "submit", transfer: operation("attempt-2") });
    assert.equal(state.localTransfers.length, 2);
    assert.equal(new Set(state.localTransfers.map((item) => item.id)).size, 2);
    assert.deepEqual(state.localTransfers.map((item) => item.receiverId), ["1", "1"]);
});

test("Отправка без черновика либо с чужим идентификатором отклоняется", () => {
    assert.equal(transferSessionReducer(initial, { type: "submit", transfer: operation() }), initial);
    const editing = editingState();
    assert.equal(transferSessionReducer(editing, { type: "submit", transfer: operation("other") }), editing);
    assert.equal(transferSessionReducer(editing, { type: "complete", id: "attempt-1" }), editing);
});
