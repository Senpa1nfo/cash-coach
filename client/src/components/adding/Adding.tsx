import './Adding.sass';
import { useContext, useState } from 'react';
import {Context} from "../../main.tsx";

const Adding = ({getChangeBool}: any) => {

    const [bool, setBool] = useState(false);

    const changeBool = () => {
        setBool(bool => !bool);
    };

    getChangeBool(bool);

    const [description, setDescription] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const {store} = useContext(Context);

    return (
        <div className="adding">
            <form action="" className="adding__form">
                <input 
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    type="text" 
                    className="adding__input" 
                    placeholder="Прибуток / Витрата" 
                />
                <input 
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    type="number" 
                    className="adding__input" 
                    placeholder="Введіть суму" 
                />
                <div className="adding__buttons">
                    <button className="adding__btn adding__btn_1" 
                        onMouseEnter={() => {
                            document.querySelector('.adding__btn_1')?.classList.add('adding__btn_z-index');
                            document.querySelector('.adding__btn_2')?.classList.remove('adding__btn_z-index');                            
                        }}
                        onClick={(event) => {
                            event.preventDefault(); 
                            store.add(description, value, true); 
                            document.querySelectorAll('input').forEach(element => {
                                element.value = '';
                            });
                            setTimeout(changeBool, 100);
                        }}>
                        Прибуток
                    </button>
                    <button className="adding__btn adding__btn_2" 
                        onMouseEnter={() => {
                            document.querySelector('.adding__btn_1')?.classList.remove('adding__btn_z-index');
                            document.querySelector('.adding__btn_2')?.classList.add('adding__btn_z-index');
                        }}
                        onClick={(event) => {
                            event.preventDefault(); 
                            store.add(description, value, false); 
                            document.querySelectorAll('input').forEach(element => {
                                element.value = '';
                            });
                            setTimeout(changeBool, 100);
                        }}>
                        Витрата
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Adding;
