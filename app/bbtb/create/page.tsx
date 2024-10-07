"use client"

import { Box, Button, Text } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { checkAuthPermit } from "../checkAuthPermit";
import { useEffect } from "react";
import { url } from "@/constant/urlConst";

export default function create (){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const onClick = (pathname: string) => {
        router.push(url.bbtb.create.url + pathname);
    }

    useEffect(() => {
        //アクセスしていいかチェック
        checkAuthPermit(router, pathname, searchParams);    
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
                    <Box display="flex" justifyContent='center' alignItems='center' marginTop="2%" >
                        <Text fontSize="xl">新規作成するものを選んでください。</Text>
                    </Box>
                    <Box marginTop="5%">
                        <Box display="flex" justifyContent='center' alignItems='center'>
                            <Button width="60%" bg="white" border="1px" borderColor="#CCC" marginTop="1%" onClick={() => onClick("/bank")}>
                                <Text>銀行</Text>
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent='center' alignItems='center'>
                            <Button width="60%" bg="white" border="1px" borderColor="#CCC" marginTop="1%" onClick={() => onClick("/credit_card")}>
                                <Text>クレカ</Text>
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent='center' alignItems='center'>
                            <Button width="60%" bg="white" border="1px" borderColor="#CCC" marginTop="1%" onClick={() => onClick("/salary")}>
                                <Text>給料</Text>
                            </Button>
                        </Box>
                        <Box display="flex" justifyContent='center' alignItems='center'>
                            <Button width="60%" bg="white" border="1px" borderColor="#CCC" marginTop="1%" onClick={() => onClick("/credit_card_payment")}>
                                <Text>クレカ支払い</Text>
                            </Button>
                        </Box>
                        
                    </Box>
                </Box>
                
            </Box>
        </Box>
    )
}