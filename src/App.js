import Homepage from "./Views/Home/Home";
import Detailpage from "./Views/Detail/Detail";
import WishList from "./Views/WishList/WishList";
import {Route, Routes} from 'react-router-dom'
import Cart from "./Views/Payment/Cart";
import Login from "./Views/Authentication/Login/Login";
import Profile from "./Views/Profile/Profile";
import ProtectionLogin from "./Components/ProtectionRoutes/ProtectionLogin";
import Protection from "./Components/ProtectionRoutes/ProtectionRoutes";
import Bottomnavbar from "./Components/Bottomnavbar"
import WhyRigthMarket from "./Components/SideBarItems/why";
import AboutRigthMarket from "./Components/SideBarItems/about";
import Terms from "./Components/SideBarItems/Terms";

function App() {
  return (
 <div>
  <Bottomnavbar/>
<Routes>
  <Route path="/" element={<Homepage/>} />
  <Route path="/Detail/:title" element={<Detailpage/>}/>
  <Route path="/Favorites" element={<WishList/>} />
  <Route path="/WhyRigthMarket" element={<WhyRigthMarket/>} />
  <Route path="/AboutRigthMarket" element={<AboutRigthMarket/>} />
  <Route path="/Terms" element={<Terms/>} />

  <Route element={<Protection redirectPath="/Login" />}>
  <Route path="/Cart" element={<Cart/>} />
  <Route path="/Profile" element={<Profile/>} />
 </Route>

  <Route element={<ProtectionLogin redirectPath={'/'} />}>
          <Route path="/Login" element={<Login />} />
        </Route>

  
  
</Routes>
 </div>
  );
}

export default App;
