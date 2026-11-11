export type Receiver = {
    id: string;
    name: string;
    phone: string;
    description: string;
};

export const receiversArray: readonly Receiver[] = [
    {
        id: "1",
        name: "Джеймс Уилсон",
        phone: "+44 7911 123456",
        description: "Быстрый перевод без комиссии банка • GBP",
    },
    {
        id: "2",
        name: "Элиф Демир",
        phone: "+90 532 987 6543",
        description: "Банк Зираат • TRY",
    },
    {
        id: "3",
        name: "Раджеш Шарма",
        phone: "+91 98200 12345",
        description: "Государственный банк Индии • INR",
    },
    {
        id: "4",
        name: "София Рамирес",
        phone: "+52 55 1234 5678",
        description: "Банк ББВА Мексика • MXN",
    },
    {
        id: "5",
        name: "Елена Коваленко",
        phone: "+380 50 111 2233",
        description: "Монобанк • UAH",
    },
    {
        id: "6",
        name: "Иван Иванов",
        phone: "+375 (29) 123-45-67",
        description: "БСБ банк • BYN",
    },
];
