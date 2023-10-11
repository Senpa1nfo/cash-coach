import './List.sass';
import search from '../../icons/search.svg';
import { useState } from 'react';
import UpdateList from './updateList/UpdateList.tsx';
import EditForm from './editForm/EditForm.tsx';

const List = ({changeBool}: any) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [sortColumn, setSortColumn] = useState('');
	const [sortDirection, setSortDirection] = useState('');
  
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  setSearchQuery(event.target.value);
	};
  
	const handleSortByAmount = () => {
	  if (sortColumn === 'amount' && sortDirection === 'asc') {
		setSortDirection('desc');
	  } else {
		setSortColumn('amount');
		setSortDirection('asc');
	  }
	};
  
	const handleSortByDate = () => {
	  if (sortColumn === 'date' && sortDirection === 'asc') {
		setSortDirection('desc');
	  } else {
		setSortColumn('date');
		setSortDirection('asc');
	  }
	};

	const [itemId, setItemId] = useState();

	const getId = (id: any) => {
		setItemId(id);
	}

	const [changeBoolean, setChangeBoolean] = useState<boolean>();

	const getBool = (bool: boolean) => {
		setChangeBoolean(bool);
	}
  
	return (
		<div className='list'>
			<EditForm itemId={itemId} getChangeBool={getBool}></EditForm>
			<div className='search-panel'>
				<div className="search-panel__search">
					<input type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Пошук...' />
					<img src={search} alt="magnifier" className="search-panel__search__icon"/>
				</div>
				<div className="search-panel__sort">
					<button onClick={handleSortByAmount} 
						className={`search-panel__filter ${sortColumn === 'amount' && `search-panel__filter--active ${sortDirection === 'asc' ? 'search-panel__filter--asc' : 'search-panel__filter--desc'}`}`}>
							сума<span id="sortIcon">{sortColumn === "amount" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</span></button>
					<button onClick={handleSortByDate}
						className={`search-panel__filter ${sortColumn === 'date' && `search-panel__filter--active ${sortDirection === 'asc' ? 'search-panel__filter--asc' : 'search-panel__filter--desc'}`}`}>
							дата<span id="sortIcon">{sortColumn === "date" ? (sortDirection === "asc" ? "↑" : "↓") : ""}</span></button>
				</div>
			</div>  
			<div className='table'>
				<table className='list__table'>
					<UpdateList searchQuery={searchQuery} sortColumn={sortColumn} sortDirection={sortDirection} getItemId={getId} getBool={changeBoolean} changeBoolean={changeBool}/>
				</table>
			</div>
		</div>
)}
  

export default List;
