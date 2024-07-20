import { FC } from "react";
import { Link } from "react-router-dom";
import classes from "./BlockPurchase.module.css";
import RenderPhrase from "../../../../utils/getProductWordEnding";
interface BlockPurchaseProps {
  totalPrice: number;
  totalQuantity: number;
  handleProceedToOrder: () => void;
}
const BlockPurchase: FC<BlockPurchaseProps> = ({
  totalPrice,
  totalQuantity,
  handleProceedToOrder,
}) => {
  return (
    <div className={classes.basketContent__yourPurchases}>
      <p className={classes.basketContent__InyourBasket}>В корзине</p>
      <p className={classes.basketContent__qauantityOfProduct}>
        {totalQuantity} {RenderPhrase(totalQuantity)}
      </p>
      <div className={classes.basketContent__price}>
        <p className={classes.basketContent__totalPrice}>
          {totalPrice.toLocaleString("ru-RU")}
        </p>
        <p className={classes.basketContent__currencyPurchase}> ₽</p>
      </div>
      <Link to={"/makingOrder"}>
        <button
          className={classes.button_confirm}
          onClick={handleProceedToOrder}
        >
          Перейти к оформлению
        </button>
      </Link>
    </div>
  );
};
export default BlockPurchase;
