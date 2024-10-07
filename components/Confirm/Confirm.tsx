import { url } from "@/constant/urlConst";
import { Box, Button, Link, Text } from "@chakra-ui/react";

type ConfirmProps = {
    form: string;
    entity: string;
};


const Confirm = ({form, entity}: ConfirmProps) => {
    let URL;
    if(form === "create"){
        URL = url.bbtb.create.url;
    }else if(form === "edit"){
        URL === url.bbtb.edit.url;
    }
    return(
        <Box marginTop="10%">
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Text fontSize="2xl">作成完了しました。</Text>
            </Box>
                    
            <Box display='flex' justifyContent='center' alignItems='center' gap="5%" marginTop="3%">
                <Button bg="#88D" width="30%">
                    <Link href={url.bbtb.home.url}>
                        <Text>ホームへ戻る</Text>
                    </Link>
                </Button>
                <Button bg="#D88" width="30%">
                    <Link href={URL}>
                        <Text>他にも新規作成する</Text>
                    </Link>
                </Button>
            </Box>
        </Box>
    );
}
export default Confirm;