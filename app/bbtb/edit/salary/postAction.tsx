"use client"

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { url } from "@/constant/urlConst";
import { EditSalaryFormData, EditSalaryFormInputs, EditSalaryResponse } from "@/constant/typeConst";

export const getEditSalaryInfo = async (salaryID: number, setEditSalary: any) => {
    const postData = {
        id: salaryID
    };
    const res = await fetch('http://localhost:8080/bbtb/edit/salarydata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(postData),
    });
    await fetch("http://localhost:8080/bbtb/edit/salarydata", {method: "GET"})
        .then((res) => res.json())
        .then((data: EditSalaryFormInputs) => {
            if(data){
                setEditSalary(data);
            }
        });
}

export const postAction = async (inputData: EditSalaryFormInputs, bankID: number, creditCardPaymentID: number, router: AppRouterInstance, setIsEdit: any, setErrorMessage: any) => {
    
    const formData: EditSalaryFormData = {
        id: creditCardPaymentID,
        name: inputData.name,
        year: inputData.year,
        month: inputData.month,
        day: inputData.day,
        amount: inputData.amount,
        bankID: bankID
    };
    const res = await fetch('http://localhost:8080/bbtb/edit/salary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(formData),
    });
    await fetch("http://localhost:8080/bbtb/edit/salary", {method: "GET"})
        .then((res) => res.json())
        .then((data: EditSalaryResponse) => {
            if(data){
                setIsEdit(data.isEdit);
                setErrorMessage(data.errorMessage);
                if(data.isEdit){
                    router.push(url.bbtb.edit.salary.confirm.url);
                }
                
            }
        });
    
}