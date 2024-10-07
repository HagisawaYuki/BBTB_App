"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { url } from "@/constant/urlConst";
import { EditCreditCardPaymentFormData, EditCreditCardPaymentFormInputs, EditCreditCardPaymentResponse } from "@/constant/typeConst";

export const getEditCreditCardPaymentInfo = async (creditCardPaymentID: number, setEditCreditCardPayment: any) => {
    const postData = {
        id: creditCardPaymentID
    };
    const res = await fetch('http://localhost:8080/bbtb/edit/creditcardpaymentdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(postData),
    });
    await fetch("http://localhost:8080/bbtb/edit/creditcardpaymentdata", {method: "GET"})
        .then((res) => res.json())
        .then((data: EditCreditCardPaymentFormInputs) => {
            if(data){
                setEditCreditCardPayment(data);
            }
        });
}

export const postAction = async (inputData: EditCreditCardPaymentFormInputs, creditCardID: number, creditCardPaymentID: number, router: AppRouterInstance, setIsEdit: any, setErrorMessage: any) => {
    
    const formData: EditCreditCardPaymentFormData = {
        id: creditCardPaymentID,
        year: inputData.year,
        month: inputData.month,
        day: inputData.day,
        amount: inputData.amount,
        creditCardID: creditCardID
    };
    console.log(formData)
    const res = await fetch('http://localhost:8080/bbtb/edit/credit_card_payment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(formData),
    });
    await fetch("http://localhost:8080/bbtb/edit/credit_card_payment", {method: "GET"})
        .then((res) => res.json())
        .then((data: EditCreditCardPaymentResponse) => {
            if(data){
                setIsEdit(data.isEdit);
                setErrorMessage(data.errorMessage);
                if(data.isEdit){
                    router.push(url.bbtb.edit.credit_card_payment.confirm.url);
                }
                
            }
        });
    
}