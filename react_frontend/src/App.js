import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import MarketComponent from './components/MarketComponent';
import LoginComponent from './components/LoginComponent';
import CreateAccountComponent from './components/CreateAccountComponent';
import MyCarsComponent from './components/MyCarsComponent';
import SellCarComponent from './components/SellCarComponent';
import UpdateCarComponent from './components/UpdateCarComponent';
import './App.css';
import FooterComponent from './components/FooterComponent';
import AllUsersComponent from './components/AllUsersComponent';
import HomeComponent from './components/HomeComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent/>
        <Routes>
          <Route path='/login' element={<LoginComponent/>} />
          <Route path='/home' element={<HomeComponent />} />
          <Route path='/market' element={<MarketComponent/>} />
          <Route path='/my-cars' element={<MyCarsComponent/>} />
          <Route path='/create-user' element={<CreateAccountComponent/>} />
          <Route path='/sell-car' element={<SellCarComponent/>} />
          <Route path='/update-car' element={<UpdateCarComponent/>} />
          <Route path='/all-users' element={<AllUsersComponent/>} />
          <Route path='*' element={<Navigate replace to="/home" />} />
        </Routes>
      <FooterComponent/>
    </BrowserRouter>

  );
}

export default App;
