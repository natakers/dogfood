import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import s from "../../components/Button/index.module.css";
import { useParams } from "react-router-dom";
import { Product } from "../../components/Product/product";
import Spinner from "../../components/Spinner/Spinner";
import { useApi } from "../../hooks/useApi";
import api from "../../Api";

export const ProductPage = ({ handleLike }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const handleGetProduct = useCallback(
    () => api.getProductById(productId),
    [productId]
  );

  const {
    data: product,
    setData: setProduct,
    loading: isLoading,
    error: errorState,
  } = useApi(handleGetProduct);

  const handleProductLike = useCallback(() => {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    });
  }, [product, handleLike, setProduct]);

  return (
    <>
      <div className="content__cards">
        <div>
          <button className={s.btn_reg} onClick={() => navigate(-1)}>
            Назад
          </button>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          !errorState && (
            <Product
              {...product}
              setProduct={setProduct}
              onProductLike={handleProductLike}
            />
          )
        )}
      </div>
    </>
  );
};
