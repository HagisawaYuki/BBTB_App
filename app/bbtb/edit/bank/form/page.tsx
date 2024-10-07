"use client"

import { Box, Button, Input, Text } from "@chakra-ui/react"
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getEditBankInfo, postAction } from "./postAction";
import { checkAuthPermit } from "../../../checkAuthPermit";
import { EditBankFormInputs } from "@/constant/typeConst";



export default function bank (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [editBank, setEditBank] = useState<EditBankFormInputs>();
    const [isEdit, setIsEdit] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    //バリデーションに使うもの
    const schema = z.object({
        name: z
          .string()
          .min(1, { message: '入力必須です。' }),
        bank_name: z
          .string()
          .min(1, { message: '入力必須です。' }),
        balance: z
          .number({ invalid_type_error: "数値を入力してください" })
          .min(0, { message: '0以上の整数を入力してください。'})
          .refine((val: any) => !isNaN(val), { message: "有効な数値を入力してください" }),
          
          
    });
    const defaultValues = {
        name: editBank?.name,
        bank_name: editBank?.bank_name,
        balance: editBank?.balance
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditBankFormInputs>({
        resolver: zodResolver(schema),
        defaultValues
    });
    //フォームボタン処理
    const onSubmit: SubmitHandler<EditBankFormInputs> = async (data) => {
        console.log(data)
        //データ取得
        const bankID = Number(searchParams.get("id"));
        await postAction(data, bankID, router, setIsEdit, setErrorMessage);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, searchParams);   
        const bankID = Number(searchParams.get("id"));
        getEditBankInfo(bankID, setEditBank);
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
                            <Text fontSize="2xl">銀行情報を編集</Text>
                        </Box>
                        {!isEdit && <Text color="red">{errorMessage}</Text>}
                        <Box marginTop="3%">
                            <Text>オリジナルの銀行名</Text>
                            <Input type="text" defaultValue={defaultValues.name} {...register('name')}></Input>
                            {errors.name && <Text color="red">{errors.name.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>銀行名を選択</Text>
                            <Input type="text" defaultValue={defaultValues.bank_name} {...register('bank_name')}></Input>
                            {errors.bank_name && <Text color="red">{errors.bank_name.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>現在の口座残高</Text>
                            <Input type="number" defaultValue={defaultValues.balance} {...register('balance', { valueAsNumber: true })}></Input>
                            {errors.balance && <Text color="red">{errors.balance.message?.toString()}</Text>}
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