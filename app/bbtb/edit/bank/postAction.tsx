"use client"

import { BankJson } from "@/constant/typeConst";
import { sortSalaries } from "@/utils/calculation";

export const postAction = async (id: number, setSortSalaries: any, year: number, month: number) => {
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
            if(data){
                //BBTBデータを保存
                //setCreditCard(data);
                if(data.salaries !== null){
                    setSortSalaries(sortSalaries(data.salaries, year, month));
                }
            }
        });
    
}