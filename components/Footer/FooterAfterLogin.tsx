
import { url } from "@/constant/urlConst";
import { Box, Link, Button } from "@chakra-ui/react";

const footerURLs = [
    {name: "ホーム", href: url.bbtb.home.url},
    {name: "カレンダー", href: url.bbtb.calender.url},
    {name: "新規作成", href: url.bbtb.create.url},
    {name: "編集", href: url.bbtb.edit.url},
    {name: "設定", href: url.bbtb.setting.url}
];

const FooterAfterLogin = () => {

    return (
        <Box width="80%" marginLeft="10%">
            <ul className="flex justify-between">
                {footerURLs.map((item => <li key={item.name} style={{paddingRight: "0%"}}>
                    <Button variant="ghost" paddingTop="4vh">
                        <Link href={item.href}>{item.name}</Link>
                    </Button>
                </li>))}
            </ul>
        </Box>
    );
};

export default FooterAfterLogin;




