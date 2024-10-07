"use client"

import { Box, Button, Link, Text } from "@chakra-ui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { checkAuthPermit } from "../bbtb/checkAuthPermit";
import { postAction } from "./postAction";

import { url } from "@/constant/urlConst";

export default function logout(){
    const router = useRouter();
    const pathname = usePathname();

    const isYesButton = async() => {
        await postAction(router);
    }

    const isNoButton = () => {
        router.push(url.bbtb.home.url);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, "");    
    },[]);
    return (
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
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Text>ログアウトしますか？</Text>
                    </Box>
                    <Box display="flex" justifyContent='center' alignItems='center' marginTop="3%" gap="3%">
                        <Button bg="#47E" onClick={isYesButton}>
                            <Text>はい</Text>
                        </Button>
                        <Button bg="#F54" onClick={isNoButton}>
                            <Text>いいえ</Text>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}