import { Routes, Route } from "react-router-dom";
import Form from "./Form";
import Menu from "./Menu";  
import Admin from "./Admin";
import Cart from "./Cart";

function AppRoutes() {
  return (
    <>
    <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/home" element={<Form/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/cart" element={<Cart/>} />
    </Routes>
    </>
  );
}
export default AppRoutes;