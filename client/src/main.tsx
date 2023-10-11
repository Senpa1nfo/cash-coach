import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AuthStore from './stores/AuthStore';
import {BrowserRouter} from "react-router-dom";
import './styles/index.css';
import HistoryStore from "./stores/HistoryStore.ts";

interface State {
    authStore: AuthStore,
    historyStore: HistoryStore,
}

const authStore = new AuthStore()
const historyStore = new HistoryStore()

export const Context = createContext<State>({
    authStore,
    historyStore
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Context.Provider value={{
            authStore,
            historyStore
        }}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Context.Provider>
    </React.StrictMode>,
)
