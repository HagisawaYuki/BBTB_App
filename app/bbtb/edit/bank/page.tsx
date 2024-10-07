"use client"

import { Box, Button, Link, Text } from "@chakra-ui/react";
import { checkAuthPermit } from "../../checkAuthPermit";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { postAction } from "./postAction";
import { url } from "@/constant/urlConst";
import { MonthSalary, SortSalaries, YearSalary } from "@/constant/typeConst";

export default function edit (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [sortSalaries, setSortSalaries] = useState<SortSalaries>();
    const [date, setDate] = useState<Date>(new Date());
    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth() + 1);
    const [day, setDay] = useState<number>(date.getDate());
    const [bankID, setBankID] = useState<number>();


    const onSalaryClick = (salaryID: number) => {
        router.push(url.bbtb.edit.salary.url + "?id=" + salaryID);
    }

    const onEditBankButton = () => {
        router.push(url.bbtb.edit.bank.form.url + "?id=" + bankID);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, "");
        
        const bankId = Number(searchParams.get("id"));
        setBankID(bankId);
        //データ取得
        postAction(bankId, setSortSalaries, year, month);
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
                        <Text>銀行情報を編集するなら<Button bg="white" padding="0" onClick={onEditBankButton}><Text color="blue" padding="0">こちら</Text></Button>から</Text>
                    </Box>
                    
                    <Box marginTop="2%">
                        <Box width="100%" borderBottom="1px" borderBottomColor="#CCC" display="flex" justifyContent='center' alignItems='center'>
                            <Text fontSize="xl">給料一覧</Text>
                        </Box>
                        <Box width="100%" display="flex" justifyContent='center' alignItems='center'>
                            <ul style={{width: "100%"}}>
                                {sortSalaries && sortSalaries.map(((yearSalary: YearSalary) => 
                                    yearSalary.salaries.map(((salary: MonthSalary, index: number) => 
                                        <li key={index}>
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
                        
                    </Box>
                </Box>
            </Box>
        </Box>
    
    )
}