import React, { useContext } from "react";
import HandWave from "../SVGs/HandWave";
import Email from "../SVGs/Email";
import Password from "../SVGs/Password";
import PirateEye from "../SVGs/PirateEye";
import './Login.scss'
import ReCAPTCHA from "react-google-recaptcha";
import logo from '../assets/logo.png'
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
console.log(accessToken)
    if (status === "OK") {
      console.log('its here', accessToken)
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

    // console.log(status)
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
    <div className="login-parent">
      <div >
      
<div className="logo-div">
  <img src={logo}alt="" />
</div>

       <div className="login-text">
<h1>login your account</h1>
       </div>
        <div >
          <div className="user-email" >
            <input
              type="email"
              email=""
              id=""
              placeholder="Your Mail?"
            
              required
              onChange={(paso) => {
                setcredentials({ ...credentials, email: paso.target.value });
              }}
            />
          </div>

          <div className="user-password">
          
            <input
              type={visible ? "text" : "password"}
              email=""
              id=""
              placeholder="Your Passcode?"
            
              required
              onChange={(paso) => {
                setcredentials({ ...credentials, pass: paso.target.value });
              }}
            />
              <span
             
             onClick={() => setvisible(!visible)}
           >
             <PirateEye />
           </span>
          </div>
          {/* <text className="w-full flex justify-end ">Forget Password?</text> */}
        </div>

        <div >
         <div className="login-button">
         <input
            type="button"
            value="Login"
            
            onClick={onLogin}
          />
         </div>
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
       
        </div>
        <Link

          to={"/Dashboard"}
        >
       <div className="dont-have">
       <text style={{color:'black'}}>
            Dont have a account ?
            <span >
            <Link to="/Register">
            <input
              type="button"
              value=" Register "
             
            />
          </Link>
            </span>
          </text>
       </div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
