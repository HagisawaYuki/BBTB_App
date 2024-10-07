
import { ChakraProvider, Link, Button, Text, Box } from "@chakra-ui/react";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      
      <body className="min-h-dvh" style={{background: "#EEE"}}>
        <ChakraProvider>
          <Header ></Header>
        </ChakraProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
        <ChakraProvider>
          <Footer></Footer>
        </ChakraProvider>
      </body>
    </html>
  );
}
