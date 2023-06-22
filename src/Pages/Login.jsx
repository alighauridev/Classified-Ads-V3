import React, { useContext } from "react";
import HandWave from "../SVGs/HandWave";
import Email from "../SVGs/Email";
import Password from "../SVGs/Password";
import PirateEye from "../SVGs/PirateEye";

import ReCAPTCHA from "react-google-recaptcha";
import { Loginn, googleLogin } from "../http/Services";
//useContext

import LogoDevSharpIcon from "@mui/icons-material/LogoDevSharp";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import { Google } from "@mui/icons-material";

function Login({ authenticated, role }) {
  const navigate = useNavigate();
  const [credentials, setcredentials] = React.useState({ email: "", pass: "" });
  console.log(credentials);
  const { userdetails, setuserdetails } = useContext(Context);

  const [visible, setvisible] = React.useState(false);

  const onLogin = async () => {
    const { status, accessToken, refreshToken, ...resp } = await Loginn(
      credentials.email,
      credentials.pass
    );

    if (status === "OK") {
      authenticated(accessToken);
      setuserdetails(resp);

      console.log(status);
      // console.log(resp);
      role(resp.user.admin);
      console.log("admin is responser", resp.user.admin);
      localStorage.setItem("@accessToken", accessToken);
      localStorage.setItem("@refreshToken", refreshToken);
      localStorage.setItem("@userdetails", JSON.stringify(resp));
      localStorage.setItem("@role", JSON.stringify(resp.user.admin));
      navigate("/");
    }
  };
  const google = async () => {
    //settimeout for 5 seconds
    setTimeout(() => {
      console.log("5 seconds passed");
    }, 5000);

    const { accessToken, refreshToken, ...resp } = await googleLogin();
    console.log("google login", resp);

    if (true) {
      authenticated(accessToken);
      setuserdetails(resp);

      // console.log(status);
      // console.log(resp);
      role(resp.user.admin);
      console.log("admin is responser", resp.user.admin);
      localStorage.setItem("@accessToken", accessToken);
      localStorage.setItem("@refreshToken", refreshToken);
      localStorage.setItem("@userdetails", JSON.stringify(resp));
      localStorage.setItem("@role", JSON.stringify(resp.user.admin));
    }
  };

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
            Welcome to Jiji !
          </text>
          <HandWave />
        </div>

        <div className="flex flex-row justify-center items-center mt-0 mb-8 ">
          <text className="text-[1.2rem] font-Poppins font-normal leading-[27px] text-[#2f2f2f] text-center  ">
            Login to continue with activities
          </text>
        </div>
        <div className="w-[27%] xs:min-w-[70%] md:min-w-[27%] ">
          <div className="relative  flex mt-4 min-w-[12.5rem] w-full justify-center  self-center ">
            <span className="text-[#2f2f2f] text-4xl  absolute left-[0.9rem] bottom-[1.95rem] ">
              <Email />
            </span>
            <input
              type="email"
              email=""
              id=""
              placeholder="Your Mail?"
              className="bg-[#ffffff] min-h-[5.6rem] min-w-[12.5rem] w-full p-2 mt-[1rem]  pl-[4.8rem] flex-[7] border-2 border-[#2f2f2f] text-[1.2rem] font-Poppins font-normal rounded-[8px]"
              required
              onChange={(paso) => {
                setcredentials({ ...credentials, email: paso.target.value });
              }}
            />
          </div>

          <div className="relative  flex mt-4 min-w-[12.5rem] w-full justify-center  self-center ">
            <span className="text-[#2f2f2f] text-4xl  absolute left-[0.9rem] bottom-[1.58rem] ">
              <Password />
            </span>
            <span
              className="text-[#2f2f2f] text-4xl  absolute right-[0.9rem] bottom-[1.98rem] "
              onClick={() => setvisible(!visible)}
            >
              <PirateEye />
            </span>
            <input
              type={visible ? "text" : "password"}
              email=""
              id=""
              placeholder="Your Passcode?"
              className="bg-[#ffffff] min-h-[5.6rem] min-w-[12.5rem] w-full p-2 mt-[1rem]  pl-[4.8rem] flex-[7] border-2 border-[#2f2f2f] text-[1.2rem] font-Poppins font-normal rounded-[8px]"
              required
              onChange={(paso) => {
                setcredentials({ ...credentials, pass: paso.target.value });
              }}
            />
          </div>
          {/* <text className="w-full flex justify-end ">Forget Password?</text> */}
        </div>

        <div className="w-[27%] xs:min-w-[70%] md:min-w-[27%] ">
          <input
            type="button"
            value="Login"
            className="btn mt-[3rem] bg-[#2f2f2f] min-w-[12.5rem] w-full min-h-[5.6rem] rounded-[8px] text-white font-normal font-Poppins text-[18px]  hover:scale-[1.02]"
            onClick={onLogin}
          />
          {/* <div
            className="btn flex justify-center items-center flex-row   mt-[1rem] bg-[#e2dff7] min-w-[12.5rem] w-full min-h-[5.6rem] rounded-[8px] text-black font-normal font-Poppins text-[18px]  hover:scale-[1.02]"
            onClick={() => {
              const loginUrl = "http://localhost:5000/auth/google";
              const win = window.open(
                loginUrl,
                "_blank",
                "width=500,height=600"
              );
              if (win) {
                const timer = setInterval(() => {
                  if (win.closed) {
                    console.log("closed");
                    if (timer) clearInterval(timer);
                  }
                }, 500);
              }
            }}
          >
            <input type="button" value="Login with Google" />
            <Google sx={{ color: "blue", fontSize: "22px", marginLeft: 1 }} />
          </div> */}
          <Link to="/Register">
            <input
              type="button"
              value="Register"
              className="btn mt-7 bg-[white] min-w-[12.5rem] w-full min-h-[5.6rem] rounded-[8px] text-[#2f2f2f] border-2 border-[#2f2f2f] font-normal font-Poppins text-[18px]  hover:scale-[1.02]"
            />
          </Link>
        </div>
        <Link
          className="flex flex-row justify-center items-center mt-4  "
          to={"/Dashboard"}
        >
          <text className="text-[1.2rem] font-Poppins font-normal leading-[27px] text-[#2f2f2f] text-center  ">
            Dont have a account ?
            <span className="font-semibold text-blue-700  ">
              Continue as Guest
            </span>
          </text>
        </Link>
      </div>
    </div>
  );
}

export default Login;
