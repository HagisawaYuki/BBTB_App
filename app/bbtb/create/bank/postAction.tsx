"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { url } from "@/constant/urlConst";
import { CreateBankFormInputs, CreateBankResponse } from "@/constant/typeConst";

export const postAction = async (inputData: CreateBankFormInputs, router: AppRouterInstance, setIsRegister: any, setErrorMessage: any) => {
    const res = await fetch('http://localhost:8080/bbtb/create/bank', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(inputData),
    });
    await fetch("http://localhost:8080/bbtb/create/bank", {method: "GET"})
        .then((res) => res.json())
        .then((data: CreateBankResponse) => {
            if(data){
                setIsRegister(data.isRegister);
                setErrorMessage(data.errorMessage);
                if(data.isRegister){
                    router.push(url.bbtb.create.bank.confirm.url);
                }
            }
        });
}