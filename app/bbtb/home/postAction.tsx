"use client"

import { BBTB } from "@/constant/typeConst";
import { createCreditCardsInfo, calculationMoney, createCreditCardsJson, createCreditCardPaymentsInfo } from "@/utils/calculation";

export const postAction = async (setBBTB: any, setMoney: any, setCreditCards: any, setCreditCardPayments: any, year: number, month: number) => {
    const cash: number = 200000;
    await fetch("http://localhost:8080/bbtb/home", {method: "GET"})
        .then((res) => res.json())
        .then((data: BBTB) => {
            console.log(data)
            if(data.banks !== null){
                //BBTBデータを保存
                setBBTB(data);
                //さまざまなお金を計算
                setMoney(calculationMoney(data, cash, year, month));
                setCreditCards(createCreditCardsJson(data));
                setCreditCardPayments(createCreditCardPaymentsInfo(data));
            }
        });
    
}
