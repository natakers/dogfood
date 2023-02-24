import Card from "../Card/card";
import "./index.css";

const CardList = ({ goods, onProductLike, currentUser, currentSort }) => {

  if (currentSort === 'cheap') {
    goods = goods.sort((item, item1) => item.price - item1.price)
  } 
  if (currentSort === 'low') {
    goods = goods.sort((item, item1) => item1.price - item.price)
  } 
  if (currentSort === 'sale') {
    goods = goods.sort((item, item1) => item1.discount - item.discount)
  } 

  
  return (
    <div className="cards">
      {goods &&
        goods.map((item, index) => (
          <Card
            key={index}
            product={item}
            {...item}
            onProductLike={onProductLike}
            currentUser={currentUser}
          />
        ))}
    </div>
  );
};

export default CardList;
