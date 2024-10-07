"use client"

import { Box, Button, Input, Text } from "@chakra-ui/react"
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getEditCreditCardPaymentInfo, postAction } from "./postAction";
import { checkAuthPermit } from "../../checkAuthPermit";
import { EditCreditCardPaymentFormInputs } from "@/constant/typeConst";


export default function credit_card_payment (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [editCreditCardPayment, setEditCreditCardPayment] = useState<EditCreditCardPaymentFormInputs>();
    const [isEdit, setIsEdit] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [creditCardPaymentID, setCreditCardPaymentID] = useState<number>();
    //バリデーションに使うもの
    const schema = z.object({
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
        year: editCreditCardPayment?.year,
        month: editCreditCardPayment?.month,
        day: editCreditCardPayment?.day,
        amount: editCreditCardPayment?.amount
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditCreditCardPaymentFormInputs>({
        resolver: zodResolver(schema),
        defaultValues
    });
    //フォームボタン処理
    const onSubmit: SubmitHandler<EditCreditCardPaymentFormInputs> = async (data) => {
        //データ取得
        await postAction(data, editCreditCardPayment ? editCreditCardPayment.creditCardID : 1, creditCardPaymentID ? creditCardPaymentID : 1, router, setIsEdit, setErrorMessage);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, searchParams);   
        const creditCardPaymentId = Number(searchParams.get("id"));
        setCreditCardPaymentID(creditCardPaymentId)
        getEditCreditCardPaymentInfo(creditCardPaymentId, setEditCreditCardPayment);
    },[]);
    return(
        <Box 
            display='flex' 
            justifyContent='center' 
            width="100%" 
            height="480px" 
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
                            <Text fontSize="2xl">クレカ支払い情報を編集</Text>
                        </Box>
                        {!isEdit && <Text color="red">{errorMessage}</Text>}
                        <Box marginTop="3%">
                            <Text>支払い日(西暦)</Text>
                            <Input type="number" defaultValue={defaultValues.year} {...register('year', { valueAsNumber: true })}></Input>
                            {errors.year && <Text color="red">{errors.year.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>支払い日(月)</Text>
                            <Input type="number" defaultValue={defaultValues.month} {...register('month', { valueAsNumber: true })}></Input>
                            {errors.month && <Text color="red">{errors.month.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>支払い日(日)</Text>
                            <Input type="number" defaultValue={defaultValues.day} {...register('day', { valueAsNumber: true })}></Input>
                            {errors.day && <Text color="red">{errors.day.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>支払額</Text>
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