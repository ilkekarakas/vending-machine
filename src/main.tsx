import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import VendingMachine from './components/vending-machine'
import './assets/styles/index.scss';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <VendingMachine />
    </Provider>
  </React.StrictMode>
)
