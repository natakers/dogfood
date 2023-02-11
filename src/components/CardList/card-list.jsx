import Card from '../Card/card';
import './index.css';

const CardList = ({goods}) => {
  // console.log(goods);
  // console.log(goods.products);
	return (
		
		<div className='cards'>
			{goods &&
				goods.map( (item, index) => <Card key={index} {...item} />)
			}
		</div>
	);
};

export default CardList;
