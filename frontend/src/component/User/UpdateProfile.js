import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../images/Profile.png";
import { toast } from "react-toastify";
import { updateProfile, clearErrors, loadUser } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import FaceIcon from "@mui/icons-material/Face";
import MailOutline from "@mui/icons-material/MailOutline";
import "./UpdateProfile.css"

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(Profile);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  
      dispatch(loadUser());
      navigate("/account");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, user, isUpdated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                <div className="updateProfileName">
                    <FaceIcon/>
                    <input type="text" placeholder="Name" name="name" value={name} onChange = {(e)=>setName(e.target.value)}/>
                </div>
                <div className="updateProfileEmail">
                    <MailOutline/>
                    <input type="text" placeholder="Email" name="email" value={email} onChange = {(e)=>setEmail(e.target.value)}/>
                </div>
                <div id="updateProfileImage">
                   <img src={avatarPreview} alt="Avatar Preview"></img>
                    <input type="file"  name="avatar" accept="image/*" onChange = {updateProfileDataChange}/>
                </div>
                <input type="submit" value="Update" className="updateProfileBtn"/>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
