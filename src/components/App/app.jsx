import { useState, useEffect } from 'react';
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import Sort from '../Sort/sort';
import './index.css';
import api from '../../Api'
import useDebounce from '../../hooks/useDebounce';
// import data from '../../assets/data.json';
import SeachInfo from '../SeachInfo';
import Spinner from '../Spinner'
// import Button from '../Button/button';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const debounceValue = useDebounce(searchQuery, 500);
  const [isLoading, setIsloading] = useState(false)

  const handleRequest = async () => {
    console.log(debounceValue);
      try{
        const filterCards = await api.search(debounceValue);
        setCards(filterCards);
        setIsloading(true)
      } catch(error) {
        console.log(error)
      }
      
    // }
    }

  useEffect(()=>{
    handleRequest()
    console.log("INPUT", debounceValue);
  },[debounceValue])

  useEffect(() => {
    setIsloading(false)
      Promise.all([api.getProductList(), api.getUserInfo()])
         .then(([productData, userData]) => {
          console.log(userData);
           setCurrentUser(userData);
           setCards(productData.products);
           
         });
         setIsloading(true)
     }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  }
  function handleUpdateUser(userUpdate) {
		api.setUserInfo(userUpdate).then((newUserData) => {
			setCurrentUser(newUserData);
		  });
	}
  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  }

  function handleProductLike(product) {
		const isLiked = product.likes.some(id => id === currentUser._id) //ищем в массиве лайков id текущего пользователя;
		api.changeLikeProductStatus(product._id, !isLiked).then((newCard) => { // в зависимсоти от того есть лайки или нет отправляем запрос PUT или DELETE
			const newCards = cards.map((c) => {console.log('Карточка в переборе', c); console.log('Карточка в c сервера', newCard); return c._id === newCard._id ? newCard : c});
			setCards(newCards);
		});
	}
  
  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
        </>
      </Header>
      <main className='content container'>
      
      <SeachInfo searchCount={cards.length} searchText={debounceValue}/>
       <Sort/>
        <div className='content__cards'>
        {(cards && cards.length > 0) ?
        <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/> : <Spinner/>

      }
         
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App;
