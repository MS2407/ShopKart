import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import "./Profile.css";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile `} />
          <div className="profileContainer">
            <div>
              <h1>My Profile ☄</h1>
              <img
                src={user.avatar && user.avatar.url}
                alt={user.name}
              />
              <NavLink to="/me/update">Edit Profile ✎</NavLink>
            </div>
            <div>
              <div>
                <h4>Full Name 📘</h4>
                <p>⤿ {user.name}</p>
              </div>
              <div>
                <h4>Email 📧 </h4>
                <p>⤿ {user.email}</p>
              </div>
              <div>
                <h4>Joined On 📆</h4>
                <p>⤿ {user.createdAt && String(user.createdAt.substr(0, 10))}</p>
              </div>
              <div>
                <NavLink to="/orders">My Orders ⌹</NavLink>
                <NavLink to="/password/update">Change Password ⟳</NavLink>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
