import { useState, useEffect, useContext } from "react";
import classes from "./PersonalPageEquipment.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import catalogService from "../../../services/catalog-service";
import basketService from "../../../services/basket-service";
import { Context } from "../../../main";
import { Order } from "../../../types/type";

const PersonalPageEquipment = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const { id } = useParams();
  const [equipment, setEquipment] = useState<Order>();

  const fetchEquipment = async () => {
    const response = id && (await catalogService.getInfoEquipment(Number(id)));
    const personalData = response;
    setEquipment(personalData);
  };

  const HandleAddBasket = async (id_equipment: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info(
        "Чтобы добавить товар в корзину, вам необходимо зарегистрироваться."
      );
      navigate("/registration");
      return;
    }
    try {
      const idUsers = store?.profile?.id;
      await basketService.post({
        id_equipment: id_equipment,
        id_user: idUsers,
        count: 1,
      });
      toast.success("Товар добавлен в корзину");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEquipment();
  }, [id]);
  const renderInfo = (infoObject: object) => {
    return (
      <ul>
        {Object.entries(infoObject).map(([key, value]) => {
          if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            value !== null
          ) {
            return (
              <li className={classes.info_el_li} key={key}>
                <span>{key}:</span>
                {renderInfo(value)}
              </li>
            );
          } else {
            return (
              <li className={classes.info_el_li} key={key}>
                <span className={classes.short_info_el}>{key}: </span>
                <span className={classes.info_el_main}>{value}</span>
              </li>
            );
          }
        })}
      </ul>
    );
  };
  const BackToCatalog = () => {
    navigate(-1);
  };
  return (
    equipment && (
      <div className={classes.PersonalPageEquipment}>
        <p onClick={BackToCatalog} className={classes.BackToCatalog}>
          Вернуться в каталог
        </p>

        <div className={classes.EquipmnetBlock}>
          <div className={classes.EquipmentContent}>
            <div className={classes.EquipmentContent__equipmentImg}>
              <img
                className={classes.imgel}
                src={"http://localhost:9375/api/img/" + equipment.pathimg}
                alt=""
              />
            </div>
            <div className={classes.EquipmentContent___equipmentInformation}>
              <p className={classes.EquipmentContent__informationTitle}>
                {equipment.main_info["Бренд"]} {equipment.main_info["Модель"]}
              </p>
              <div className={classes.EquipmentContent__priceAndButton}>
                <p className={classes.price}>
                  {equipment.price.toLocaleString("ru-RU")}{" "}
                  <span className="rub">₽</span>
                </p>
                <button
                  className={classes.button_add}
                  onClick={() => HandleAddBasket(equipment.id)}
                >
                  Добавить
                </button>
              </div>
              <div className={classes.short_info}>
                <p className={classes.short_info_title}>
                  Краткие характеристики
                </p>
                {renderInfo(equipment.short_info)}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.contentWithDecription}>
          <div className={classes.descriptionBlock}>
            <p className={classes.descriptionBlock__title}>Описание</p>
            <p className={classes.descriptionBlock__text}>
              {equipment.description["description"]}
            </p>
          </div>
          <div className={classes.informationBlock}>
            <p className={classes.informationBlock__title}>Характеристики</p>
            {renderInfo(equipment.main_info)}
          </div>
        </div>
      </div>
    )
  );
};

export default PersonalPageEquipment;
