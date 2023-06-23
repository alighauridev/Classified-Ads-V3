import React, { useState, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, signIN } from "./redux/userSlice";
import Login from "./Pages/Login";
import "./main.css";
import MyAccount from "./Pages/MyAccount";
import CreateAd from "./Pages/CreateAd";
import { ContextProvider } from "./Context/Context";
import ProductDetails from "./Pages/ProductDetails";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Pages/Admin";
import Homescreen from "./Pages/Homepage/Homescreen";
import Dashboard from "./Pages/Dashboard";
import Pakage from "./Components/Pakage/Pakage";

function Main() {
  const LoginBool = false;
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem("@accessToken")
  );
  const [role, setRole] = useState(false);

  useEffect(() => {
    setauthenticated(localStorage.getItem("@accessToken"));
    let user =
      (localStorage.getItem("@role") == "true" ? true : false) || false;

    // setRole(user?.user?.admin);
    console.log("user" + user);
    setRole(user);
  }, [LoginBool]);

  return authenticated !== "" && !role ? (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/MyAccount" element={<MyAccount />} />
        <Route path="/CreateAd" element={<CreateAd />} />
        <Route path="/About" element={<Homescreen />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  ) : authenticated !== "" && role ? (
    <Router>
      <Routes>
        <Route path="/" element={<Admin />} />
      </Routes>
    </Router>
  ) : (
    authenticated == "" && (
      <>
        <Router>
          <Routes>
            <Route
              path="/Login"
              element={
                <Login authenticated={setauthenticated} role={setRole} />
              }
            />
            {/* <Route path="/login/success" element={<div>success</div>} /> */}

            <Route path="/Register" element={<Register />} />
            <Route path="/pakage" element={<Pakage/>}/>
            <Route path="/" element={<Dashboard />} />
            <Route path="/About" element={<Homescreen />} />
            <Route path="/ProductDetails/:id" element={<ProductDetails />} />

            <Route path="*" element={<>not found</>} />
          </Routes>
        </Router>
      </>
    )
  );
}

function App() {
  return (
    <ContextProvider>
      <Main />
      <ToastContainer />
    </ContextProvider>
  );
}

export default App;
