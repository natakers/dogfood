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
import { CatalogPage } from "../../pages/CatalogPage/catalog-page";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [currentSort, setCurrentSort] = useState("");
  const debounceValue = useDebounce(searchQuery, 500);
  const [isLoading, setIsLoading] = useState(true);

  const handleRequest = async () => {
    try {
      const filterCards = await api.search(debounceValue);
      setCards(filterCards);
      setIsLoading(false);
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
        setIsLoading(false);
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

  const handleProductLike = async (product) => {
    const isLiked = product.likes.some((id) => id === currentUser._id); //ищем в массиве лайков id текущего пользователя;
    const newCard = await api.changeLikeProductStatus(product._id, !isLiked);
    const newCards = cards.map((c) => {
      return c._id === newCard._id ? newCard : c;
    });
    setCards(newCards);
    return newCard;
  };
  const onChangeSort = (id) => {
    setCurrentSort(id);
  };

  return (
    <>
      <UserContext.Provider value={{ user: currentUser, isLoading }}>
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
                <CatalogPage
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
                <ProductPage
                  isLoading={isLoading}
                  handleLike={handleProductLike}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
