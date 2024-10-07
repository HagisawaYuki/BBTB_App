


import { Box, Text } from "@chakra-ui/react";

type HalfDisplayAreaProps = {
    title: string;
    amount: number;
    
};

const HalfDisplayArea = ({title, amount}: HalfDisplayAreaProps) => {
    
    return (
        <Box 
            display="flex" 
            justifyContent="space-between"
            border="1px" 
            borderColor="#CCC" 
            borderRadius="5px" 
            width="39%"
            height="90%"
        >
            <Text fontSize="sm" position="relative" top="25%" marginLeft="4%">{title}</Text>
            <Box display="flex" gap="3%" marginRight="4%">
                <Text fontSize="xl" position="relative" top="25%">{amount}</Text>
                <Text fontSize="sm" position="relative" top="50%">円</Text>
            </Box>
        </Box>
    );
};
export default HalfDisplayArea;