import { FC, useContext, useState } from "react";
import classes from "./AdminPanel.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import OrderItem from "./orderItem/OrderItem";
import orderService from "../../../services/order-service";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "../../../main";
import { InfoOrder } from "../../../types/type";

const AdminPanel: FC = () => {
  const { store } = useContext(Context);
  const [alldataorders, Setalldataorders] = useState<InfoOrder[]>([]);
  const hadleallInfoOrder = async () => {
    try {
      if (!store.isLoading) {
        if (store.isAuth) {
          const response = await orderService.getAll();
          const AllDataOrders = response;
          Setalldataorders(AllDataOrders);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    hadleallInfoOrder();
  }, []);
  if (!store.isLoading) {
    if (store.isAuth) {
      return (
        alldataorders && (
          <div className={classes.adminPanel}>
            <Link to="/" className={classes.adminInfo__back}>
              Вернуться на главную
            </Link>
            <p className={classes.adminInfo__title}>Админ панель</p>
            <div className={classes.ordersList}>
              {alldataorders.map((el) => (
                <OrderItem
                  key={el.id}
                  orderInfo={el}
                  allOrders={alldataorders}
                  setAllOrders={Setalldataorders}
                  updateOrders={hadleallInfoOrder}
                />
              ))}
            </div>
          </div>
        )
      );
    }
  }
};

export default AdminPanel;
