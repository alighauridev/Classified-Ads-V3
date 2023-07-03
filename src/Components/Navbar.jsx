import React, { useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { RiArrowDropDownLine } from "react-icons/ri";
import ".././Components/Scss/Home/Navbar.scss";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import iconf from "../assets/Frame 13.png";
import icons from "../assets/Frame 14.png";
import icont from "../assets/Frame 15.png";
import icont4 from "../assets/Frame 16.png";
import icont5 from "../assets/Frame 17.png";
import icont6 from "../assets/Frame 18.png";
import Banner from "../Pages/Homepage/Banner";
import axios from "axios";
export default function Navbar({ fixed }) {
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  //dropdown useState
  const [currencies, setCurrencies] = React.useState([]);
  const [dropdown, setdropdown] = React.useState(false);
  const [user, setuser] = React.useState(
    localStorage.getItem("@userdetails") &&
      JSON.parse(localStorage.getItem("@userdetails"))
  );
  const getCurrencies = async () => {
    const { data } = await axios.get(
      "https://openexchangerates.org/api/currencies.json"
    );
    setCurrencies(data);
  };
  const handleLogout = () => {
    localStorage.setItem("@accessToken", "");
    localStorage.setItem("@refreshToken", "");
    localStorage.setItem("@userdetails", "");
    // window.location.reload();
    navigate("/");
    window.location.reload();
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <div className="navbar-back">
      <div className="navbar-parent">
        <div className="logo-div">
          <img src={logo} alt="" />
        </div>
        <div className="seller-buy">
          <span style={{ color: "#FA4F16" }}>Home</span>
          <span>About</span>
          <span></span>
          <span>Services</span>
          <div>
            <Button
              className="curreny"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{ background: "none" }}
            >
              Currency <RiArrowDropDownLine style={{ fontSize: "16px" }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {Object.entries(currencies).map(([code, currency]) => (
                <MenuItem key={code} onClick={handleClose}>
                  {code}: {currency}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <div>
            <Button
              className="curreny"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{ background: "none" }}
            >
              Language <RiArrowDropDownLine style={{ fontSize: "16px" }} />
            </Button>
            {/* <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              // onClose={handleClose}  
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>English</MenuItem>
              <MenuItem onClick={handleClose}>Africans</MenuItem>
              <MenuItem onClick={handleClose}>Spannish</MenuItem>
            </Menu> */}
          </div>
        </div>
        <div className="icons">
          <div>
            <img src={iconf} alt="" />
          </div>
          <div>
            <img src={icons} alt="" />
          </div>
          <div>
            <img src={icont} alt="" />
          </div>
          <div>
            <img src={icont4} alt="" />
          </div>
          <div>
            <img src={icont6} alt="" />
          </div>
          <div>
            <img src={icont5} alt="" />
          </div>
        </div>
        <div>
          <ul>
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
                      <Link to="/pakage" />
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
