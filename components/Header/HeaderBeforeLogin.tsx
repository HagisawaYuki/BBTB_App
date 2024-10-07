
import { url } from "@/constant/urlConst";
import { Box, Link, Button } from "@chakra-ui/react";

const headerURLs = [
    {name: "HOME", href: "/"},
    {name: "LOGIN", href: url.login.url},
    {name: "SIGN UP", href: url.signup.url},
];

const HeaderBeforeLogin = () => {

    return (
        <Box display="flex" className="justify-between">
            <Link href="/" fontSize="3xl" marginLeft="2%" marginBottom="1%" display="inline-block">BBTB</Link>
            <ul className="flex gap-4">
                {headerURLs.map((item => <li key={item.name}>
                    <Button variant="ghost" paddingTop="4vh">
                    <Link href={item.href}>{item.name}</Link>
                    </Button>
                </li>))}
            </ul>
        </Box>
    );
};

export default HeaderBeforeLogin;