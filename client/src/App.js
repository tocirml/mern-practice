// import ''
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
