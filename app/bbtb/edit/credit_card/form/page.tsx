"use client"

import { Box, Button, Input, Text } from "@chakra-ui/react"
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getEditCreditCardInfo, postAction } from "./postAction";
import { checkAuthPermit } from "../../../checkAuthPermit";
import { EditCreditCardFormInputs } from "@/constant/typeConst";


export default function credit_card (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [editCreditCard, setEditCreditCard] = useState<EditCreditCardFormInputs>();
    const [isEdit, setIsEdit] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    //バリデーションに使うもの
    const schema = z.object({
        name: z
          .string()
          .min(1, { message: '入力必須です。' }),
          
          
    });
    const defaultValues = {
        name: editCreditCard?.name,
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditCreditCardFormInputs>({
        resolver: zodResolver(schema),
        defaultValues
    });
    //フォームボタン処理
    const onSubmit: SubmitHandler<EditCreditCardFormInputs> = async (data) => {
        //データ取得
        const creditCardID = Number(searchParams.get("id"));
        await postAction(data, editCreditCard ? editCreditCard.bankID : 1, creditCardID, router, setIsEdit, setErrorMessage);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, searchParams);   
        const creditCardID = Number(searchParams.get("id"));
        getEditCreditCardInfo(creditCardID, setEditCreditCard);
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
                            <Text fontSize="2xl">クレカ情報を編集</Text>
                        </Box>
                        {!isEdit && <Text color="red">{errorMessage}</Text>}
                        <Box marginTop="3%">
                            <Text>オリジナルのクレカ名</Text>
                            <Input type="text" defaultValue={defaultValues.name} {...register('name')}></Input>
                            {errors.name && <Text color="red">{errors.name.message?.toString()}</Text>}
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