import s from "./index.module.css";
import cn from "classnames";
import { ReactComponent as Save } from "../Card/save.svg";
import truck from "../../assets/images/truck.svg";
import quality from "../../assets/images/quality.svg";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import {
  calcDiscountPrice,
  isLiked,
  calcPriceFor100,
} from "../../utils";


export const Product = ({
  onProductLike,
  pictures,
  likes = [],
  reviews,
  tags,
  name,
  price,
  discount,
  description,
  wight,
  _id,
}) => {

  const { user } = useContext(UserContext);
  const discount_price = calcDiscountPrice(price, discount);
  const priceFor100 = calcPriceFor100(discount_price, wight);
  const liked = isLiked(likes, user._id);

  return (
    <>
      <div>
        <h1 className={s.title}>{name}</h1>
      </div>

      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img src={pictures} alt={`Изображение ${name}`} />
        </div>
        <div className={s.desc}>
          <span className={discount ? s.oldPrice : s.price}>
            {price}&nbsp;₽
          </span>
          {discount !== 0 && (
            <span className={cn(s.price, "card__price_type_discount")}>
              {discount_price}&nbsp;₽
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
            <a href="/#" className={cn("btn", "btn_type_primary", s.cart)}>
              В корзину
            </a>
          </div>
          <button
            className={cn("card__favorite", {
              "card__favorite_is-active": liked,
            })}
            onClick={onProductLike}
          >
            <Save className="card__favorite-icon" />
            <span>{liked ? "В избранном" : "В избранное"}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <p className={s.subtitle} /*dangerouslySetInnerHTML={desctiptionHTML}*/>
          {description}
        </p>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>{wight}</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>{priceFor100} ₽ за 100 грамм</div>
        </div>
      </div>
    </>
  );
};
