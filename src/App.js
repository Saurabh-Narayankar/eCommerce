import { Routes, Route} from 'react-router-dom'
import Homepage from "./routes/homepage/homepage.component";
import Navbar from './routes/navigation/navigation.component';
import Auth from './routes/auth/auth.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';



function App() {
  
  return (
    <div className="Main-Container">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Auth />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
    
  )
}

export default App;

