
import { url } from "@/constant/urlConst";
import { Box, Link, Button, Text } from "@chakra-ui/react";

type HeaderAfterLoginProps = {
    page: string;
}

const pageName = [
    {page: "home", title: "ホーム"},
    {page: "create", title: "新規作成"},
    {page: "edit", title: "編集"},
    {page: "setting", title: "設定"},
    {page: "calender", title: "カレンダー"},
    {page: "logout", title: "ログアウト"},

]



const HeaderAfterLogin = ({page}: HeaderAfterLoginProps) => {
    let title: string = "";
    pageName.forEach((p) => {
        if(page === p.page){
            title = p.title;
        }
    })
    return (
        <Box display="flex" className="justify-between">
            <Box width="80%" marginTop="1%" marginLeft="10%" display="flex" justifyContent="center" alignItems="center">
                <Text fontSize="3xl" display="inline-block">{title}</Text>
            </Box>
            <Box display="flex"width="10%">
                <Button variant="ghost" paddingTop="4vh">
                    <Link href="/logout">
                        <Text>LOGOUT</Text>
                    </Link>
                </Button>
            </Box>
        </Box>
    );
};

export default HeaderAfterLogin;