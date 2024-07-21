import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import classes from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import TextField from "../../ui/Form/TextField";
import { observer } from "mobx-react-lite";
import { Context } from "../../../main";
import { Errors } from "../../../types/type";
import * as yup from "yup";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    login: "",
    password: "",
  });
  const { store } = useContext(Context);
  const [errors, setErrors] = useState({} as Errors);

  const validateScheme = yup.object().shape({
    password: yup.string().required("Пароль обязателен для заполнения"),
    login: yup.string().required("Логин обязателен для заполнения"),
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
  }, [data]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await store.login(data.login, data.password, navigate);
    } catch (error: any) {
      console.log(error);
    }
  };
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
  return (
    <div className={classes.loginPage}>
      <form onSubmit={handleSubmit} className={classes.loginBlock}>
        <p className={classes.loginBlock__title}>Вход</p>
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
        <button type="submit" className={classes.loginBlock__btnBlack}>
          Войти
        </button>
        <button className={classes.loginBlock__btnWhite}>
          <Link to="/registration">Зарегистрироваться</Link>
        </button>
      </form>
    </div>
  );
};

export default observer(LoginPage);
