import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import NotFound from "../ui/notFound/NotFound";
import Page from "../Page";
import HeaderPage from "../headerPage/HeaderPage";
import FooterPage from "../footerPage/FooterPage";
import cl from "../Page.module.css";
interface PrivateRouteProps {
  role: string;
}
const PrivateRoute: FC<PrivateRouteProps> = ({ role }) => {
  const { store } = useContext(Context);
  if (!store.isLoading) {
    if (store.isAuth) {
      if (store.profile.role === role) {
        return <Page />;
      } else {
        return (
          <div className={cl.wrapper}>
            <HeaderPage />
            <div className={cl.main}>
              <div className={cl.main__container}>
                <NotFound />
              </div>
            </div>
            <FooterPage />
          </div>
        );
      }
    } else {
      return <Navigate to="/adminPanel" />;
    }
  }
};

export default observer(PrivateRoute);
