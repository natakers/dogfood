import "./index.css";

const SeachInfo = ({searchText, searchCount}) => {
  console.log(searchText);
	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {searchCount} товаров
		</section>
	);
};

export default SeachInfo;
