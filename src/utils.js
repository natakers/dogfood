export const isLiked = (likes, userId) => likes.some(id => id === userId);

export const calcDiscountPrice = (price, discount) => {
    return Math.round(price - price * discount / 100);
 }
 
export const createMarkup = (textToHtml) => {
    return {__html: textToHtml}
} 

export const calcPriceFor100 = (price, wight) => {
    return Math.round(price /  parseInt(wight) * 100);
 }

 export const tabs = [
	{
	  id: "cheap",
	  title: "Сначала дешёвые",
	},
	{
	  id: "low",
	  title: "Сначала дорогие",
	},
	{
	  id: "sale",
	  title: "По скидке",
	},
  ];