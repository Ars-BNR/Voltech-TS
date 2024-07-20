import { FC } from "react";
import classes from "./CardList.module.css";
import { Link } from "react-router-dom";
import { Product } from "../../../../types/type";
interface CardListProps {
  products: Product[];
  HandleAddBasket: (id: number) => void;
}
const CardList: FC<CardListProps> = ({ products, HandleAddBasket }) => {
  return (
    products && (
      <div className={classes.cardList}>
        {products.map((product, index) => (
          <div key={index} className={classes.card}>
            <Link to={`/personalPageEquipment/${product.id}`}>
              <div key={index} className={classes.card__picture}>
                <img
                  src={"http://localhost:9375/api/img/" + product.pathimg}
                  alt=""
                  className={classes.card__img}
                />
              </div>
              <p
                className={classes.card__title}
              >{`${product.main_info["Бренд"]} ${product.main_info["Модель"]}`}</p>
            </Link>
            <p className={classes.card__price}>
              {product.price.toLocaleString("ru-RU")}{" "}
              <span className={classes.rub}>₽</span>
            </p>
            <button
              onClick={() => HandleAddBasket(product.id)}
              className={classes.card__btn}
            >
              Добавить
            </button>
          </div>
        ))}
      </div>
    )
  );
};

export default CardList;
