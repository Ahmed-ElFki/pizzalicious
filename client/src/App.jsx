import React from "react";
import { Routes, Route } from "react-router";
import Welcome from "./Components/SignIn/Welcome";
import CreateAccount from "./Components/SignUp/CreateAccount";
import Home from "./Pages/Home";
import PizzaDetails from "./Components/PizzaDetails/PizzaDetails";
import Header from "./Components/Header/Header";
import SideBar from "./Components/SideBar/SideBar";
import Checkout from "./Components/SideBar/Checkout";
import FeedBack from "./Components/SideBar/FeedBack";

const App = () => {
  return (
    <>
      {localStorage.getItem("userId") && <Header />}
      {localStorage.getItem("userId") && <SideBar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/pizza/:id" element={<PizzaDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/feedback" element={<FeedBack />} />
      </Routes>
    </>
  );
};

export default App;
