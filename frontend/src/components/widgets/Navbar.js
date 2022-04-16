import { Link } from "react-router-dom";
const Navbar = (props) => {
  return (
    <>
      <header>
        <div className="collapse bg-light" id="navbarHeader">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-md-7 py-4">
                <h4>About</h4>
                <p>
                  Add some information about the album below, the author, or any
                  other background context. Make it a few sentences long so
                  folks can pick up some informative tidbits. Then, link them
                  off to some social networking sites or contact information.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-light bg-light shadow-sm">
          <div className="container">
            <Link to="#" className="navbar-brand d-flex align-items-center">
              <img width={80} height={60} src="https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png" alt="" />
              <strong>Create Yourself</strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarHeader"
              aria-controls="navbarHeader"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
