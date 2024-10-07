"use client"

import { url } from "@/constant/urlConst";
import { Box, Button, Link, Text, WrapItem } from "@chakra-ui/react";



export default function Home() {
  

  return (
    <Box 
      display='flex' 
      justifyContent='center' 
      alignItems='center' 
      width="100%" 
      height="600px" 
      
    >
      <Box 
        display='flex' 
        justifyContent='center' 
        alignItems='center' 
      >
        <Box 
          display="flex" 
          flexDirection="column" 
          justifyContent='center'  
          alignItems='center' 
          w={{ base: '90px', sm: '150px', md: '400px', lg: '500px', xl: '600px' }} 
          bg='white' 
          marginTop="1%"
          paddingTop="10%"
          paddingBottom="10%"
        >
          <Text fontSize="2xl" as="u">会員登録している方はこちらから</Text>
          <Link color='black' marginTop="3%" marginBottom="3%" fontSize="xl" href={url.login.url}>ログイン画面へ</Link>
          <Text fontSize="2xl" as="u">会員登録していない方はこちらから</Text>
          <Link color='black' marginTop="3%" marginBottom="3%" fontSize="xl" href={url.signup.url}>新規会員登録画面へ</Link>
        </Box>
      </Box>
      
        
        
    </Box>
  );
}
