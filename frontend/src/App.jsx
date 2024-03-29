import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import {Routes, Route} from "react-router-dom";
import "./App.css"
import EmployeesDetails from "./components/EmployeesDetails";
import LoginActivity from "./components/LoginActivity";


export default function App() {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<SignIn />}/>
        <Route path="/log-activity" element={<LoginActivity />}/>
        <Route path="/emp-details" element={<EmployeesDetails />}/>
    </Routes>
    </>
  )
}