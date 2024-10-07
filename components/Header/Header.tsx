"use client"
// components/Header.js
import { usePathname } from 'next/navigation';
import HeaderBeforeLogin from './HeaderBeforeLogin';

import { url } from '@/constant/urlConst';
import HeaderAfterLogin from './HeaderAfterLogin';

// type HeaderProps = {
//   setTitle: any
// }

const Header = () => {
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
  const renderHeaderContent = () => {
    switch (path) {
      case '/':
        return  <HeaderBeforeLogin></HeaderBeforeLogin>;
      case url.login.url:
        return <HeaderBeforeLogin></HeaderBeforeLogin>;
      case url.signup.url:
        return <HeaderBeforeLogin></HeaderBeforeLogin>;
      case url.logout.url:
        return <HeaderAfterLogin page='logout'></HeaderAfterLogin>;
      case url.bbtb.home.url:
        return <HeaderAfterLogin page='home'></HeaderAfterLogin>;
      case url.bbtb.create.url:
        return <HeaderAfterLogin page='create'></HeaderAfterLogin>;
      case url.bbtb.edit.url:
        return <HeaderAfterLogin page='edit'></HeaderAfterLogin>;
      case url.bbtb.calender.url:
        return <HeaderAfterLogin page='calender'></HeaderAfterLogin>;
      case url.bbtb.setting.url:
        return <HeaderAfterLogin page='setting'></HeaderAfterLogin>;
      default:
        
    }
  };

  return (
    <header className=" border-b justify-between" style={{background: `#FFF`, paddingTop: "1%"}}>
      {renderHeaderContent()}
    </header>
  );
};

export default Header;
