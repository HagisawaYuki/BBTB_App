"use client"

import { BBTB } from "@/constant/typeConst";
import { createBanksInfo, createCreditCardsInfo, createCreditCardPaymentsInfo } from "@/utils/calculation";

export const postAction = async (setBBTB: any, setBanks: any, setCreditCards: any, setCreditCardPayments: any) => {
    await fetch("http://localhost:8080/bbtb/home", {method: "GET"})
        .then((res) => res.json())
        .then((data: BBTB) => {
            if(data.banks !== null){
                //BBTBデータを保存
                setBBTB(data);
                //さまざまなお金を計算
                setBanks(createBanksInfo(data));
                setCreditCards(createCreditCardsInfo(data));
                setCreditCardPayments(createCreditCardPaymentsInfo(data));
            }
        });
    
}