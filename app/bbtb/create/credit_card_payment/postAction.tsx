"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createCreditCardsInfo } from "@/utils/calculation";
import { url } from "@/constant/urlConst";
import { BBTB, CreateCreditCardPaymentFormInputs, CreateCreditCardPaymentResponse } from "@/constant/typeConst";

export const getCreditCards = async (setCreditCards: any) => {
    await fetch("http://localhost:8080/bbtb/home", {method: "GET"})
        .then((res) => res.json())
        .then((data: BBTB) => {
            if(data){
                //BBTBデータを保存
                setCreditCards(createCreditCardsInfo(data));
            }
        });
}

export const postAction = async (inputData: CreateCreditCardPaymentFormInputs, router: AppRouterInstance, setIsRegister: any, setErrorMessage: any) => {
    const res = await fetch('http://localhost:8080/bbtb/create/credit_card_payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(inputData),
    });
    await fetch("http://localhost:8080/bbtb/create/credit_card_payment", {method: "GET"})
        .then((res) => res.json())
        .then((data: CreateCreditCardPaymentResponse) => {
            if(data){
                setIsRegister(data.isRegister);
                setErrorMessage(data.errorMessage);
                if(data.isRegister){
                    router.push(url.bbtb.create.credit_card_payment.confirm.url);
                }
            }
        });
}