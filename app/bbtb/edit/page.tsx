"use client"

import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { checkAuthPermit } from "../checkAuthPermit";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postAction } from "./postAction";
import { url } from "@/constant/urlConst";
import { Bank, BBTB, CreditCard, CreditCardPayment } from "@/constant/typeConst";

export default function edit (){
    const router = useRouter();
    const pathname = usePathname();
    const [BBTB, setBBTB] = useState<BBTB>();
    const [banks, setBanks] = useState<Bank[]>();
    const [creditCards, setCreditCards] = useState<CreditCard[]>();
    const [creditCardPayments, setCreditCardPayments] = useState<CreditCardPayment[]>();
    const [date, setDate] = useState<Date>(new Date());
    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth() + 1);
    const [day, setDay] = useState<number>(date.getDate());

    const onBankClick = (bankID: number) => {
        router.push(url.bbtb.edit.bank.url + "?id=" + bankID);
    }

    const onCreditCardClick = (cardID: number) => {
        router.push(url.bbtb.edit.credit_card.url + "?id=" + cardID);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, "");
        
        //データ取得
        postAction(setBBTB, setBanks, setCreditCards, setCreditCardPayments);
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
                <Tabs marginTop="3%">
                    <TabList display="flex" justifyContent="space-between">
                        <Tab width="50%">銀行一覧</Tab>
                        <Tab width="50%">クレカ一覧</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Box width="100%" display="flex" justifyContent='center' alignItems='center'>
                                <ul style={{width: "100%"}}>
                                    <li>
                                        <Box display="flex" background="white" justifyContent="space-between" width="100%" borderBottom="1px" borderBottomColor="#CCC" borderRadius="0">
                                            <Box width="40%" display="flex" marginLeft="3%">
                                                <Text>銀行名</Text>
                                            </Box>
                                            <Box width="35%" display="flex" justifyContent='center' alignItems='center'>
                                                <Text>銀行会社</Text>
                                            </Box>
                                            <Box width="25%" display="flex" justifyContent='center' alignItems='center'>
                                                <Text>口座残高</Text>
                                            </Box>
                                        </Box>
                                    </li>
                                    {banks && banks.map(((bank: any) => 
                                        <li key={bank.name}>
                                            <Button display="flex" background="white" justifyContent="space-between" width="100%" borderBottom="1px" borderBottomColor="#CCC" borderRadius="0" onClick={() => onBankClick(bank.id)}>
                                                <Box width="40%" display="flex">
                                                    <Text>{bank.name}</Text>
                                                </Box>
                                                <Box width="35%" display="flex" justifyContent='center' alignItems='center'>
                                                    <Text>{bank.bank_name}</Text>
                                                </Box>
                                                <Box width="20%" display="flex" justifyContent='center' alignItems='center'>
                                                    <Text>{bank.balance}円</Text>
                                                </Box>
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Box width="100%" display="flex" justifyContent='center' alignItems='center'>
                                <ul style={{width: "100%"}}>
                                    <li>
                                        <Box display="flex" background="white" justifyContent="space-between" width="100%" borderBottom="1px" borderBottomColor="#CCC" borderRadius="0">
                                            <Box width="100%" display="flex" marginLeft="3%">
                                                <Text>クレカ名</Text>
                                            </Box>
                                        </Box>
                                    </li>
                                    {creditCards && creditCards.map(((card: any) => 
                                        <li key={card.name}>
                                            <Button display="flex" background="white" justifyContent="space-between" width="100%" borderBottom="1px" borderBottomColor="#CCC" borderRadius="0" onClick={() => onCreditCardClick(card.id)}>
                                                <Box width="10%" display="flex" >
                                                    <Text>{card.name}</Text>
                                                </Box>
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    
    )
}