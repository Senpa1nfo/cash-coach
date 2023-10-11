import {useContext, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import Header from './components/header/Header';
import Adding from './components/adding/Adding';
import Menu from './components/menu/Menu';
import WorkingArea from './components/workingArea/WorkingArea';
import {Context} from "./main.tsx";

const App = () => {

    const {store} = useContext(Context);
    const [changeBoolean, setChangeBoolean] = useState<boolean>();

    const getBool = (bool: boolean) => {
        setChangeBoolean(bool);
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [store]);

    if (!store.isAuth) {
        return (
            <Header/>
        )
    }

    return (
        <div>
            <Header></Header>
            <main>
                <Adding getChangeBool={getBool}></Adding>
                <div className="main-area-wrapper">
                    <Menu></Menu>
                    <WorkingArea getBool={changeBoolean}></WorkingArea>
                </div>
            </main>
        </div>
    );
}

export default observer(App);