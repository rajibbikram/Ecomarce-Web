import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import "./Profile.css";


const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (loading || !user) {
    return (
      <>
        <MetaData title="Loading profile…" />
        <Loader />
      </>
    );
  }

  const joinedOn = new Date(user.createdAt).toLocaleDateString("en-GB");

  return (
    <>
      <MetaData title={`${user.name}'s Profile`} />

      <div className="profile-card-container">
        <div className="profile-card">
          <header className="profile-header">
            <img
              src={user.avatar?.url || "/defaultAvatar.png"}
              alt={user.name}
            />
            <h2>{user.name}</h2>
            <Link to="/me/update" className="edit-btn">
              Edit Profile
            </Link>
          </header>

          <section className="profile-details">
            <div className="profile-item">
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>

            <div className="profile-item">
              <h4>Email</h4>
              <p>{user.email}</p>
            </div>

            <div className="profile-item">
              <h4>Joined On</h4>
              <p>{joinedOn}</p>
            </div>

            <nav className="profile-links">
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </nav>
          </section>
        </div>
      </div>
    </>
  );
};

export default Profile;
