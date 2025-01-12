import { Provider } from 'react-redux';
import { store } from './redux/store';
import VendingMachine from './components/vending-machine';
import './styles/index.scss';

function App() {
  return (
    <Provider store={store}>
      <VendingMachine />
    </Provider>
  );
}

export default App;
