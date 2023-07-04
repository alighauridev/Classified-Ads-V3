// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider, useSelector, useDispatch } from "react-redux";
// import Register from "./Pages/Register";
// import Login from "./Pages/Login";
// import MyAccount from "./Pages/MyAccount";
// import CreateAd from "./Pages/CreateAd";
// import ProductDetails from "./Pages/ProductDetails";
// import Admin from "./Pages/Admin";
// import Homescreen from "./Pages/Homepage/Homescreen";
// import Dashboard from "./Pages/Dashboard";
// import Pakage from "./Components/Pakage/Pakage";
// import { useNavigate, useParams } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ContextProvider } from "./Context/Context";
// import Secondpage from "./Components/Secondpage";

// function Main() {
//   const [authenticated, setAuthenticated] = useState(
//     localStorage.getItem("@accessToken")
//   );
//   const [role, setRole] = useState(false);

//   useEffect(() => {
//     setAuthenticated(localStorage.getItem("@accessToken"));
//     const userRole = localStorage.getItem("@role") === "true";
//     setRole(userRole);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {authenticated !== "" && !role ? (
//           <>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/MyAccount" element={<MyAccount />} />
//             <Route path="/CreateAd" element={<CreateAd />} />
//             <Route path="/About" element={<Homescreen />} />
//             <Route path="/secondpage" element={<Secondpage />} />
//             <Route path="/ProductDetails/:id" element={<ProductDetails />} />
//           </>
//         ) : authenticated !== "" && role ? (
//           <Route path="/" element={<Admin />} />
//         ) : (
//           <>
//             <Route
//               path="/Login"
//               element={
//                 <Login authenticated={setAuthenticated} role={setRole} />
//               }
//             />
//             <Route path="/Register" element={<Register />} />
//             <Route path="/pakage" element={<Pakage />} />
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/About" element={<Homescreen />} />
//             <Route path="/ProductDetails/:id" element={<ProductDetails />} />
//             <Route path="*" element={<>not found</>} />
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// }

// function App() {
//   return (

//     <ContextProvider>
//       <Main />
//       <ToastContainer />
//     </ContextProvider>
//   );
// }

// export default App;
import React from 'react'
import MyAccount from './Pages/CreateAd'
import { BrowserRouter } from 'react-router-dom'
const App = () => {
  return (
<<<<<<< HEAD
 <BrowserRouter>
 <MyAccount/>
 </BrowserRouter>
  )
}

export default App
=======
    <Router>
      <Routes>
        {authenticated !== "" && !role ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/MyAccount" element={<MyAccount />} />
            <Route path="/CreateAd" element={<CreateAd />} />
            <Route path="/About" element={<Homescreen />} />
            <Route path="/secondpage" element={<Secondpage />} />
            <Route path="/ProductDetails/:id" element={<ProductDetails />} />
          </>
        ) : authenticated !== "" && role ? (
          <Route path="/" element={<Admin />} />
        ) : (
          <>
            <Route
              path="/Login"
              element={
                <Login aunthenticated={setAuthenticated} role={setRole} />
              }
            />
            <Route path="/Register" element={<Register />} />
            <Route path="/pakage" element={<Pakage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/About" element={<Homescreen />} />
            <Route path="/ProductDetails/:id" element={<ProductDetails />} />
            <Route path="*" element={<>not found</>} />
          </>
        )}
      </Routes>
    </Router>
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
>>>>>>> 02726210f07788d1e1a5fd2127aa03eb66bc3767
