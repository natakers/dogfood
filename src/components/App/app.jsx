import { useState, useEffect } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Logo from "../Logo/logo";
import Search from "../Search/search";
import "./index.css";
import api from "../../Api";
import useDebounce from "../../hooks/useDebounce";
import SeachInfo from "../SeachInfo";
import { Route, Routes } from "react-router-dom";
import { ProductPage } from "../../pages/ProductPage/product-page";
import { NotFoundPage } from "../../pages/NotFoundPage/not-found-page";
import { UserContext } from "../../context/userContext";
import { ModalContext } from "../../context/modalContext";
import { CatalogPage } from "../../pages/CatalogPage/catalog-page";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [currentSort, setCurrentSort] = useState("");
  const debounceValue = useDebounce(searchQuery, 500);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(false)

  const handleRequest = async () => {
    try {
      const filterCards = await api.search(debounceValue);
      setCards(filterCards);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (api._token ) {
      handleRequest();
      console.log("INPUT", debounceValue);
    }
  }, [debounceValue]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      api._token = localStorage.getItem("token")
      Promise.all([api.getProductList(), api.getUserInfo()]).then(
        ([productData, userData]) => {
          setCurrentUser(userData);
          setCards(productData.products);
          setIsLoading(false);
        }
      ).catch((error) => alert(error));
    }
  }, [localStorage.getItem("token")]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };
  async function handleUpdateUser(userUpdate) {
    try {
      await api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  } catch(error) {
    alert(error)
  }
  }
  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };

  const handleProductLike = async (product) => {
    const isLiked = product.likes.some((id) => id === currentUser._id); //ищем в массиве лайков id текущего пользователя;
    try { 
      const newCard = await api.changeLikeProductStatus(product._id, !isLiked);
      const newCards = cards.map((c) => {
        return c._id === newCard._id ? newCard : c;
      });
      setCards(newCards);
      return newCard;
    } catch(error) {
      alert(error)
    }
    
  };
  const onChangeSort = (id) => {
    setCurrentSort(id);
  };

  return (
    <>
      <UserContext.Provider value={{ user: currentUser, isLoading }}>
        <ModalContext.Provider value={{active, setActive}} >
        <Header user={currentUser} onUpdateUser={handleUpdateUser}>
          <>
            <Logo className="logo logo_place_header" href="/" />
            <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
          </>
        </Header>
        <main className="content container">
          <SeachInfo searchCount={cards.length} searchText={debounceValue} />
          <Routes>
            <Route
              index
              element={
                api._token && <CatalogPage
                  cards={cards}
                  currentSort={currentSort}
                  onChangeSort={onChangeSort}
                  handleProductLike={handleProductLike}
                /> 
              }
            />
            <Route
              path="/product/:productId"
              element={
                api._token && <ProductPage
                  isLoading={isLoading}
                  handleLike={handleProductLike}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        </ModalContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
