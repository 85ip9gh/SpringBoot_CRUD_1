import { BrowserRouter, Route, Routes} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import CreateAccountComponent from './components/CreateAccountComponent';
import MyCarsComponent from './components/MyCarsComponent';
import SellCarComponent from './components/SellCarComponent';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent/>

        <Routes>
          <Route path='/login' element={<LoginComponent/>} />
          <Route path='/home' element={<HomeComponent/>} />
          <Route path='/my-cars' element={<MyCarsComponent/>} />
          <Route path='/create-user' element={<CreateAccountComponent/>} />
          <Route path='/sell-car' element={<SellCarComponent/>} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;
