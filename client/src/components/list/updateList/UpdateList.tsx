import edit from '../../../icons/edit.svg';
import deleteIcon from '../../../icons/delete.svg';
import { useContext, useEffect, useState } from "react";
import {Context} from "../../../main.tsx";
import { ListItem } from "../../../models/ListItem.ts";
  
interface UpdateListProps {
	searchQuery: string;
	sortColumn: string;
	sortDirection: string;
	getItemId: any;
	getBool: any;
	changeBoolean: any;
}

const UpdateList = ({ searchQuery, sortColumn, sortDirection, getItemId, getBool, changeBoolean}: UpdateListProps) => {
	const [items, setItems] = useState<Array<ListItem>>([]);
	const { store } = useContext(Context);
	const [bool, setBool] = useState(false);

	const getId = (id: any) => {
		getItemId(id);
	}

	const changeBool = () => {
	  setBool(bool => !bool);
	};
	
	useEffect(() => {
	  async function fetchData() {
		const res = await store.generate_list();
		setItems(res);
	  }
	  fetchData();
	}, [bool, getBool, changeBoolean, store]);

	// console.log(1);
	
	const filteredItems = items.filter((item) =>
	  item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
	  item.value.includes(searchQuery) ||
	  item.date.includes(searchQuery)
	);
	
	const sortedItems = sortColumn && sortDirection
	? filteredItems.sort((a:any, b:any) => {
		let aValue = a.bool ? a.value : -a.value;
		let bValue = b.bool ? b.value : -b.value;

		if (sortColumn === "amount") {
			return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
		} else if (sortColumn === "date") {
			return sortDirection === "asc"
			? new Date(a.timeAdded).getTime() - new Date(b.timeAdded).getTime()
			: new Date(b.timeAdded).getTime() - new Date(a.timeAdded).getTime();
		} else {
			return 0;
		}
		})
	: filteredItems;


	// Копіювання по кліку
	const [tooltipText, setTooltipText] = useState('Клацніть, щоб скопіювати');

	const handleCopyAmount = (event: React.MouseEvent<HTMLTableCellElement>) => {
		const cell = event.target as HTMLElement;
		const amount = cell.textContent;
	
		if (amount) {
			navigator.clipboard.writeText(amount);
			setTooltipText('Текст успішно скопійовано');
			setTimeout(() => {
				setTooltipText('Клацніть, щоб скопіювати');
		}, 2000);
		}
	}

	return (
		<tbody>
		  {sortedItems.map((element) => (
			<tr key={String(element._id)}>
				<td><button onClick={() => {document.querySelector('.edit-form')?.classList.remove('none'); getId(String(element._id))}} className="edit"><img src={edit} alt="" /></button></td>
				<td>{element.description}</td>
				<td
						style={{color: element.bool ? '#27AE60' : '#FC4C4F'}}
						data-tooltip={tooltipText}
						onClick={handleCopyAmount}
					>{element.value}</td>
				<td>{element.date}</td>
				<td>
					<button onClick={() => {
							store.delete(String(element._id));
							setTimeout(changeBool, 100);
						}} 
							className="delete"><img src={deleteIcon} alt="Delete icon" />
					</button>
				</td>
			</tr>
		  ))}
		</tbody>
	)
}

export default UpdateList;