import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner/Spinner"
import { tabs } from "../../utils";

export const CatalogPage = ({cards, currentSort, onChangeSort, handleProductLike }) => {
  const { user} = useContext(UserContext);
    return (
      <>
      <Sort
        currentSort={currentSort}
        onChangeSort={onChangeSort}
        tabs={tabs}
      />
      <div className="content__cards">
        {cards && cards.length > 0 ? (
          <CardList
            goods={cards}
            onProductLike={handleProductLike}
            currentUser={user}
            currentSort={currentSort}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </>
    )
}