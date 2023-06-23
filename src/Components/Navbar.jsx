import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import '.././Components/Scss/Home/Navbar.scss'
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import Banner from "../Pages/Homepage/Banner";
export default function Navbar({ fixed }) {
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  //dropdown useState
  const [dropdown, setdropdown] = React.useState(false);
  const [user, setuser] = React.useState(
    localStorage.getItem("@userdetails") &&
    JSON.parse(localStorage.getItem("@userdetails"))
  );

  const handleLogout = () => {
    localStorage.setItem("@accessToken", "");
    localStorage.setItem("@refreshToken", "");
    localStorage.setItem("@userdetails", "");
    // window.location.reload();
    navigate("/");
    window.location.reload();
  };
  // console.log("navbar", );
  return (
  <>
    <div className="navbar-parent">
      <div className="logo-div">
        <img src={logo} alt="" />
      </div>
      <div className="seller-buy">
        <span>
          Sell faster
        </span>
        <span>
          Buy smarter
        </span>
      </div>
      <div>
        <ul >
          <li className="nav-item">
            <div className="relative">
              <div 
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 cursor-pointer user-button"
                onClick={() => setdropdown(!dropdown)}
              >
                <i className="fa fa-user text-[20px] leading-lg text-white opacity-75  "></i>
                <span className="ml-2 text-[16px] mobile:hidden ">
                  {user ? user?.user?.name : "Guest"}
                </span>
              </div>
              {/* //dropdown */}
              {dropdown && (
                <div className="absolute top-10 right-0 bg-white w-[200px]  rounded-md shadow-md z-10 ">
                  <ul className="flex flex-col">
                    <Link to={"/"}>
                      <li className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75 hover:bg-[#5cabff] hover:text-white cursor-pointer ">
                        <i className="fa fa-asterisk text-[20px] leading-lg text-black opacity-75  "></i>
                        <span className="ml-2 text-[16px]  mobile:hidden ">
                          Home
                        </span>
                      </li>
                    </Link>
                    <Link to={"/About"}>
                      <li className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75 hover:bg-[#5cabff] hover:text-white cursor-pointer ">
                        <i className="fa fa-home text-[20px] leading-lg text-black opacity-75  "></i>
                        <span className="ml-2 text-[16px]  mobile:hidden ">
                          About
                        </span>
                      </li>
                    </Link>
                    {/* <Link to={'/pakage'}>
                      <li className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75 hover:bg-[#5cabff] hover:text-white cursor-pointer ">
                        <i className="fa fa-home text-[20px] leading-lg text-black opacity-75  "></i>
                        <span className="ml-2 text-[16px]  mobile:hidden ">
                        Pakages
                        </span>
                      </li>
                    </Link> */}
                    {user && (
                      <Link to={"/MyAccount"}>
                        <li className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75 hover:bg-[#5cabff] hover:text-white cursor-pointer ">
                          <i className="fa fa-user text-[20px] leading-lg text-black opacity-75  "></i>
                          <span className="ml-2 text-[16px]  mobile:hidden ">
                            My Info
                          </span>
                        </li>
                      </Link>
                    )}
                    {user && (
                      <Link to={"/CreateAd"}>
                        <li className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75 hover:bg-[#5cabff] hover:text-white cursor-pointer ">
                          <i className="fa fa-plus-square text-[20px] leading-lg text-black opacity-75  "></i>
                          <span className="ml-2 text-[16px]  mobile:hidden ">
                            Create Ad
                          </span>
                        </li>
                      </Link>
                    )}


                    {user ? (
                      <li
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75 hover:bg-[#5cabff] hover:text-white cursor-pointer "
                        onClick={handleLogout}
                      >
                        <i className="fa fa-sign-out text-[20px] leading-lg text-black opacity-75  "></i>
                        <span className="ml-2 text-[16px]  mobile:hidden ">
                          Log Out
                        </span>
                      </li>
                    ) : (
                      <Link to={"/Login"}>
                        <li className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75 hover:bg-[#5cabff] hover:text-white cursor-pointer ">
                          <i className="fa fa-plus-square text-[20px] leading-lg text-black opacity-75  "></i>
                          <span className="ml-2 text-[16px]  mobile:hidden ">
                            Login
                          </span>
                        </li>
                      </Link>
                    )}
                    {!user && (
                      <li
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75 hover:bg-[#5cabff] hover:text-white cursor-pointer "
                        onClick={handleLogout}
                      >
                        <i className="fa fa-sign-out text-[20px] leading-lg text-black opacity-75  "></i>
                        <span className="ml-2 text-[16px]  mobile:hidden ">
                          Log Out
                        </span>
                      </li>
                    )}
                    <Link to='/pakage'/>
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Banner/>
  </>
  );
}
