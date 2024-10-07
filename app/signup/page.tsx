"use client"

import { Box, Text, Link, Input, Button } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { postAction } from "./postAction";

export default function signup() {
    //SpringBoot側からのレスポンス
    const [isSignup, setIsSignup] = useState<Boolean>();
    const [errorMessage, setErrorMessage] = useState<String>();
    
    //フォーム情報
    const [userID, setUserID] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    //ルータ
    const router = useRouter();
    //バリデーションに使うもの
    const schema = z.object({
        userID: z
          .string()
          .min(1, { message: '入力必須です。' }),
        password: z.string().min(4, { message: '4文字以上入力する必要があります。' }),
      });
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        resolver: zodResolver(schema),
    });
    //フォームボタン処理
    const onSubmit = async () => {
        await postAction(userID, password, router, setIsSignup, setErrorMessage);
    }
    return(
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            width="100%" 
            height="720px"
        >
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box 
                        display="flex" 
                        flexDirection="column" 
                        justifyContent='center' 
                        w={{ base: '90px', sm: '150px', md: '400px', lg: '500px', xl: '600px' }} 
                        bg='white' 
                        marginTop="1%" 
                        padding="8%"
                    >
                        <Text fontSize="2xl" as="b" marginBottom="5%">新規会員登録</Text>
                        {!isSignup && <Text color="red">{errorMessage}</Text>}
                        <Text fontSize="2xl">ユーザID</Text>
                        <Input type="text" {...register("userID")} value={userID} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setUserID(event.target.value);
                        }}>
                        </Input>
                        {errors.userID && <Text color="red">{errors.userID.message?.toString()}</Text>}
                        <Text fontSize="2xl">パスワード</Text>
                        <Input type="password" {...register("password")} value={password} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setPassword(event.target.value);
                        }}></Input>
                        {errors.password && <Text color="red">{errors.password.message?.toString()}</Text>}
                        <Button type="submit" width="20%" margin="2%">登録</Button>
                    </Box>
                </form>
            </Box>
      </Box>
    );
}