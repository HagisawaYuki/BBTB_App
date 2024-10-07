"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createBanksInfo } from "@/utils/calculation";
import { url } from "@/constant/urlConst";
import { CreateCreditCardFormInputs, CreateCreditCardResponse } from "@/constant/typeConst";

export const getBanks = async (setBanks: any) => {
    await fetch("http://localhost:8080/bbtb/home", {method: "GET"})
        .then((res) => res.json())
        .then((data) => {
            if(data){
                //BBTBデータを保存
                setBanks(createBanksInfo(data));
            }
        });
}

export const postAction = async (inputData: CreateCreditCardFormInputs, router: AppRouterInstance, setIsRegister: any, setErrorMessage: any) => {
    const res = await fetch('http://localhost:8080/bbtb/create/credit_card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(inputData),
    });
    await fetch("http://localhost:8080/bbtb/create/credit_card", {method: "GET"})
        .then((res) => res.json())
        .then((data: CreateCreditCardResponse) => {
            if(data){
                setIsRegister(data.isRegister);
                setErrorMessage(data.errorMessage);
                if(data.isRegister){
                    router.push(url.bbtb.create.credit_card.confirm.url);
                }
            }
        });
}