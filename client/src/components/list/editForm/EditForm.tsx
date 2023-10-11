import { useState, useContext} from 'react';
import {Context} from "../../../main.tsx";
import { observer } from 'mobx-react-lite';
import './EditForm.sass';

const EditForm = ({itemId, getChangeBool}: any) => {

    const [description, setDescription] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const {store} = useContext(Context);
    const [bool, setBool] = useState(false);

    const changeBool = () => {
        setBool(bool => !bool);
    };

    getChangeBool(bool);

    return (
        <div className="edit-form none">
            <div className="edit-form__header">
                <div className="edit-form__title">Редагування</div>
                <div className="edit-form__closeBtn" onClick={() => document.querySelector('.edit-form')?.classList.add('none')}>
                        <span className="edit-form__line edit-form__line-1"></span>
                        <span className="edit-form__line edit-form__line-2"></span>
                </div>
            </div>
            <div className='edit-form__content'>
                <form className="edit-form__form">
                    <input className='edit-form__input'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        type="text" 
                        placeholder='Новий опис'
                    />
                    <input className='edit-form__input'
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        type="number" 
                        placeholder='Нова сумма'
                    />
                    <div className="edit-form__buttons">
                        <button className="edit-form__btn edit-form__btn_1" 
                            onMouseEnter={() => {
                                document.querySelector('.edit-form__btn_1')?.classList.add('edit-form__btn_z-index');
                                document.querySelector('.edit-form__btn_2')?.classList.remove('edit-form__btn_z-index');                            
                            }}
                            onClick={(event) => {
                                event.preventDefault(); 
                                if (description !== '' && value !== '') {
                                    store.edit(itemId ,description, value, true); 
                                }                                
                                setTimeout(changeBool, 100);
                                document.querySelectorAll('input').forEach(element => {
                                    element.value = '';
                                });
                            }}>
                            Прибуток
                        </button>
                        <button className="edit-form__btn edit-form__btn_2" 
                            onMouseEnter={() => {
                                document.querySelector('.edit-form__btn_1')?.classList.remove('edit-form__btn_z-index');
                                document.querySelector('.edit-form__btn_2')?.classList.add('edit-form__btn_z-index');
                            }}
                            onClick={(event) => {
                                event.preventDefault(); 
                                if (description !== '' && value !== '') {
                                    store.edit(itemId ,description, value, false); 
                                }  
                                setTimeout(changeBool, 100);
                                document.querySelectorAll('input').forEach(element => {
                                    element.value = '';
                                });
                            }}>
                            Витрата
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default observer(EditForm);