import { Home } from "./Component/Home/Home";
import { Login } from "./Component/Login/Login";
import { Navbar } from "./Component/Navbar/Navbar";
import { BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Login/>}  />
      <Route path="/home" element={<Home/>}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
