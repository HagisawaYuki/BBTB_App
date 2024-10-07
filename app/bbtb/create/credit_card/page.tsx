"use client"

import { Box, Button, Input, Select, Text } from "@chakra-ui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuthPermit } from "../../checkAuthPermit";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getBanks, postAction } from "./postAction";
import { Bank, CreateCreditCardFormInputs } from "@/constant/typeConst";


export default function credit_card (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isRegister, setIsRegister] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [banks, setBanks] = useState<Bank[]>();
    //バリデーションに使うもの
    const schema = z.object({
        name: z
          .string()
          .min(1, { message: '入力必須です。' }),
          bankID: z
          .string()
          .min(1, { message: '銀行を選択してください。' }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCreditCardFormInputs>({
        resolver: zodResolver(schema),
    });
    //フォームボタン処理
    const onSubmit: SubmitHandler<CreateCreditCardFormInputs> = async (data) => {
        console.log(data)
        await postAction(data, router, setIsRegister, setErrorMessage);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, searchParams);    
        getBanks(setBanks);
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
                            <Text fontSize="2xl">クレカ情報を登録</Text>
                        </Box>
                        {!isRegister && <Text color="red">{errorMessage}</Text>}
                        <Box marginTop="3%">
                            <Text>オリジナルのクレカ名</Text>
                            <Input type="text" {...register('name')}></Input>
                            {errors.name && <Text color="red">{errors.name.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>銀行を選択</Text>
                            <Select {...register('bankID')}>
                                <option></option>
                                {banks && banks.map(((bank: Bank) => 
                                    <option value={bank.id} key={bank.id}>
                                        {bank.name}
                                    </option>
                                ))}
                            </Select>
                            {errors.bankID && <Text color="red">{errors.bankID.message?.toString()}</Text>}
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