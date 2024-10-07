"use client"

import { url } from "@/constant/urlConst";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const postAction = async (userID: string, password: string, router: AppRouterInstance, setIsSignup: any, setErrorMessage: any) => {
    const postData = {
        userID: userID, 
        password: password
    };
    // const [isLogin, setIsLogin] = useState<any>();
    const res = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
		    'Access-Control-Allow-Headers': '*',
		    'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(postData),
    });
    await fetch("http://localhost:8080/signup", {method: "GET"})
        .then((res) => res.json())
        .then((data) => {
            if(data){
                setIsSignup(data.isSignup);
                setErrorMessage(data.errorMessage);
                if(data.isSignup){
                    router.push(url.login.url);
                }
                
            }
        });
    
}