import React from "react";
import HandWave from "../SVGs/HandWave";
import Email from "../SVGs/Email";
import Password from "../SVGs/Password";
import PirateEye from "../SVGs/PirateEye";
import BadgeSharpIcon from "@mui/icons-material/BadgeSharp";
import { NavLink } from "react-router-dom";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import { RadioButton } from "primereact/radiobutton";

import LogoDevSharpIcon from "@mui/icons-material/LogoDevSharp";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store, signIN, signOUT } from "../redux/userSlice";
import { Registerr } from "../http/Services";
import { toast } from "react-toastify";

function Register() {
  const [visible, setVisible] = React.useState(false);
  const [credentials, setcredentials] = React.useState({
    mode: "Buyer",
    pass: "",
    username: "",
    Email: "",
    Contact: "",
  });
  console.log(credentials);
  //   redux calls
  const count = useSelector((state) => state.array[2]);
  const dispatch = useDispatch();

  const [image, setimage] = React.useState("");

  const onSignIn = async () => {
    const { status } = await Registerr(
      credentials.Email,
      credentials.pass,
      credentials.username,
      credentials.Contact,
      credentials.mode,
      credentials.mode
    );
    console.log(status);
    if (status === "OK") {
      toast.success("Registered Successfully");
    } else {
      toast.error("Error Occured");
    }
  };
  const [ingredient, setIngredient] = React.useState("Buyer");

  return (
    <div className="flex flex-1  w-full h-screen justify-center items-center  ">
      <div className="flex flex-1 flex-col items-center   rounded-lg p-5 w-[60%]   ">
        {/* <img
          src={"./ArfiBaba.png"}
          className="max-w-[100px] max-h-[100px] rounded-xl"
        /> */}
        <p className="text-[#2f2f2f] text-5xl font-bold  ">LOGO</p>
        <div className="flex flex-row justify-center  mt-2 ml-[59px] ">
          <text className="text-4xl font-Poppins font-bold text-[#2f2f2f] text-center my-auto mr-6  ">
            Welcome Back Admin !
          </text>
          <HandWave />
        </div>
        <div className="flex flex-row justify-center items-center mt-0 mb-8 ">
          <text className="text-[1.2rem] font-Poppins font-normal leading-[27px] text-[#2f2f2f] text-center  ">
            Login to continue with activities
          </text>
        </div>
        <div className="w-[45%] xs:min-w-[70%] md:min-w-[27%] ">
          {/* first row */}
          <div className="flex flex-row">
            {/* mail */}
            <div className="relative  flex mt-4 min-w-[12.5rem] w-full justify-center mr-3  self-center ">
              <span className="text-[#2f2f2f] text-4xl  absolute left-[0.9rem] bottom-[1.95rem] ">
                <Email />
              </span>
              <input
                type="text"
                mode=""
                id=""
                placeholder="Your Mail?"
                className="bg-[#ffffff] min-h-[5.6rem] min-w-[12.5rem] w-full p-2 mt-[1rem]  pl-[4.8rem] flex-[7] border-2 border-[#2f2f2f] text-[1.2rem] font-Poppins font-normal rounded-[8px]"
                required
                onChange={(paso) => {
                  setcredentials({ ...credentials, Email: paso.target.value });
                }}
              />
            </div>
            {/* mode */}
            <div className="relative  flex mt-4 min-w-[12.5rem] w-full justify-center   self-center ">
              <span className="text-[#2f2f2f] text-4xl  absolute left-[0.9rem] bottom-[1.58rem] ">
                <BadgeSharpIcon sx={{ fontSize: "30px" }} />
              </span>
              <span className="text-[#2f2f2f] text-4xl  absolute right-[0.9rem] bottom-[1.98rem] "></span>
              <input
                type="text"
                name=""
                id=""
                placeholder="Your Contact?"
                className="bg-[#ffffff] min-h-[5.6rem] min-w-[12.5rem] w-full p-2 mt-[1rem]  pl-[4.8rem] flex-[7] border-2 border-[#2f2f2f] text-[1.2rem] font-Poppins font-normal rounded-[8px]"
                onChange={(paso) => {
                  setcredentials({
                    ...credentials,
                    Contact: paso.target.value,
                  });
                }}
              />
            </div>
          </div>
          {/* second row */}
          <div className="flex flex-row">
            {/* Username and password */}
            <div className="relative  flex mt-4 min-w-[12.5rem] w-full justify-center mr-3  self-center ">
              <span className="text-[#2f2f2f] text-4xl  absolute left-[0.9rem] bottom-[1.58rem] ">
                <BadgeSharpIcon sx={{ fontSize: "30px" }} />
              </span>
              <span className="text-[#2f2f2f] text-4xl  absolute right-[0.9rem] bottom-[1.98rem] "></span>
              <input
                type="text"
                name=""
                id=""
                placeholder="Your Username?"
                className="bg-[#ffffff] min-h-[5.6rem] min-w-[12.5rem] w-full p-2 mt-[1rem]  pl-[4.8rem] flex-[7] border-2 border-[#2f2f2f] text-[1.2rem] font-Poppins font-normal rounded-[8px]"
                required
                onChange={(paso) => {
                  setcredentials({
                    ...credentials,
                    username: paso.target.value,
                  });
                }}
              />
            </div>
            {/* pass */}
            <div className="relative  flex mt-4 min-w-[12.5rem] w-full justify-center  self-center ">
              <span className="text-[#2f2f2f] text-4xl  absolute left-[0.9rem] bottom-[1.58rem] ">
                <Password />
              </span>
              <span
                className="text-[#2f2f2f] text-4xl  absolute right-[0.9rem] bottom-[1.98rem] "
                onClick={() => setVisible(!visible)}
              >
                <PirateEye />
              </span>
              <input
                type={visible ? "text" : "password"}
                name=""
                id=""
                placeholder="Your Passcode?"
                className="bg-[#ffffff] min-h-[5.6rem] min-w-[12.5rem] w-full p-2 mt-[1rem]  pl-[4.8rem] flex-[7] border-2 border-[#2f2f2f] text-[1.2rem] font-Poppins font-normal rounded-[8px]"
                required
                onChange={(paso) => {
                  setcredentials({ ...credentials, pass: paso.target.value });
                }}
              />
            </div>
          </div>
          {/* third row */}
          <div className="flex flex-row">
            {/* Username and password */}

            {/* pass */}
            {/* <div className="relative  flex mt-4 min-w-[12.5rem] w-full justify-center  self-center ">
              <div className="flex flex-wrap gap-3">
                <div className="flex align-items-center items-center ">
                  <RadioButton
                    inputId="ingredient1"
                    name="Buyer"
                    value="Buyer"
                    onChange={(e) => setIngredient("Buyer")}
                    checked={ingredient === "Buyer"}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    Buyer
                  </label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton
                    inputId="ingredient2"
                    name="Seller"
                    value="Seller"
                    onChange={(e) => setIngredient("Seller")}
                    checked={ingredient === "Seller"}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Seller
                  </label>
                </div>
              </div>
            </div> */}
          </div>
          {/* all 3 rows over */}

          <text className="w-full flex justify-end ">Forget Password?</text>
        </div>
        <div className="w-[27%] xs:min-w-[70%] md:min-w-[27%] ">
          <input
            type="button"
            value="Register"
            className="btn mt-[3rem] bg-[#2f2f2f] min-w-[12.5rem] w-full min-h-[5.6rem] rounded-[8px] text-white font-normal font-Poppins text-[18px]  hover:scale-[1.02]"
            onClick={onSignIn}
          />
        </div>
        <div className="flex flex-row justify-center items-center mt-4  ">
          <NavLink to={"/"}>
            <text className="text-[1.2rem] font-Poppins font-normal leading-[27px] text-[#2f2f2f] text-center  ">
              Have an account?
              <span className="font-semibold">Go to login</span>
            </text>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Register;
