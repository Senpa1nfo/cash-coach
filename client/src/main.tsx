import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Store from './store/Store';
import './sass/bootstrap-reboot.rtl.min.css';
import './sass/index.sass';

interface State {
    store: Store,
}

const store = new Store();

export const Context = createContext<State>({
    store,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Context.Provider value={{
            store,
        }}>
            <App/>
        </Context.Provider>
    </React.StrictMode>,
)
