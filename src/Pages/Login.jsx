import React, { useContext } from "react";
import HandWave from "../SVGs/HandWave";
import Email from "../SVGs/Email";
import Password from "../SVGs/Password";
import PirateEye from "../SVGs/PirateEye";
import "./Login.scss";
import ReCAPTCHA from "react-google-recaptcha";
import logo from "../assets/logo.png";
import { Loginn } from "../http/Services";
import LogoDevSharpIcon from "@mui/icons-material/LogoDevSharp";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import { Google, Facebook } from "@mui/icons-material";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer/Footer'
function Login({ role, authenticated }) {
  const navigate = useNavigate();
  const [credentials, setcredentials] = React.useState({ email: "", pass: "" });
  const { userdetails, setuserdetails } = useContext(Context);
  const [visible, setvisible] = React.useState(false);

  const onLogin = async () => {
    const { status, accessToken, refreshToken, ...resp } = await Loginn(
      credentials.email,
      credentials.pass
    );
    console.log(resp,'response ')
    if (status === "OK") {
      authenticated(accessToken);
      setuserdetails(resp);
      role(resp.user.admin);
      localStorage.setItem("@accessToken", accessToken);
      localStorage.setItem("@refreshToken", refreshToken);
      localStorage.setItem("@userdetails", JSON.stringify(resp));
      localStorage.setItem("@role", JSON.stringify(resp.user.admin));
      navigate("/");
    }
  };

  const { loginWithRedirect } = useAuth0();

  return (
<div>
  <Navbar/>
  <div style={{background:'white'}}>
     <div className="login-parent">
      <div>
        <div className="logo-div">
          <img src={logo} alt="" />
        </div>

        <div className="login-text">
          <h1>login your account</h1>
        </div>

        <div>
          <div className="user-email">
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
            <span onClick={() => setvisible(!visible)}>
              <PirateEye />
            </span>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr ',gap:'20px',marginTop:'20px'}}>
          <div   style={{padding:'10px',width:'100%',display:'flex',justifyContent:'center',border: "1px solid #E9EBED",borderRadius:'40px'}}
            onClick={() => {
              loginWithRedirect({
                connection: "google-oauth2",
              });
            }}
          >
            <input type="button" value="Login with Google" />
            <Google sx={{ color: "blue", fontSize: "22px", marginLeft: 1 }} />
          </div>

          <div
       style={{padding:'10px',width:'100%',display:'flex',justifyContent:'center', border: "1px solid #E9EBED",borderRadius:'40px'}}
            onClick={() => {
              loginWithRedirect({
                connection: "facebook",
              });
            }}
          >
            <input type="button" value="Login with Facebook" />
            <Facebook
              sx={{ color: "#3b5998", fontSize: "22px", marginLeft: 1 }}
            />
          </div>
          </div>
        </div>

        <div>
          <div className="login-button">
            <input type="button" value="Login" onClick={onLogin} />
          </div>
    
        </div>

        <Link to={"/Dashboard"}>
          <div className="dont-have">
            <text style={{ color: "black" }}>
              Don't have an account?
              <span>
                <Link to="/Register">
                  <input type="button" value=" Register " />
                </Link>
              </span>
            </text>
          </div>
        </Link>
      </div>
    </div>
   </div>
   <Footer/>
</div>
  );
}

export default Login;
