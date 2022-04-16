import "../css/Login.css";
import { baseUrl } from "../../utils/constants";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <>
      <main className="container form-signin d-flex flex-column justify-content-center">
        <img
          src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"
          alt=""
        />
        <h1 className="h3  mx-5 mb-3 fw-normal text-uppercase">Please sign in</h1>

        <a href={`${baseUrl}/auth/login`} className="w-100 btn btn-lg btn-outline-primary" type="submit">
          <i class="bi bi-google"></i> Sign in
        </a>
      </main>
    </>
  );
};

export default Login;
