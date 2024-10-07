"use client"

import { Box, Button, Text } from "@chakra-ui/react";
import { checkAuthPermit } from "../../checkAuthPermit";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { postAction } from "./postAction";
import { url } from "@/constant/urlConst";
import { MonthCreditCardPayment, SortCreditCardPayments, YearCreditCardPayment } from "@/constant/typeConst";

export default function edit (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [sortCreditCards, setSortCreditCards] = useState<SortCreditCardPayments>();
    const [date, setDate] = useState<Date>(new Date());
    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth() + 1);
    const [day, setDay] = useState<number>(date.getDate());
    const [creditCardID, setCreditCardID] = useState<number>();

    

    const onCreditCardPaymentClick = (paymentID: number) => {
        router.push(url.bbtb.edit.credit_card_payment.url + "?id=" + paymentID);
    }

    const onEditCreditCardButton = () => {
        router.push(url.bbtb.edit.credit_card.form.url + "?id=" + creditCardID);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, "");
        
        const creditCardId = Number(searchParams.get("id"));
        setCreditCardID(creditCardId);
        //データ取得
        postAction(creditCardId, setSortCreditCards, year, month);
        //金額計算
        
    },[]);
    return(
        <Box 
            display='flex' 
            justifyContent='center' 
            width="100%" 
            height="1080px" 
        >
            <Box 
                justifyContent='center' 
                alignItems='center' 
                bg='white'
                width="60%"
                height="100%"
            >
                <Box width="100%" height="70%" display="box">
                    <Box>
                        <Text>クレカ情報を編集するなら<Button bg="white" padding="0" onClick={onEditCreditCardButton}><Text color="blue" padding="0">こちら</Text></Button>から</Text>
                    </Box>
                    
                    <Box marginTop="2%">
                        <Box width="100%" borderBottom="1px" borderBottomColor="#CCC" display="flex" justifyContent='center' alignItems='center'>
                            <Text fontSize="xl">クレカ支払い一覧</Text>
                        </Box>
                        <Box width="100%" display="flex" justifyContent='center' alignItems='center'>
                            <ul style={{width: "100%"}}>
                                {sortCreditCards && sortCreditCards.map(((card: YearCreditCardPayment) => 
                                    card.payments.map(((payment: MonthCreditCardPayment, index: number) => 
                                        <li key={index}>
                                        <Button display="flex" background="white" justifyContent="space-between" width="100%" borderBottom="1px" borderBottomColor="#CCC" borderRadius="0" onClick={() => onCreditCardPaymentClick(payment.id)}>
                                            <Text>{card.year}年</Text>
                                            <Text>{payment.month}月</Text>
                                            <Text>{payment.day}日</Text>
                                            <Text>{payment.amount}円</Text>
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