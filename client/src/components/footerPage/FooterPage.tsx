import { FC } from "react";
import classes from "./FooterPage.module.css";
const FooterPage: FC = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.voltechFooter}>
          <p className={classes.voltechFooter__text}>+7 (495) 111-33-22</p>
          <p className={classes.voltechFooter__text}>с 9:00 до 21:00</p>
          <p className={classes.voltechFooter__text}>voltech@mail.ru</p>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
