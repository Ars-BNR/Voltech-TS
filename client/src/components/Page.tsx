import { FC } from "react";
import FooterPage from "./footerPage/FooterPage";
import HeaderPage from "./headerPage/HeaderPage";
import cl from "./Page.module.css";
import { Outlet } from "react-router-dom";
const Page: FC = () => {
  return (
    <div className={cl.wrapper}>
      <HeaderPage />
      <div className={cl.main}>
        <div className={cl.main__container}>
          <Outlet />
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default Page;
