import { useState } from "react";
import "../css/Login.css";
import Logo from "../../assets/logo.png"

const Login = ({ login }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (event) => {
    event.preventDefault();
    login({
      email,
      firstName,
      lastName,
      password,
      image:
        "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png",
    });
  };
  return (
    <>
      <main className="containers form-signin d-flex flex-column justify-content-center">
        <img
          className="mb-4"
          src={Logo}
          alt=""
        />
        <h1 class="h3 mx-5 mb-3 fw-normal text-uppercase">Please sign in</h1>

        <form onSubmit={handleForm}>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">First Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Last Name</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </>
  );
};

export default Login;
