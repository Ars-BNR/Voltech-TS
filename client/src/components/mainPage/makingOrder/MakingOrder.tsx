import React, { useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./MakingOrder.module.css";
import { useNavigate } from "react-router-dom";
import TextField from "../../ui/Form/TextField";
import RenderPhrase from "../../../utils/getProductWordEnding";
import basketService from "../../../services/basket-service";
import orderService from "../../../services/order-service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Context } from "../../../main";
import { Errors } from "../../../types/type";

const MakingOrder = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const totalPrice = parseFloat(localStorage.getItem("totalPrice") || "0");
  const totalQuantity = parseInt(localStorage.getItem("TotalQuantity") || "0");
  const [errors, setErrors] = useState({} as Errors);
  const [order, Setorder] = useState({
    name: "",
    surname: "",
    number: "",
    address: "",
    id_user: store.profile.id,
    price: totalPrice,
    allCount: totalQuantity,
    info: [],
  });
  const handleShowBasket = async () => {
    try {
      const idUsers = store.profile.id;
      if (!idUsers) {
        console.error("ID пользователя не найден");
        return;
      }
      if (order.price !== 0 && order.allCount !== 0) {
        const response = idUsers && (await basketService.get(idUsers));
        const ordersData = response;
        console.log("ordersData", ordersData);
        Setorder((prevOrder) => ({ ...prevOrder, info: ordersData }));
      } else {
        toast.error("Не делай вид что ты обманул систему");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleShowBasket();
  }, []);
  const clearBasket = async () => {
    try {
      const idUsers = store.profile.id;
      if (idUsers) {
        await basketService.clearbasket(idUsers);
        localStorage.removeItem("TotalQuantity");
        localStorage.removeItem("totalPrice");
        console.log("Корзина очищена");
      }
    } catch (error) {
      console.error("Ошибка при очистке корзины", error);
    }
  };
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.name === "number") {
        const phoneNumber = parsePhoneNumberFromString(
          event.target.value,
          "RU"
        );
        if (phoneNumber) {
          event.target.value = phoneNumber.formatInternational();
        }
      }
      const { name, value } = event.target;
      Setorder((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );
  const validateScheme = yup.object().shape({
    address: yup
      .string()
      .required("Адрес обязателен для заполнения")
      .matches(
        /^г\.[А-Яа-я]+, ул\.[А-Яа-я]+ \d+, кв\.\d+$/,
        "Адрес должен быть в формате 'г.Город, ул.Улица Номер, кв.Номер'"
      ),
    number: yup
      .string()
      .required("Телефон обязателен для заполнения")
      .matches(
        /^\+7 \d{3} \d{3} \d{2} \d{2}$/,
        "Телефон должен быть в формате +7 777 777 77 77"
      ),
    surname: yup
      .string()
      .required("Фамилия обязателена для заполнения")
      .matches(
        /^[a-zA-Zа-яА-Я]*$/,
        "Фамилия может быть на Латинице или на Кириллице"
      ),
    name: yup
      .string()
      .required("Имя обязателено для заполнения")
      .matches(
        /^[a-zA-Zа-яА-Я]*$/,
        "Имя может быть на Латинице или на Кириллице"
      ),
  });
  const validate = () => {
    validateScheme
      .validate(order)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };
  useEffect(() => {
    validate();
  }, [order]);
  const isValid = Object.keys(errors).length === 0;
  const HandleAddOrder = async () => {
    const { name, number, surname, address } = order;
    if (!name || !number || !surname || !address) {
      toast.error("Заполните все  данные получателя");
      return;
    }
    const isValid = validate();
    if (!isValid) return;
    try {
      if (order.price !== 0 && order.allCount !== 0) {
        const response = await orderService.post(order);
        console.log(response);
        clearBasket();
        toast.success(
          "Заказ добавлен, проверьте заказы в личном кабинете заказов."
        );
        navigate("/catalog");
      } else {
        toast.info("Купите что-нибудь чтобы перейти на эту страницу");
      }
    } catch (error) {
      console.log("ошибка с Оформлением заказа", error);
    }
  };
  return (
    <div className={classes.makingOrder}>
      <Link to="/basket" className={classes.BackToBasket}>
        Вернуться в корзину
      </Link>
      <p className={classes.titleOrder}>Оформление заказа</p>
      <p className={classes.titleDataConsignee}>Данные получателя</p>
      <form
        className={classes.Content__dataConsignee}
        action=""
        onSubmit={(e) => e.preventDefault()}
      >
        <TextField
          type="text"
          name="name"
          value={order.name}
          onChange={handleChange}
          placeholder="Имя"
          error={errors.name}
          customClass={classes.Content__InputName}
          customBlockClass={classes.blockinputClass}
        />
        <TextField
          type="text"
          name="number"
          value={order.number}
          onChange={handleChange}
          placeholder="Телефон (+7-777-777-77-77)"
          error={errors.number}
          customClass={classes.Content__InputPhone}
          customBlockClass={classes.blockinputClass}
        />
        <TextField
          type="text"
          name="surname"
          value={order.surname}
          onChange={handleChange}
          placeholder="Фамилия"
          error={errors.surname}
          customClass={classes.Content__InputSurname}
          customBlockClass={classes.blockinputClass}
        />
        <TextField
          type="text"
          name="address"
          value={order.address}
          onChange={handleChange}
          placeholder="Адрес (г.Уфа, ул.Славы 874, кв.753)"
          error={errors.address}
          customClass={classes.Content__InputAddress}
          customBlockClass={classes.blockinputClass}
        />
      </form>
      <p className={classes.Content__quantityProduct}>
        {order.allCount} {RenderPhrase(order.allCount)}
      </p>
      <div className={classes.Content__resultOrder}>
        <p className={classes.Content__total}>Итого: </p>
        <p className={classes.Content__price}>
          {" "}
          {order.price.toLocaleString("ru-RU")}{" "}
        </p>
        <p className={classes.Content__currency}> ₽ </p>
      </div>
      <div className={classes.Content__arrangeOrder}>
        <button
          type="submit"
          onClick={HandleAddOrder}
          className={classes.button_arrangeOrder}
          disabled={!isValid}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default MakingOrder;
