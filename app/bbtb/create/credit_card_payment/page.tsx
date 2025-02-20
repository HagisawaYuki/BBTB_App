"use client"

import { Box, Button, Input, Select, Text } from "@chakra-ui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { checkAuthPermit } from "../../checkAuthPermit";
import { calDaysByYearAndMonth } from "@/utils/calculation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postAction, getCreditCards } from "./postAction";
import { CreateCreditCardPaymentFormInputs, CreditCard } from "@/constant/typeConst";


export default function credit_card_payment (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isRegister, setIsRegister] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [creditCards, setCreditCards] = useState<CreditCard[]>();

    const [payYear, setPayYear] = useState<number[]>([2023,2024,2025]);
    const payMonth: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [payDay, setPayDay] = useState<number[]>([]);
    const [paySelectYear, setPaySelectYear] = useState<number>();
    const [paySelectMonth, setPaySelectMonth] = useState<number>();
    //バリデーションに使うもの
    const schema = z.object({
        creditCardID: z
          .string()
          .min(1, { message: '銀行を選択してください。' }),
        year: z
            .string()
            .min(1, { message: '年を選択してください。' }),
        month: z
            .string()
            .min(1, { message: '月を選択してください。' }),
        day: z
            .string()
            .min(1, { message: '日を選択してください。' }),
        amount: z
          .number({ invalid_type_error: "数値を入力してください" }),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCreditCardPaymentFormInputs>({
        resolver: zodResolver(schema),
    });
    //フォームボタン処理
    const onSubmit: SubmitHandler<CreateCreditCardPaymentFormInputs> = async (data) => {
        await postAction(data, router, setIsRegister, setErrorMessage);
    }

    const changeYear = (event: any) => {
        setPaySelectYear(event.target.value);
    }
    const changeMonth = (event: any) => {
        setPaySelectMonth(event.target.value);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, searchParams);    
        getCreditCards(setCreditCards);
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
                            <Text fontSize="2xl">クレカ情報を登録</Text>
                        </Box>
                        {!isRegister && <Text color="red">{errorMessage}</Text>}
                        
                        <Box marginTop="3%">
                            <Text>クレカを選択</Text>
                            <Select {...register('creditCardID')}>
                                <option></option>
                                {creditCards && creditCards.map(((creditCard: CreditCard) => 
                                    <option value={creditCard.id} key={creditCard.id}>
                                        {creditCard.name}
                                    </option>
                                ))}
                            </Select>
                            {errors.creditCardID && <Text color="red">{errors.creditCardID.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>支払い日を選択(西暦)</Text>
                            <Select {...register('year', { valueAsNumber: true })} onChange={changeYear}>
                                <option></option>
                                {payYear && payYear.map(((year: number) => 
                                    <option value={year} key={year}>
                                        {year}
                                    </option>
                                ))}
                            </Select>
                            {errors.year && <Text color="red">{errors.year.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>支払い日を選択(月)</Text>
                            <Select {...register('month', { valueAsNumber: true })} onChange={changeMonth}>
                                <option></option>
                                {payMonth && payMonth.map(((month: number) => 
                                    <option value={month} key={month}>
                                        {month}
                                    </option>
                                ))}
                            </Select>
                            {errors.month && <Text color="red">{errors.month.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>支払い日を選択(日)</Text>
                            <Select {...register('day', { valueAsNumber: true })}>
                                <option></option>
                                {paySelectYear && paySelectMonth && calDaysByYearAndMonth(paySelectYear, paySelectMonth).map(((day: number) => 
                                    <option value={day} key={day}>
                                        {day}
                                    </option>
                                ))}
                            </Select>
                            {errors.day && <Text color="red">{errors.day.message?.toString()}</Text>}
                        </Box>
                        <Box marginTop="3%">
                            <Text>支払い金額</Text>
                            <Input type="number" {...register('amount', { valueAsNumber: true })}></Input>
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