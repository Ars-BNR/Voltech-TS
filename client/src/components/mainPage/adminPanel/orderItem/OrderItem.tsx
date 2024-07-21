import React, { FC, useState } from "react";
import classes from "./OrderItem.module.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import RenderPhrase from "../../../../utils/getProductWordEnding";
import orderService from "../../../../services/order-service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import convertDateToDDMMYYYY from "../../../../utils/convertDate";
import { InfoOrder } from "../../../../types/type";
interface OrderItemProps {
  orderInfo: InfoOrder;
  allOrders: InfoOrder[];
  setAllOrders: React.Dispatch<React.SetStateAction<InfoOrder[]>>;
  updateOrders: () => void;
}

const OrderItem: FC<OrderItemProps> = ({
  orderInfo,
  allOrders,
  setAllOrders,
  updateOrders,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState(orderInfo.status);
  const options = ["Обработка", "Выполняется", "Доставлено", "Отмена"];
  const itemRef = useRef<HTMLDivElement>(null);

  const handleClass = () => {
    switch (selected) {
      case "Обработка":
        return "_process";
      case "Выполняется":
        return "_perform";
      case "Доставлено":
        return "_delivery";
      case "Отмена":
        return "_cancel";
      case "Отменен пользователем":
        return "_cancel";
    }
  };
  const changeOrderStatus = async (id_order: string, newStatus: string) => {
    if (newStatus === selected) return;
    try {
      await orderService.changeStatus({
        id_order,
        newStatus,
      });
      setSelected(newStatus);
      const updatedOrders = allOrders.map((order) =>
        order.id_order === id_order ? { ...order, status: newStatus } : order
      );
      setAllOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id_order: string) => {
    try {
      await orderService.delete(id_order);
      toast.success("Заказ удален");
      updateOrders();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.ordersItem}>
      <div className={classes.numberOrderBlock}>
        <p className={classes.numberOrderBlock__number}>
          Номер заказа: {orderInfo.id_order}
        </p>
        <p className={classes.numberOrderBlock__date}>
          Дата заказа: {convertDateToDDMMYYYY(orderInfo.date)}
        </p>
        <Link
          to={{
            pathname: `/info/${orderInfo.id_order}`,
          }}
        >
          <button className={classes.moreOrderBlock__btn}>
            Подробнее о заказе
          </button>
        </Link>
      </div>
      <div className={classes.equipmentOrderBlock}>
        <p className={classes.equipmentOrderBlock__count}>
          {orderInfo.allCount} {RenderPhrase(orderInfo.allCount)}
        </p>
        <div className={classes.equipmentsList}>
          {orderInfo.info &&
            orderInfo.info.map((item) => (
              <div
                key={item.id_equipment}
                className={classes.equipmentsList__item}
              >
                <p className={classes.equipmentsList__title}>
                  {" "}
                  {item.equipment.brand} {item.equipment.model}
                </p>
                <p className={classes.equipmentsList__count}>
                  {item.count} шт.
                </p>
                <p className={classes.equipmentsList__price}>
                  {item.equipment.price.toLocaleString("ru-RU")}{" "}
                  <span className="rub">₽</span>
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className={classes.statusOrderBlock}>
        <p className={classes.statusOrderBlock__title}>Статус</p>
        <div
          className={`${classes.statusOrderBlockStatus}  ${
            classes["statusOrderBlockStatus_process" + handleClass()]
          }`}
        >
          <div
            className={`${classes.statusOrderBlockStatusHeader}  ${
              classes["statusOrderBlockStatusHeader" + handleClass()]
            }`}
            onClick={() => setIsActive(!isActive)}
          >
            <span className={`${classes.statusOrderBlockStatus__text}`}>
              {selected}
            </span>
            <svg
              width="20.000000"
              height="20.000000"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className={`${classes.arrow}  ${isActive && classes.active}`}
            >
              <defs>
                <clipPath id="clip51_277">
                  <rect
                    id="Frame"
                    width="12.000000"
                    height="6.000000"
                    transform="translate(4.000000 8.000000)"
                    fill="white"
                    fillOpacity="0"
                  />
                </clipPath>
                <clipPath id="clip51_274">
                  <rect
                    id="Frame"
                    width="20.000000"
                    height="20.000000"
                    transform="translate(20.000000 0.000000) rotate(90.000000)"
                    fill="white"
                    fillOpacity="0"
                  />
                </clipPath>
              </defs>
              <rect
                id="Frame"
                width="20.000000"
                height="20.000000"
                transform="translate(20.000000 0.000000) rotate(90.000000)"
                fill="#FFFFFF"
                fillOpacity="0"
              />
              <g clipPath="url(#clip51_274)">
                <rect
                  id="Frame"
                  width="12.000000"
                  height="6.000000"
                  transform="translate(4.000000 8.000000)"
                  fill="#FFFFFF"
                  fillOpacity="0"
                />
                <g clipPath="url(#clip51_277)">
                  <path
                    id="Vector"
                    d="M10.0005 14C9.62207 14 9.26514 13.8542 8.99658 13.5901L4 8.65991L4.66895 8L9.66553 12.9302C9.75586 13.0149 9.87549 13.0623 10 13.0623C10.1245 13.0623 10.2441 13.0149 10.3345 12.9302L15.3311 8L16 8.65991L11.0034 13.5901C10.8721 13.7207 10.7153 13.824 10.543 13.8943C10.3706 13.9646 10.186 14.0005 9.99951 14L10.0005 14Z"
                    fill="#0068B3"
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                    className={`${classes.statusOrderBlockStatus__arrow}  ${
                      classes["statusOrderBlockStatus__arrow" + handleClass()]
                    }`}
                  />
                </g>
              </g>
            </svg>
          </div>
          <div
            className={`${classes.statusOrderBlockStatusBody}  ${
              classes["statusOrderBlockStatusBody" + handleClass()]
            }`}
            style={
              isActive
                ? { height: itemRef.current?.scrollHeight, opacity: 1 }
                : { height: "0px", opacity: 0 }
            }
            ref={itemRef}
          >
            {options
              .filter(
                (opt) => opt.toUpperCase() !== orderInfo.status.toUpperCase()
              )
              .map((newStatus, id) => (
                <div
                  className={classes.statusOrderBlockStatusBodyItem}
                  key={id}
                  onClick={() =>
                    changeOrderStatus(orderInfo.id_order, newStatus)
                  }
                >
                  <span className={`${classes.statusOrderBlockStatus__text}`}>
                    {newStatus}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={classes.resultOrderBlock}>
        <p className={classes.resultOrderBlock__title}>Итог</p>
        <p className={classes.resultOrderBlock__price}>
          {orderInfo.price.toLocaleString("ru-RU")}{" "}
          <span className="rub">₽</span>
        </p>
        <button
          className={classes.resultOrderBlock__btn}
          onClick={() => handleDelete(orderInfo.id_order)}
        >
          Удалить заказ
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
