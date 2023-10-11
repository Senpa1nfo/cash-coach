import {useContext, useEffect} from 'react';
import {Context} from "./main.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import HistoryPage from "./pages/HistoryPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import CalculatorsPage from "./pages/CalculatorsPage.tsx";
import StatisticsPage from "./pages/StatisticsPage.tsx";
import MainPage from "./pages/MainPage.tsx";

const App = observer(() => {

    const {authStore} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            authStore.checkAuth();
        }
    }, [authStore]);

    return (
        <>
            <Routes>
                {authStore.isAuth ? (
                    <>
                        <Route path='/history' element={<HistoryPage/>}/>
                        <Route path='/statistics' element={<StatisticsPage/>}/>
                        <Route path='/calculator' element={<CalculatorsPage/>}/>
                        <Route path='/' element={<Navigate to='/history'/>}/>
                    </>
                ) : (
                    <>
                        <Route path='/signin' element={<SignInPage/>}/>
                        <Route path='/signup' element={<SignUpPage/>}/>
                        <Route path='/' element={<MainPage/>}/>
                    </>
                )}
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        </>
    );
})

export default App;