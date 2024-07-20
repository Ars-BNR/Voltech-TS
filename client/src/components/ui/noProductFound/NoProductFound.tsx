import { FC } from "react";
import classes from "./NoProductFound.module.css";

const NoProductFound: FC = () => {
  return (
    <div className={classes.noProductsFound}>
      <p>К сожалению, по вашим критериям товары не найдены.</p>
    </div>
  );
};

export default NoProductFound;
