const MONTHS = [
    "янв.", "февр.", "мар.", "апр.", "мая", "июн.",
    "июл.", "авг.", "сент.", "окт.", "нояб.", "дек.",
];

const pad = (n: number): string => String(n).padStart(2, "0");

function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
    );
}

export function operationDateFormat(date: Date): string {
    const now = new Date();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

    if (isSameDay(date, now)) return `Сегодня в ${time}`;
    if (isSameDay(date, yesterday)) return `Вчера в ${time}`;

    if(date.getFullYear()==now.getFullYear())
        return`${date.getDate()} ${MONTHS[date.getMonth()]} ${time}`;
    return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}г`;
}
