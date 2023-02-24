import cn from "classnames";
import "./index.css";

const Sort = ({tabs = [], onChangeSort, currentSort}) => {
	// const [currentSort, setCurrentSort] = useState()
	const handleClick = (e, tab) => {
		e.preventDefault(); 
		onChangeSort(tab.id)
	}
	
	return (
		<div className="sort content__sort">
			{tabs.map(tab => (
				<div 
					key={tab.id}
					id={tab.id}
				>
					<button className={cn("sort__link", { 
						"sort__link_selected": currentSort === tab.id 
					})} onClick={(e) => handleClick(e, tab)}>
						{tab.title}
					</button>
				</div>
			))}

		</div>
	);
};

export default Sort;