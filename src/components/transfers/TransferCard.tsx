import { Text, View } from "react-native";

import { receiversArray } from "@/constants/receivers";
import { transferStatuses, type Transfer } from "@/constants/transfers";
import { operationDateFormat } from "@/functions/operationDateFormat";
import {currencySymbols} from '@/constants/currencySymbols'
type TransferCardProps = {
    transfer: Transfer;
};

function transactionNumberColor(transfer:Transfer){
    if(transfer.status!='completed')
        return 'text-black';
    return transfer.amount>0?"text-green-500":"text-red-500"
}
export default function TransferCard({ transfer }: TransferCardProps) {
    const receiver = receiversArray.find((item) => item.id === transfer.receiverId);
    if (!receiver) return null;

    const status = transferStatuses[transfer.status];
    const amount = Math.abs(transfer.amount).toLocaleString("ru-RU");
    const sign = transfer.amount > 0 ? "+" : "−";
    const currency = transfer.currency;

    return (
        <View className="rounded-3xl bg-white p-5">
            <View className="flex-row items-start gap-3">
                <View className="min-w-0 flex-1">
                    <Text
                        className="text-base text-black"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        {receiver.name}
                    </Text>
                    <Text
                        className="mt-2 text-xs leading-5 text-black/50"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        {operationDateFormat(transfer.date)}
                    </Text>
                    <Text
                        className="text-xs leading-5 text-black/50"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        {transfer.bank}
                    </Text>
                </View>
                <View className="w-[42%] items-end">
                    <Text
                        className={`w-full text-right text-2xl ${transactionNumberColor(transfer)}`}
                        style={{ fontFamily: "Jost_500Medium" }}
                    >
                        {sign}{amount} {currencySymbols[currency]}
                    </Text>
                    <Text
                        className="mt-1 w-full text-right text-xs leading-5 text-black/50"
                        style={{ fontFamily: "Montserrat_600SemiBold" }}
                    >
                        {transfer.details}
                    </Text>
                </View>
            </View>
            <View className={`mt-3 self-start rounded-full px-3 py-1 ${status.backgroundClassName}`}>
                <Text
                    className={`text-xs ${status.textClassName}`}
                    style={{ fontFamily: "Montserrat_600SemiBold" }}
                >
                    {status.label}
                </Text>
            </View>
        </View>
    );
}
