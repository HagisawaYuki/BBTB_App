
"use client"

import { BankJson } from "@/constant/typeConst";
import { calBankMoney, sortSalaries } from "@/utils/calculation";


export const postAction = async (id: number, setBank: any, setSortSalaries: any, setMoney: any, year: number, month: number) => {
    const postData = {
        clickBankID: id
    };
    const res = await fetch('http://localhost:8080/bbtb/home/bank', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(postData),
    });
    await fetch("http://localhost:8080/bbtb/home/bank", {method: "GET"})
        .then((res) => res.json())
        .then((data: BankJson) => {
            if(data.id !== 0){
                //BBTBデータを保存
                console.log(data)
                setBank(data);
                year && month && setMoney(calBankMoney(data, year, month))
                data.salaries && year && month && setSortSalaries(sortSalaries(data.salaries, year, month));
            }
        });
    
}
