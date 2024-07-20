import { Link } from "react-router-dom";
import classes from "./HeaderButton.module.css";
import { FC } from "react";
const HeaderButton: FC = () => {
  return (
    <div className={classes.headerButton}>
      <Link to="/login" className={classes.headerButton__link}>
        Вход
      </Link>
      <Link to="/registration" className={classes.headerButton__link}>
        Регистрация
      </Link>
    </div>
  );
};

export default HeaderButton;
