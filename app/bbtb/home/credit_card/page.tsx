"use client"
import { Box, Button, Text } from "@chakra-ui/react"
import { checkAuthPermit } from "../../checkAuthPermit"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { postAction } from "./postAction";
import { calDaysByYearAndMonth } from "@/utils/calculation";
import WideDisplayArea from "@/components/DisplayArea/WideDisplayArea";
import MonthTermArea from "@/components/DisplayArea/MonthTermArea";
import { url } from "@/constant/urlConst";
import { CalCreditCardMoney, CreditCardJson, MonthCreditCardPayment, SortCreditCardPayments, YearCreditCardPayment } from "@/constant/typeConst";


export default function credit_card (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [creditCard, setCreditCard] = useState<CreditCardJson>();
    const [money, setMoney] = useState<CalCreditCardMoney>();
    const [sortCreditCardPayments, setSortCreditCardPayments] = useState<SortCreditCardPayments>();
    const [date, setDate] = useState<Date>(new Date());
    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth() + 1);
    const [day, setDay] = useState<number>(date.getDate());

    const onCreditCardPaymentClick = (paymentID: number) => {
        router.push(url.bbtb.edit.credit_card_payment.url + "?id=" + paymentID);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, searchParams);
        //データ取得
        const creditCardID = Number(searchParams.get("id"));
        postAction(creditCardID, setCreditCard, setSortCreditCardPayments, setMoney, year, month);
        //金額計算
        
    },[year, month]);
    return(
        <Box 
            display='flex' 
            justifyContent='center' 
            width="100%" 
            height="720px" 
        >
            <Box 
                justifyContent='center' 
                alignItems='center' 
                bg='white'
                width="60%"
                height="100%"
            >
                <Box width="100%" height="35%" display="box" marginTop="2%">
                    {/* クレカ名 */}
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Text fontSize="2xl">{creditCard && creditCard.name}</Text>
                    </Box>
                    {/* 月 */}
                    <MonthTermArea 
                        year={year} 
                        month={month} 
                        setYear={setYear} 
                        setMonth={setMonth} 
                        end={calDaysByYearAndMonth(year, month)[calDaysByYearAndMonth(year, month).length - 1]} 
                        height="15%"
                    ></MonthTermArea>
                    {/* 今月のクレカ支払い日 */}
                    <WideDisplayArea 
                        title="今月のクレカ支払い日" 
                        isDate={true} 
                        year={money ? money.thisMonth.year : 0} 
                        month={money ? money.thisMonth.month : 0} 
                        day={money ? money.thisMonth.day : 0} 
                        height="15%" 
                        router={router} 
                        entity="credit_card_payment" 
                    ></WideDisplayArea>
                    {/* 今月のクレカ支払い金額 */}
                    <WideDisplayArea 
                        title="今月のクレカ支払い金額" 
                        isMoney={true} amount={money ? money.thisMonth.amount: 0} 
                        height="15%"
                    ></WideDisplayArea>
                    {/* 来月のクレカ支払い日 */}
                    <WideDisplayArea 
                        title="来月のクレカ支払い日" 
                        isDate={true} 
                        year={money ? money.nextMonth.year : 0} 
                        month={money ? money.nextMonth.month : 0} 
                        day={money ? money.nextMonth.day : 0} 
                        height="15%"
                        router={router} 
                        entity="credit_card_payment" 
                    ></WideDisplayArea>
                    {/* 来月のクレカ支払い金額 */}
                    <WideDisplayArea 
                        title="来月のクレカ支払い金額" 
                        isMoney={true} 
                        amount={money ? money.nextMonth.amount: 0} 
                        height="15%"
                    ></WideDisplayArea>

                </Box>
                <Box width="100%" height="70%" display="box">
                    <Box marginTop="4%">
                        <Box width="100%" borderBottom="1px" borderBottomColor="#CCC" display="flex" justifyContent='center' alignItems='center'>
                            <Text fontSize="xl">過去のクレカ支払い一覧</Text>
                        </Box>
                        <Box width="100%" display="flex" justifyContent='center' alignItems='center'>
                            <ul style={{width: "100%"}}>
                                <li>
                                    <Box display="flex" background="white" justifyContent="space-between" width="100%" borderBottom="1px" borderBottomColor="#CCC" borderRadius="0">
                                        <Box width="70%" display="flex" marginLeft="3%">
                                            <Text>支払い日</Text>
                                        </Box>
                                        <Box width="30%" display="flex" justifyContent="right" marginRight="3%">
                                            <Text>今月の支払い金額</Text>
                                        </Box>
                                    </Box>
                                </li>
                                {sortCreditCardPayments && sortCreditCardPayments.map(((yearCreditCardPayment: YearCreditCardPayment) => 
                                    yearCreditCardPayment.payments.map(((payment: MonthCreditCardPayment) => 
                                        <li key={payment.id}>
                                            <Button 
                                                display="flex" 
                                                background="white" 
                                                justifyContent="space-between" 
                                                width="100%" borderBottom="1px" 
                                                borderBottomColor="#CCC" 
                                                borderRadius="0" 
                                                onClick={() => onCreditCardPaymentClick(payment.id)}
                                            >
                                                <Box width="70%" display="flex">
                                                    <Text>{yearCreditCardPayment.year}/{payment.month}/{payment.day}日</Text>
                                                </Box>
                                                <Box width="30%" display="flex" justifyContent="right">
                                                    <Text>{payment.amount}円</Text>
                                                </Box>
                                                
                                            </Button>
                                        </li>
                                    ))
                                ))}
                            </ul>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
        
    )
}