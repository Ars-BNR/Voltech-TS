import { FC, memo, useContext, useEffect } from "react";
import classes from "./CardEquipment.module.css";
import minus from "../../../../assets/icon/minus.svg";
import plus from "../../../../assets/icon/plus.svg";
import trash from "../../../../assets/icon/trash.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../../main";
import basketService from "../../../../services/basket-service";
import { BasketItem } from "../../../../types/type";
interface CardEquipmentProps {
  elbasketData: BasketItem;
  onBasketUpdate: () => void;
}
const CardEquipment: FC<CardEquipmentProps> = ({
  elbasketData,
  onBasketUpdate,
}) => {
  const { store } = useContext(Context);
  const [count, setCount] = useState(elbasketData.count);
  console.log("Card is Call");
  const handleIncrement = async () => {
    try {
      const idUsers = store.profile.id;
      await basketService.post({
        id_equipment: elbasketData.id_equipment,
        id_user: idUsers,
        count: 1,
      });
      setCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDecrement = async () => {
    if (count > 1) {
      try {
        const idUsers = store.profile.id;
        await basketService.decreasebasket({
          id_equipment: elbasketData.id_equipment,
          id_user: idUsers,
        });
        setCount((prevCount) => prevCount - 1);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleDelete = async () => {
    try {
      const idUsers = store.profile.id;
      await basketService.deletebasket({
        id_equipment: elbasketData.id_equipment,
        id_user: idUsers,
      });
      setCount(0);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    onBasketUpdate();
  }, [count]);
  return (
    <div className={classes.basketBlock}>
      <Link to={`/personalPageEquipment/${elbasketData.id_equipment}`}>
        <div className={classes.basketBlock__equipImg}>
          <img
            className={classes.equipImg}
            src={
              "http://localhost:9375/api/img/" + elbasketData.equipment.pathimg
            }
            alt=""
          />
        </div>
      </Link>
      <div className={classes.basketBlock_information}>
        <p className={classes.basketBlock_nameEquip}>
          {elbasketData.equipment.brand} {elbasketData.equipment.model}
        </p>
        <p className={classes.basketBlock__priceOfProduct}>
          {elbasketData.equipment.price.toLocaleString("ru-RU")}{" "}
          <span className="rub">₽</span>
        </p>
      </div>
      <div className={classes.basketBlock__blockCounter}>
        <img
          onClick={handleDecrement}
          src={minus}
          className={classes.basket__minus}
          alt=""
        />
        <p className={classes.basket__count}>{count}</p>
        <img
          onClick={handleIncrement}
          src={plus}
          className={classes.basket__plus}
          alt=""
        />
      </div>
      <div className={classes.basket__blockTrash}>
        <img src={trash} alt="" onClick={handleDelete} />
      </div>
    </div>
  );
};
export default memo(CardEquipment);
