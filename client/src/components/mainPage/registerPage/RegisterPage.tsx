import React, {
  FC,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import TextField from "../../ui/Form/TextField";
import { Data, Errors } from "../../../types/type";

const RegisterPage: FC = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [data, setData] = useState({
    login: "",
    password: "",
    confirmPassword: "",
  } as Data);

  const withOutCallback = useRef(0);

  const withCallback = useRef(0);

  const [errors, setErrors] = useState({} as Errors);

  //   const handleChange = useCallback(
  //     (target: React.ChangeEvent<HTMLInputElement>) => {
  //       setData((prevState) => ({
  //         ...prevState,
  //         [target.name]: target.value,
  //       }));
  //     },
  //     []
  //   );
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  //   const validateWithOutCallback = (data) => {
  //     // console.log('datavalidateWithOutCallback', data);
  //   };
  //   const validateWithCallback = useCallback((data) => {
  //     // console.log('datavalidateWithCallback', data);
  //   }, []);
  //   useEffect(() => {
  //     validateWithOutCallback(data);
  //     validateWithCallback(data);
  //   }, [data]);
  //   useEffect(() => {
  //     withOutCallback.current++;
  //   }, [validateWithOutCallback]);
  //   useEffect(() => {
  //     withCallback.current++;
  //   }, [validateWithCallback]);

  const validateScheme = yup.object().shape({
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Пароли должны совпадать"),
    password: yup
      .string()
      .required("Пароль обязателен для заполнения")
      .matches(
        /(?=.*[A-Z])/,
        "Пароль должен содержать хотя бы одну букву Латиницы"
      )
      .matches(/(?=.[0-9])/, "Пароль должен содержать хотя бы одно число")
      .matches(/(?=.{8,})/, "Пароль должен быть минимум из 8 символов"),

    login: yup
      .string()
      .required("Логин обязателен для заполнения")
      .min(3, "Логин должен содержать минимум 3 символа")
      .max(15, "Логин должен содержать не более 15 символов")
      .matches(
        /^[a-zA-Z0-9а-яА-Я]*$/,
        "Логин может содержать только буквы латиницы, буквы кириллицы и цифры"
      )
      .matches(
        /^[^!"№;%:?*]*$/,
        'Логин не может содержать специальные символы: !"№;%:?*'
      ),
  });

  const validate = useCallback(async () => {
    try {
      await validateScheme.validate(data);
      setErrors({});
      return true;
    } catch (err: any) {
      setErrors({ [err.path]: err.message });
      return false;
    }
  }, [data]);

  useEffect(() => {
    validate();
    // console.log(Object.keys(errors).length, "lenth errors");
    // console.log(Object.keys(errors).length == 0, "Equal");
    // console.log(errors);
  }, [data]);

  const isValid = Object.keys(errors).length == 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = validate();

    if (!isValid) return;
    try {
      await store.registration(data.login, data.password);
      navigate("/");
    } catch (error: any) {
      // console.log(error);
      if (
        error.response &&
        error.response.data.message.includes("Пользователь с логином ")
      ) {
        toast.error(error.response.data.message);
        setErrors({ login: error.response.data.message });
      } else {
        // console.error("Error adding key to database:", error);
        toast.error("Произошла ошибка при регистрации");
      }
    }
  };
  return (
    <div className={classes.registerPage}>
      <form onSubmit={handleSubmit} className={classes.registerBlock}>
        <p className={classes.registerBlock__title}>Регистрация</p>
        <p>Render withOutCallback {withOutCallback.current}</p>
        <p>Render withCallback {withCallback.current}</p>
        <TextField
          type="text"
          name="login"
          value={data.login}
          onChange={handleChange}
          placeholder="Логин"
          error={errors.login}
        />
        <TextField
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Пароль"
          error={errors.password}
        />
        <TextField
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          placeholder="Подтверждение пароля"
          error={errors.confirmPassword}
        />
        <button
          className={classes.registerBlock__btnBlack}
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <button className={classes.registerBlock__btnWhite}>
          <Link to="/login">Войти</Link>
        </button>
      </form>
    </div>
  );
};

export default observer(RegisterPage);
