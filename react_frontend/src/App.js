import { BrowserRouter, Route, Routes} from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import CreateAccountComponent from './components/CreateAccountComponent';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent/>

        <Routes>
          <Route path='/login' element={<LoginComponent/>} />
          <Route path='/home' element={<HomeComponent/>} />
          <Route path='/create-user' element={<CreateAccountComponent/>} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;
