import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateUser from "../Authentication/UpdateUser/UpdateUser";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [accessToken, setAccessToken] = useState();
  const [show, setShow] = useState(false);
  const navigate= useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    setAccessToken(storedToken);
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (accessToken) {
          const headers = {
            Authorization: `Bearer ${accessToken}`
          };

          const { data } = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', { headers });
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, [accessToken]);

  const fetchInfo = async () => {
    const storedToken = localStorage.getItem('access_token');
    setAccessToken(storedToken);

    try {
      if (accessToken) {
        const headers = {
          Authorization: `Bearer ${accessToken}`
        };

        const { data } = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', { headers });
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    navigate('/');
  };

  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="p-4">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          <img src={userData.avatar} alt="User Avatar" className="w-24 h-24 object-cover rounded-full mt-4" />
        </div>
        <div className="flex justify-between items-center p-4">
          <button onClick={handleShow} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Edit Profile
          </button>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Logout
          </button>
        </div>
        <UpdateUser show={show} handleClose={handleClose} id={userData.id} fetchInfo={fetchInfo} />
      </div>
    </div>
  );
};

export default Profile;