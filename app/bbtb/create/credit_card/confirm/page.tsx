"use client"

import { Box, Text } from "@chakra-ui/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { checkAuthPermit } from "../../../checkAuthPermit";
import Confirm from "@/components/Confirm/Confirm";

export default function confirm(){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, searchParams);    
    },[]);
    return (
        <Box 
            display='flex' 
            justifyContent='center' 
            //alignItems='center' 
            width="100%" 
            height="720px" 
        >
            <Box 
                //display='flex' 
                justifyContent='center' 
                alignItems='center' 
                bg='white'
                width="60%"
                height="100%"
            >
                <Confirm form="create" entity="credit_card"></Confirm>
            </Box>
        </Box>
    )
}