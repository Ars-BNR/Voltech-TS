import { FC } from "react";
import classes from "./FirstPage.module.css";
import pc from "../../../assets/img/pc.png";
import kb from "../../../assets/img/kb.png";
import mn from "../../../assets/img/mn.png";
import ms from "../../../assets/img/ms.png";
import { Link } from "react-router-dom";

const FirstPage: FC = () => {
  return (
    <div className={classes.voltechMain}>
      <div className={classes.voltechMain}>
        <div className={classes.leftBlock}>
          <Link to="/catalog?category=PC">
            <p className={classes.title}>Готовые решения</p>
            <img src={pc} alt="" className={classes.leftBlock__img} />
          </Link>
        </div>
        <div className={classes.rightBlock}>
          <div className={classes.topRightBlock}>
            <Link to="/catalog?category=keyboards">
              <p className={classes.title}>Клавиатуры</p>
              <img src={kb} alt="" className={classes.rightBlock__img} />
            </Link>
          </div>
          <div className={classes.bottomRightBlock}>
            <Link to="/catalog?category=monitors">
              <div className={classes.bottomRightBlockLeft}>
                <p className={classes.bottomRightBlockLeft__title}>Мониторы</p>
                <div className={classes.bottomRightBlockLeft__picture}>
                  <img
                    src={mn}
                    alt=""
                    className={classes.bottomRightBlockLeft__img}
                  />
                </div>
              </div>
            </Link>
            <div className={classes.bottomRightBlockRight}>
              <Link to="/catalog?category=mouse">
                <p className={classes.bottomRightBlockRight__title}>Мыши</p>
                <div className={classes.bottomRightBlockRight__picture}>
                  <img
                    src={ms}
                    alt=""
                    className={classes.bottomRightBlockRight__img}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
