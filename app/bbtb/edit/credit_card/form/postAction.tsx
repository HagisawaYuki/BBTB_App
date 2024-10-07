"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { url } from "@/constant/urlConst";
import { EditCreditCardFormData, EditCreditCardFormInputs, EditCreditCardResponse } from "@/constant/typeConst";

export const getEditCreditCardInfo = async (creditCardID: number, setEditCreditCard: any) => {
    const postData = {
        id: creditCardID
    };
    const res = await fetch('http://localhost:8080/bbtb/edit/creditcarddata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(postData),
    });
    await fetch("http://localhost:8080/bbtb/edit/creditcarddata", {method: "GET"})
        .then((res) => res.json())
        .then((data: EditCreditCardFormInputs) => {
            if(data){
                console.log(data)
                setEditCreditCard(data);
            }
        });
}

export const postAction = async (inputData: EditCreditCardFormInputs, bankID: number, creditCardID: number, router: AppRouterInstance, setIsEdit: any, setErrorMessage: any) => {
    const formData: EditCreditCardFormData = {
        id: creditCardID,
        name: inputData.name,
        bankID: bankID
    };
    console.log(formData)
    const res = await fetch('http://localhost:8080/bbtb/edit/credit_card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(formData),
    });
    await fetch("http://localhost:8080/bbtb/edit/credit_card", {method: "GET"})
        .then((res) => res.json())
        .then((data: EditCreditCardResponse) => {
            if(data){
                setIsEdit(data.isEdit);
                setErrorMessage(data.errorMessage);
                if(data.isEdit){
                    router.push(url.bbtb.edit.credit_card.confirm.url);
                }
            }
        });
}