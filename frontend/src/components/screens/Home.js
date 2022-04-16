import Navbar from "../widgets/Navbar";
import "../css/Home.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { NotificationError } from "../ui/Notification";
import Loader from "../ui/Loader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    getUsers();
    const userData = localStorage.getItem("user");
      if (userData) {
        const data = JSON.parse(userData);
        const { user } = data.data;
        setLoggedUser(user)
      }
    setIsLoading(false);
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/users`);
      const { data } = response.data;
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to fetch users" />);
    }
  };
  return (
    <>
      <Navbar />
      <section className="px-5 py-5 home-section">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 ">
            <h1 className="fw-bolder">Your Journey Starts Here</h1>
            <p className="lead text-muted">
              We are an organization all about letting your inner self shine.
              More lorem ipsum text to make more lorem ipsum text
            </p>
            <p>
              <Link to="#" className="btn btn-danger my-2 py-2 px-4">
                Begin Journey
              </Link>
            </p>
          </div>
          <div className="col-lg-6 col-md-4">
            <div></div>
          </div>
        </div>
      </section>
      {!isLoading ? (
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-3">
              {users.map(
                ({
                  _id,
                  username,
                  firstName,
                  lastName,
                  profilePhoto,
                  description,
                }) => (
                  <div className="col">
                    <div className="card shadow-sm">
                      <img
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height={225}
                        src={profilePhoto}
                        alt="User"
                      />
                      <div className="card-body">
                        <strong className="card-text">
                          {`${firstName} ${lastName}`}
                        </strong>
                        <p className="card-text">{username}</p>

                        <p className="card-text">{description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              onClick={() => navigate(`user/${_id}`)}
                              type="button"
                              className="btn btn-md btn-outline-danger"
                            >
                              {loggedUser._id === _id ? "Edit": "View"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Home;
