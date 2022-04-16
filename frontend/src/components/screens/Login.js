import { useEffect } from "react";
import "../css/Login.css";
import GoogleLogin from "react-google-login";


const Login = ({login}) => {
    useEffect(() => {
        
    }, [])
    
  return (
    <>
      <main className="containers form-signin d-flex flex-column justify-content-center">
        <img
          src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"
          alt=""
        />
        <h1 class="h3  mx-5 mb-3 fw-normal text-uppercase">Please sign in</h1>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          onSuccess={login}
          onFailure={login}
          cookiePolicy={"single_host_origin"}
        >
          <span>Sign Up with Google</span>
        </GoogleLogin>
      </main>
    </>
  );
};

export default Login;
