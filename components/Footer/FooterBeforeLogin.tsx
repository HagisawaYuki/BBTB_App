
import { url } from "@/constant/urlConst";
import { Box, Link, Button } from "@chakra-ui/react";


const FooterBeforeLogin = () => {

    return (
        <Box width="80%" marginLeft="10%">
            {/* <ul className="flex justify-between">
                {footerURLs.map((item => <li key={item.name} style={{paddingRight: "0%"}}>
                    <Button variant="ghost" paddingTop="4vh">
                        <Link href={item.href}>{item.name}</Link>
                    </Button>
                </li>))}
            </ul> */}
        </Box>
    );
};

export default FooterBeforeLogin;