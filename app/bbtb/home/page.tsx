"use client"
import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { checkAuthPermit } from "../checkAuthPermit"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postAction } from "./postAction";
import { amountBymonthCreditCardPayment, calDaysByYearAndMonth } from "@/utils/calculation";
import WideDisplayArea from "@/components/DisplayArea/WideDisplayArea";
import HalfDisplayArea from "@/components/DisplayArea/HalfDisplayArea";
import MonthTermArea from "@/components/DisplayArea/MonthTermArea";
import { url } from "@/constant/urlConst";
import { BBTB, CalMoney, CreditCard, CreditCardJson, CreditCardPayment } from "@/constant/typeConst";


export default function home (){
    const router = useRouter();
    const pathname = usePathname();
    const [BBTB, setBBTB] = useState<BBTB>();
    const [money, setMoney] = useState<CalMoney>();
    const [creditCards, setCreditCards] = useState<CreditCardJson[]>();
    const [creditCardPayments, setCreditCardPayments] = useState<CreditCardPayment[]>();
    const [date, setDate] = useState<Date>(new Date());
    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth() + 1);
    const [day, setDay] = useState<number>(date.getDate());


    const onBankClick = (bankID: number) => {
        router.push(url.bbtb.home.bank.url + "?id=" + bankID);
    }
    const onCreditCardClick = (creditCardID: number) => {
        router.push(url.bbtb.home.credit_card.url + "?id=" + creditCardID);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, "");
        
        //データ取得
        postAction(setBBTB, setMoney, setCreditCards, setCreditCardPayments, year, month);
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
                <Box width="100%" height="30%" display="box" marginTop="2%">
                    {/* 月 */}
                    <MonthTermArea year={year} month={month} setYear={setYear} setMonth={setMonth} end={calDaysByYearAndMonth(year, month)[calDaysByYearAndMonth(year, month).length - 1]} height="18%"></MonthTermArea>
                    
                    {/* 今月のクレカ支払い金額 */}
                    <Box 
                        display="flex" 
                        justifyContent='center' 
                        alignItems='center' 
                        gap="2%"
                        height="18%"
                    >
                        
                        <HalfDisplayArea title="クレカ支払い" amount={money ? money.creditCardAmount : 0}></HalfDisplayArea>
                        
                        <HalfDisplayArea title="給料" amount={money ? money.salaryAmount : 0}></HalfDisplayArea>
                    </Box>
                    {/* 今月の支出と収入 */}
                    <Box 
                        display="flex" 
                        justifyContent='center' 
                        alignItems='center' 
                        gap="2%"
                        height="18%"
                    >
                        
                        <HalfDisplayArea title="支出" amount={money ? money.expenditure : 0}></HalfDisplayArea>
                        
                        <HalfDisplayArea title="収入" amount={money ? money.income : 0}></HalfDisplayArea>
                    </Box>
                    {/* 今月の収支 */}
                    <WideDisplayArea title="収支" isMoney={true} amount={money ? money.balance: 0} height="18%"></WideDisplayArea>
                    {/* 現在の現金と銀行合計 */}
                    <Box 
                        display="flex" 
                        justifyContent='center' 
                        alignItems='center' 
                        gap="2%"
                        height="18%"
                    >
                        
                        <HalfDisplayArea title="現在の現金" amount={money ? money.cash : 0}></HalfDisplayArea>
                        
                        <HalfDisplayArea title="銀行合計" amount={money ? money.bankTotal : 0}></HalfDisplayArea>
                    </Box>
                    {/* 残金合計 */}
                    <WideDisplayArea title="残金" isMoney={true} amount={money ? money.total: 0} height="18%"></WideDisplayArea>
                    
                </Box>
                <Box width="100%" height="70%" display="box">
                    <Box marginTop="4%">
                        <Tabs>
                            <TabList display="flex" justifyContent="space-between" >
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
                                            {BBTB && BBTB.banks && BBTB.banks.map(((bank: any) => 
                                                <li key={bank.name}>
                                                    <Button display="flex" background="white" justifyContent="space-between" width="100%" borderBottom="1px" borderBottomColor="#CCC" borderRadius="0" onClick={() => onBankClick(bank.id)}>
                                                        <Box width="40%" display="flex" >
                                                            <Text>{bank.name}</Text>
                                                        </Box>
                                                        <Box width="35%" display="flex" justifyContent='center' alignItems='center'>
                                                            <Text>{bank.bank_name}</Text>
                                                        </Box>
                                                        <Box width="20%" display="flex" justifyContent='center' alignItems='center'>
                                                            <Text >{bank.balance}円</Text>
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
                                                    <Box width="75%" display="flex" marginLeft="3%">
                                                        <Text>クレカ名</Text>
                                                    </Box>
                                                    <Box width="25%" display="flex" justifyContent='center' alignItems='center'>
                                                        <Text>今月の支払い金額</Text>
                                                    </Box>
                                                </Box>
                                            </li>
                                            {creditCards && creditCards.map(((card: any) => 
                                                <li key={card.name}>
                                                    <Button display="flex" background="white" justifyContent="space-between" width="100%" borderBottom="1px" borderBottomColor="#CCC" borderRadius="0" onClick={() => onCreditCardClick(card.id)}>
                                                        <Box width="75%" display="flex" >
                                                            <Text>{card.name}</Text>
                                                        </Box>
                                                        <Box width="25%" display="flex" justifyContent="right">
                                                            <Text>{amountBymonthCreditCardPayment(card, year, month)}円</Text>
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
            </Box>
        </Box>
    )
}