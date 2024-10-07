"use client"

import { Box, Button, Input, Text } from "@chakra-ui/react"
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getEditSalaryInfo, postAction } from "./postAction";
import { checkAuthPermit } from "../../checkAuthPermit";
import { EditSalaryFormInputs } from "@/constant/typeConst";


export default function salary (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [editSalary, setEditSalary] = useState<EditSalaryFormInputs>();
    const [isEdit, setIsEdit] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [salaryID, setSalaryID] = useState<number>();
    //バリデーションに使うもの
    const schema = z.object({
        name: z
          .string()
          .min(1, {message: "名前を入力してください。"}),
        year: z
          .number({ invalid_type_error: "数値を入力してください" }),
        month: z
          .number({ invalid_type_error: "数値を入力してください" }),
        day: z
          .number({ invalid_type_error: "数値を入力してください" }),
        amount: z
          .number({ invalid_type_error: "数値を入力してください" }),
    });
    const defaultValues = {
        name: editSalary?.name,
        year: editSalary?.year,
        month: editSalary?.month,
        day: editSalary?.day,
        amount: editSalary?.amount
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditSalaryFormInputs>({
        resolver: zodResolver(schema),
        defaultValues
    });
    //フォームボタン処理
    const onSubmit: SubmitHandler<EditSalaryFormInputs> = async (data) => {
        //データ取得
        await postAction(data, editSalary ? editSalary.bankID : 1, salaryID ? salaryID : 1, router, setIsEdit, setErrorMessage);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, searchParams);   
        const salaryId = Number(searchParams.get("id"));
        setSalaryID(salaryId)
        getEditSalaryInfo(salaryId, setEditSalary);
    },[]);
    return(
        <Box 
            display='flex' 
            justifyContent='center' 
            width="100%" 
            height="640px" 
        >
            <Box 
                justifyContent='center' 
                alignItems='center' 
            >
                
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent='center' 
                    w={{ base: '90px', sm: '150px', md: '400px', lg: '500px', xl: '600px' }} 
                    bg='white' 
                    marginTop="10%" 
                    padding="8%"
                    paddingTop="4%"
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Text fontSize="2xl">給料情報を編集</Text>
                        </Box>
                        {!isEdit && <Text color="red">{errorMessage}</Text>}
                        <Box marginTop="3%">
                            <Text>給料名</Text>
                            <Input type="text" defaultValue={defaultValues.name} {...register('name')}></Input>
                            {errors.name && <Text color="red">{errors.name.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>給料日(西暦)</Text>
                            <Input type="number" defaultValue={defaultValues.year} {...register('year', { valueAsNumber: true })}></Input>
                            {errors.year && <Text color="red">{errors.year.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>給料日(月)</Text>
                            <Input type="number" defaultValue={defaultValues.month} {...register('month', { valueAsNumber: true })}></Input>
                            {errors.month && <Text color="red">{errors.month.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>給料日(日)</Text>
                            <Input type="number" defaultValue={defaultValues.day} {...register('day', { valueAsNumber: true })}></Input>
                            {errors.day && <Text color="red">{errors.day.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>給料額</Text>
                            <Input type="number" defaultValue={defaultValues.amount} {...register('amount', { valueAsNumber: true })}></Input>
                            {errors.amount && <Text color="red">{errors.amount.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Button type="submit">
                                <Text>登録</Text>
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    )
}