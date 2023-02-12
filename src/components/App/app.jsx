import { useState, useEffect } from "react";
import CardList from "../CardList/card-list";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Logo from "../Logo/logo";
import Search from "../Search/search";
import Sort from "../Sort/sort";
import "./index.css";
import api from "../../Api";
import useDebounce from "../../hooks/useDebounce";
import SeachInfo from "../SeachInfo";
import Spinner from "../Spinner";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const debounceValue = useDebounce(searchQuery, 500);

  const handleRequest = async () => {
    try {
      const filterCards = await api.search(debounceValue);
      setCards(filterCards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRequest();
    console.log("INPUT", debounceValue);
  }, [debounceValue]);

  useEffect(() => {
    Promise.all([api.getProductList(), api.getUserInfo()]).then(
      ([productData, userData]) => {
        setCurrentUser(userData);
        setCards(productData.products);
      }
    );
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };
  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  }
  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  function handleProductLike(product) {
    const isLiked = product.likes.some((id) => id === currentUser._id); //ищем в массиве лайков id текущего пользователя;
    api.changeLikeProductStatus(product._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => {
        return c._id === newCard._id ? newCard : c;
      });
      setCards(newCards);
    });
  }

  return (
    <>
      <Header user={currentUser} onUpdateUser={handleUpdateUser}>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
        </>
      </Header>
      <main className="content container">
        <SeachInfo searchCount={cards.length} searchText={debounceValue} />
        <Sort />
        <div className="content__cards">
          {cards && cards.length > 0 ? (
            <CardList
              goods={cards}
              onProductLike={handleProductLike}
              currentUser={currentUser}
            />
          ) : (
            <Spinner />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
