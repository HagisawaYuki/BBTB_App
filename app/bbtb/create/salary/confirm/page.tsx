"use client"

import { Box, Button, Link, Text } from "@chakra-ui/react"
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
            width="100%" 
            height="720px" 
        >
            <Box 
                justifyContent='center' 
                alignItems='center' 
                bg='white'
                width="60%"
                height="100%"
            >
                <Confirm form="create" entity="salary"></Confirm>
                
            </Box>
        </Box>
    )
}