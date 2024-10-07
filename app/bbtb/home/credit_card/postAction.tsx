
"use client"

import { CreditCardJson } from "@/constant/typeConst";
import { calCreditCardMoney, sortCreditCardPayments } from "@/utils/calculation";


export const postAction = async (id: number, setCreditCard: any, setSortCreditCards: any, setMoney: any, year: number, month: number) => {
    const postData = {
        clickCreditCardID: id
    };
    // const [isLogin, setIsLogin] = useState<any>();
    const res = await fetch('http://localhost:8080/bbtb/home/credit_card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(postData),
    });
    await fetch("http://localhost:8080/bbtb/home/credit_card", {method: "GET"})
        .then((res) => res.json())
        .then((data: CreditCardJson) => {
            console.log(data)
            if(data.id !== 0){
                //BBTBデータを保存
                setCreditCard(data);
                data.credit_card_payments.length !== 0 && setSortCreditCards(sortCreditCardPayments(data.credit_card_payments, year, month));
                data.credit_card_payments.length !== 0 && setMoney(calCreditCardMoney(data.credit_card_payments, year, month));
            }
        });
    
}
