"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { url } from "@/constant/urlConst";
import { CreateBankFormInputs, EditBankFormData, EditBankFormInputs, EditBankResponse } from "@/constant/typeConst";

//変更する銀行のIDを渡して銀行情報を取得する関数(フォームのデフォルト値に使う)
export const getEditBankInfo = async (bankID: number, setEditBank: any) => {
    const postData = {
        id: bankID
    };
    const res = await fetch('http://localhost:8080/bbtb/edit/bankdata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(postData),
    });
    await fetch("http://localhost:8080/bbtb/edit/bankdata", {method: "GET"})
        .then((res) => res.json())
        .then((data: CreateBankFormInputs) => {
            if(data){
                setEditBank(data);
            }
        });
}

export const postAction = async (inputData: EditBankFormInputs, bankID: number, router: AppRouterInstance, setIsEdit: any, setErrorMessage: any) => {
    const formData: EditBankFormData = {
        id: bankID,
        name: inputData.name,
        bank_name: inputData.bank_name,
        balance: inputData.balance
    };
    const res = await fetch('http://localhost:8080/bbtb/edit/bank', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(formData),
    });
    await fetch("http://localhost:8080/bbtb/edit/bank", {method: "GET"})
        .then((res) => res.json())
        .then((data: EditBankResponse) => {
            if(data){
                setIsEdit(data.isEdit);
                setErrorMessage(data.errorMessage);
                if(data.isEdit){
                    router.push(url.bbtb.edit.bank.confirm.url);
                }
            }
        });
    
}