import classes from "./HeaderProfile.module.css";
import trash from "../../../assets/icon/basket.svg";
import profile from "../../../assets/icon/user.svg";
import exit from "../../../assets/icon/exit.svg";
import arrow from "../../../assets/icon/arrow.svg";
import { FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
const HeaderProfile: FC = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [openid, setOpenId] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await store.logout(navigate);
    } catch (error) {
      console.log(error);
    }
  };
  const username = store.profile?.login;
  return (
    <div className={classes.headerProfile}>
      <div className={classes.trashBlock}>
        <img src={trash} alt="" className={classes.trashBlock__img} />
        <Link to="/basket" className={classes.trashBlock__text}>
          Корзина
        </Link>
      </div>
      <div
        className={classes.profileBlock}
        onClick={() => setOpenId((prev) => !prev)}
      >
        <div className={classes.profileBlockLeft}>
          <img src={profile} alt="" className={classes.profileBlock__img} />
          <span className={classes.profileBlock__text}>{username}</span>
        </div>
        <img
          src={arrow}
          alt=""
          className={`${classes.arrow} ${openid ? classes.active : ""}`}
        />
      </div>
      <div
        className={classes.profilePopup}
        style={
          openid
            ? { height: itemRef.current?.scrollHeight, opacity: 1 }
            : { height: "0px", opacity: 0 }
        }
        ref={itemRef}
      >
        <ul className={classes.popupList}>
          <li className={classes.popupList__item}>
            <img src={trash} alt="" />
            <Link to="/ordersInfo" className={classes.popupList__item}>
              Заказы
            </Link>
          </li>
          <li onClick={handleLogout} className={classes.popupList__item}>
            <img src={exit} alt="" />
            Выход
          </li>
        </ul>
      </div>
    </div>
  );
};

export default observer(HeaderProfile);
