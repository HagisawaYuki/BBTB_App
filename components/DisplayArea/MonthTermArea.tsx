
import { Box, Button, Text } from "@chakra-ui/react";

type MonthTermAreaProps = {
    year: number;
    month: number;
    setYear: any;
    setMonth: any;
    end: number;
    height: string;
};

const MonthTermArea = ({year, month, setYear, setMonth, end, height}: MonthTermAreaProps) => {

    const toNextMonth = () => {
        if(month === 12){
            setYear(year + 1);
            setMonth(1)
        }else{
            setMonth(month + 1);
        }
    }
    const toLastMonth = () => {
        if(month === 1){
            setYear(year - 1);
            setMonth(12)
        }else{
            setMonth(month - 1);
        }
    }
    
    return (
        <Box 
            display="flex" 
            justifyContent='center' 
            alignItems='center'
            width="100%"
            height={height}
            
        >
            <Button bg="white" onClick={toLastMonth}>
                <Text>＜</Text>
            </Button>
            <Box 
                display="flex" 
                justifyContent="center"
                gap="2%" 
                borderRadius="5px"
                width="70%"
                height="90%"
                bg="#4EA"
            >
                <Text position="relative" top="25%">{year}年{month}月</Text>
                <Text position="relative" top="25%">({month}月1日~{month}月{end}日)</Text>
            </Box>
            <Button bg="white" onClick={toNextMonth}>
                <Text>＞</Text>
            </Button>
            
        </Box>
    );
};
export default MonthTermArea;