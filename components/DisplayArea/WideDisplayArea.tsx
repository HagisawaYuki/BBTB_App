
import { url } from "@/constant/urlConst";
import { Box, Button, Text } from "@chakra-ui/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type WideDisplayAreaProps = {
    title: string;
    amount?: number;
    year?: number;
    month?: number;
    day?: number;
    height: string;
    isMoney?: boolean;
    isDate?: boolean;
    router?: AppRouterInstance;
    entity?: string;
};

const WideDisplayArea = ({title, amount, year, month, day, height, isMoney, isDate, router, entity}: WideDisplayAreaProps) => {

    const onCreate = () => {
        if(entity === "credit_card_payment"){
            router?.push(url.bbtb.create.credit_card_payment.url);
        }
    }
    
    return (
        <Box 
            display="flex" 
            justifyContent='center' 
            alignItems='center'
            height={height}
        >
            <Box 
                display="flex" 
                justifyContent="space-between"
                border="1px" 
                borderColor="#CCC" 
                borderRadius="5px" 
                width="80%"
                height="90%"
            >
                <Text fontSize="sm" position="relative" top="25%" marginLeft="2%">{title}</Text>
                {isMoney && 
                <Box display="flex" gap="3%" marginRight="2%">
                    <Text fontSize="xl" position="relative" top="25%">{amount}</Text>
                    <Text fontSize="sm" position="relative" top="50%">円</Text>
                </Box>
                }
                {isDate && 
                <Box display="flex" gap="3%" marginRight="5%">
                    {
                        month === 0 ? 
                        <Box display="flex">
                            <Text position="relative" top="25%">未登録です。</Text>
                            <Button bg="white" top="20%" height="80%" padding="0" onClick={onCreate}>
                                <Text color="blue">登録しますか？</Text>
                            </Button>
                        </Box>
                        
                        :
                        <Box display="flex" gap="3%" marginRight="5%">
                            <Text fontSize="xl" position="relative" top="25%">{year}</Text>
                            <Text fontSize="sm" position="relative" top="40%">年</Text>
                            <Text fontSize="xl" position="relative" top="25%">{month}</Text>
                            <Text fontSize="sm" position="relative" top="40%">月</Text>
                            <Text fontSize="xl" position="relative" top="25%">{day}</Text>
                            <Text fontSize="sm" position="relative" top="40%">日</Text>
                        </Box>

                        
                    }
                    
                    
                </Box>
                }
            </Box>
        </Box>
    );
};
export default WideDisplayArea;