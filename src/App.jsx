import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Detail from './Pages/Products/Detail';
import Profile from './Pages/Profile/Profile';
import ShippingAddress from './Pages/Profile/ShippingAddress';
import Settings from './Pages/Profile/Settings';
import Checkout from './Pages/Transactions/Checkout';
import Verify from './Pages/Auth/Verify';
import MyProduct from './Pages/Profile/MyProduct';
import MyOrder from './Pages/Profile/MyOrder';
import Order from './Pages/Transactions/Order';
import Search from './Pages/Products/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/:search' element={<Search />} />
          <Route path='/auth-login' element={<Login />} />
          <Route path='/auth-register' element={<Register />} />
          <Route path='/auth-verification-otp/:email' element={<Verify />} />
          <Route path='/product-detail/:id' element={<Detail />} />
          <Route path='/profile/:email' element={<Profile />} />
          <Route path='/my-bag/:email' element={<Order />} />
          <Route path='/checkout/:id' element={<Checkout />} />
          <Route path='/my-order/:email' element={<MyOrder />} />
          <Route path='/my-product/:email' element={<MyProduct />} />
          <Route path='/shipping-address/:email' element={<ShippingAddress />} />
          <Route path='/settings/:email' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
