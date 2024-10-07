"use client"

import { LogoutResponse } from "@/constant/typeConst";
import { url } from "@/constant/urlConst";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const postAction = async (router: AppRouterInstance) => {
    await fetch("http://localhost:8080/logout", {method: "GET"})
        .then((res) => res.json())
        .then((data: LogoutResponse) => {
            if(data){
                router.push(url.login.url);
            }
        });
    
}