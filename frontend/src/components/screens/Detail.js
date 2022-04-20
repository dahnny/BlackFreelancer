import "../css/Detail.css";
import Navbar from "../widgets/Navbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getUserById, updateUser, uploadImage } from "../../utils/services";
import { toast } from "react-toastify";
import Loader from "../ui/Loader";
const Detail = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  //   form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const [displayPicture, setDisplayPicture] = useState("");

  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getUserById(id).then((user) => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setDescription(user.description);
        setProfilePhoto(user.profilePhoto);
        setDisplayPicture(user.profilePhoto);
      });
      const userData = localStorage.getItem("user");
      if (userData) {
        const data = JSON.parse(userData);
        const { user } = data.data;
        if (id === user._id) setIsOwner(true);
      }
      setIsLoading(false);
    }
  }, [id]);

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      console.log(firstName, lastName, description, profilePhoto);
      await updateUser({
        id,
        firstName,
        lastName,
        description,
        profilePhoto,
      });
      toast("Successfully Uploaded");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  const handleImageChange = async (e) => {
    try {
      const image = e.target.files[0];
      if (image === "" || image === undefined) {
        return;
      }
      setDisplayPicture(URL.createObjectURL(image));
      const response = await uploadImage(image);
      const { photo } = response;
      setProfilePhoto(photo);
    } catch (error) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <>
      <Navbar />
      {
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
          {!isLoading ? (
            <div className="card-detail p-4">
              
              <div className=" image d-flex flex-column justify-content-center align-items-center">
                <button className="btn-detail btn-secondary">
                  <img src={displayPicture} height={100} width={100} alt="" />
                </button>

                <div className="d-flex flex-row justify-content-center pt-2 align-items-center gap-2">
                  <input
                    type={"file"}
                    accept="image/gif, image/jpeg, image/png"
                    name="image"
                    id="user-image"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  {isOwner && (
                    <label style={{ display: "flex" }} htmlFor="user-image">
                      <span className="idd1">Change Image</span>
                      <span>
                        <i class="bi bi-pencil-square"></i>
                      </span>
                    </label>
                  )}
                </div>
                <form onSubmit={handleForm}>
                  <div className="mb-3">
                    <input
                      disabled={!isOwner}
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      disabled={!isOwner}
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      disabled={!isOwner}
                      className="form-control"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      required
                    />
                  </div>
                  {isOwner && (
                    <button className="btn1 btn-dark">Edit Profile</button>
                  )}
                </form>
              </div>
              
            </div>
          ) : (
            <Loader />
          )}
        </div>
      }
    </>
  );
};

export default Detail;
