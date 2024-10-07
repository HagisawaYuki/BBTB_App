
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const checkAuthPermit = async(router: AppRouterInstance, pathname: string, searchParams: any) => {
    await fetch("http://localhost:8080/bbtb", {method: "GET"})
        .then((res) => res.json())
        .then((data) => {
            if(data){
                if(data.isLogin){
                    router.push(pathname + "?" + searchParams);
                }else{
                    router.push("/login");
                }
            }
        });
}

