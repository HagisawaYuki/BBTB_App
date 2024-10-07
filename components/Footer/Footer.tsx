"use client"
// components/Header.js
import { usePathname } from 'next/navigation';
import { url } from '@/constant/urlConst';
import FooterAfterLogin from './FooterAfterLogin';
import FooterBeforeLogin from './FooterBeforeLogin';



const Footer = () => {
    const pathname = usePathname();
    let path: string = "";
    if(pathname.includes(url.login.url)){
      path = url.login.url;
    }else if(pathname.includes(url.signup.url)){
      path = url.signup.url;
    }else if(pathname.includes(url.bbtb.home.url)){
      path = url.bbtb.home.url;
    }else if(pathname.includes(url.bbtb.create.url)){
      path = url.bbtb.create.url;
    }else if(pathname.includes(url.bbtb.edit.url)){
      path = url.bbtb.edit.url;
    }else if(pathname.includes(url.bbtb.calender.url)){
      path = url.bbtb.calender.url;
    }else if(pathname.includes(url.bbtb.setting.url)){
      path = url.bbtb.setting.url;
    }else if(pathname.includes(url.logout.url)){
      path = url.logout.url;
    }
    const renderFooterContent = () => {
        switch (path) {
            case '/':
                return  <FooterBeforeLogin></FooterBeforeLogin>;
            case url.login.url:
                return <FooterBeforeLogin></FooterBeforeLogin>;
            case url.signup.url:
                return <FooterBeforeLogin></FooterBeforeLogin>;
            case url.logout.url:
                return <FooterAfterLogin></FooterAfterLogin>;
            case url.bbtb.home.url:
                return <FooterAfterLogin></FooterAfterLogin>;
            case url.bbtb.create.url:
                return <FooterAfterLogin></FooterAfterLogin>;
            case url.bbtb.edit.url:
                return <FooterAfterLogin></FooterAfterLogin>;
            case url.bbtb.calender.url:
                return <FooterAfterLogin></FooterAfterLogin>;
            case url.bbtb.setting.url:
                return <FooterAfterLogin></FooterAfterLogin>;
            default:
                return <FooterAfterLogin></FooterAfterLogin>;
        }
    };

  return (
    <header className=" sticky top-full h-16 flex items-center border-t" style={{background: "#FFF", width: "100%"}}>
      {renderFooterContent()}
    </header>
  );
};

export default Footer;