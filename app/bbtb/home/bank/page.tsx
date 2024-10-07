"use client"
import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { checkAuthPermit } from "../../checkAuthPermit"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { postAction } from "./postAction";
import { amountBymonthCreditCardPayment, calDaysByYearAndMonth } from "@/utils/calculation";
import WideDisplayArea from "@/components/DisplayArea/WideDisplayArea";
import HalfDisplayArea from "@/components/DisplayArea/HalfDisplayArea";
import MonthTermArea from "@/components/DisplayArea/MonthTermArea";
import { url } from "@/constant/urlConst";
import { BankJson, CalBankMoney, CreditCard, CreditCardJson, MonthSalary, SalaryJson, SortSalaries, YearSalary } from "@/constant/typeConst";
import salary from "../../create/salary/page";


export default function home (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [bank, setBank] = useState<BankJson>();
    const [money, setMoney] = useState<CalBankMoney>();
    const [creditCards, setCreditCards] = useState<CreditCard[]>();
    const [sortSalaries, setSortSalaries] = useState<SortSalaries>();
    const [date, setDate] = useState<Date>(new Date());
    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth() + 1);
    const [day, setDay] = useState<number>(date.getDate());

    const onCreditCardClick = (creditCardID: number) => {
        router.push(url.bbtb.home.credit_card.url + "?id=" + creditCardID);
    }
    const onSalaryClick = (salaryID: number) => {
        router.push(url.bbtb.edit.salary.url + "?id=" + salaryID);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, searchParams);
        //データ取得
        const bankID = Number(searchParams.get("id"));
        postAction(bankID, setBank, setSortSalaries, setMoney, year, month);
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
                    {/* 銀行名 */}
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Text fontSize="2xl">{bank && bank.name} ({bank && bank.bank_name})</Text>
                    </Box>
                    
                    {/* 月 */}
                    <MonthTermArea year={year} month={month} setYear={setYear} setMonth={setMonth} end={calDaysByYearAndMonth(year, month)[calDaysByYearAndMonth(year, month).length - 1]} height="15%"></MonthTermArea>
                    
                    {/* 今月のクレカ支払い金額 */}
                    {/* <WideDisplayArea title="クレカ支払い金額" isMoney={true} amount={money ? money.creditCardAmount: 0} height="15%"></WideDisplayArea> */}
                    {/* 今月の支出と収入 */}
                    <Box 
                        display="flex" 
                        justifyContent='center' 
                        alignItems='center' 
                        gap="2%"
                        height="15%"
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
                        height="15%"
                    >
                        
                        <HalfDisplayArea title="支出" amount={money ? money.expenditure : 0}></HalfDisplayArea>
                        
                        <HalfDisplayArea title="収入" amount={money ? money.income : 0}></HalfDisplayArea>
                    </Box>
                    {/* 今月の収支 */}
                    <WideDisplayArea title="収支" isMoney={true} amount={money ? money.balance: 0} height="15%"></WideDisplayArea>
                    
                    {/* 残金合計 */}
                    <WideDisplayArea title="現在の残金" isMoney={true} amount={money ? money.total: 0} height="15%"></WideDisplayArea>

                    {/* 来月の残金予定 */}
                    <WideDisplayArea title="来月の残金予定" isMoney={true} amount={money ? money.nextMonthTotal: 0} height="15%"></WideDisplayArea>

                </Box>
                <Box width="100%" height="70%" display="box">
                    <Box marginTop="4%">
                        <Tabs>
                            <TabList display="flex" justifyContent="space-between" >
                                <Tab width="50%">クレカ一覧</Tab>
                                <Tab width="50%">給料一覧</Tab>
                            </TabList>
                            <TabPanels>
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
                                            {bank && bank.credit_cards !== null && bank.credit_cards.map(((card: CreditCardJson) => 
                                                <li key={card.name}>
                                                    <Button display="flex" background="white" justifyContent="space-between" width="100%" borderBottom="1px" borderBottomColor="#CCC" borderRadius="0" onClick={() => onCreditCardClick(card.id)}>
                                                        <Box width="75%" display="flex" >
                                                            <Text>{card.name}</Text>
                                                        </Box>
                                                        <Box width="25%" display="flex" justifyContent="right">
                                                            <Text >{amountBymonthCreditCardPayment(card, year, month)}円</Text>
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
                                                    <Box width="20%" display="flex" marginLeft="3%">
                                                        <Text>給料日</Text>
                                                    </Box>
                                                    <Box width="55%" display="flex">
                                                        <Text>給料名</Text>
                                                    </Box>
                                                    <Box width="25%" display="flex" justifyContent='center' alignItems='center'>
                                                        <Text>給料額</Text>
                                                    </Box>
                                                </Box>
                                            </li>
                                            {sortSalaries && sortSalaries !== null && sortSalaries.map(((yearSalary: YearSalary) => 
                                                yearSalary.salaries.map(((salary: MonthSalary) => 
                                                    <li key={salary.id}>
                                                        <Button display="flex" background="white" justifyContent="space-between" width="100%" borderBottom="1px" borderBottomColor="#CCC" borderRadius="0" onClick={() => onSalaryClick(salary.id)}>
                                                            <Box width="20%" display="flex">
                                                                <Text>{yearSalary.year}/{salary.month}/{salary.day}</Text>
                                                            </Box>
                                                            <Box width="55%" display="flex" marginLeft="3%">
                                                                <Text>{salary.name}</Text>
                                                            </Box>
                                                            <Box width="25%" display="flex" justifyContent="right">
                                                                <Text>{salary.amount}円</Text>
                                                            </Box>
                                                        </Button>
                                                    </li>
                                                ))
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