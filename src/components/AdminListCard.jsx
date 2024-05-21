// import React from "react";
import './styles/adminlistcard.css';
import avatar from './../assets/user-settings-icon.png';
// import { useSelector, useDispatch } from "react-redux";
// import { useActivateAdminMutation } from "../slices/usersApiSlice";
import { toast } from 'react-toastify';
import { useState } from 'react';
const AdminListCard = ({ name, email, activated }) => {
  const [active, setActivate] = useState(activated);
  // const [activateAdminApi, { isLoading }] = useActivateAdminMutation();

  const handleActivate = async () => {
    try {
      const nActivated = !active;
      // const data = { id, activated: nActivated };
      // const res = await activateAdminApi(data).unwrap();
      setActivate(nActivated);
      const text = nActivated ? 'Activated' : 'Deactivated ';
      toast.success(`User ${text}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="admin-list-card">
      <div className="admin-list-card-profile">
        <img src={avatar} alt="admin-avatar" />
        <div className="admin-list-card-profile-text">
          <h3>{name}</h3>
          <p>{email}</p>
        </div>
      </div>
      {active ? (
        <button className="btn-switch" onClick={handleActivate}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <ellipse
              cx="13.9411"
              cy="13.4545"
              rx="13.0588"
              ry="13.4545"
              fill="#10ACF5"
            />
            <path
              d="M23.1256 13.4546C23.1256 18.7975 18.9626 23.0348 13.9411 23.0348C8.91958 23.0348 4.75659 18.7975 4.75659 13.4546C4.75659 8.11171 8.91958 3.87439 13.9411 3.87439C18.9626 3.87439 23.1256 8.11171 23.1256 13.4546Z"
              fill="#10ACF5"
              stroke="#ECECEC"
              strokeWidth="3"
            />
          </svg>{' '}
          Activated
        </button>
      ) : (
        <button className="btn-switch" onClick={handleActivate}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <ellipse
              cx="13.9412"
              cy="13.4546"
              rx="13.0589"
              ry="13.4546"
              fill="#9F9F9F"
            />
            <path
              d="M23.1257 13.4546C23.1257 18.7975 18.9627 23.0348 13.9412 23.0348C8.91971 23.0348 4.75671 18.7975 4.75671 13.4546C4.75671 8.11166 8.91971 3.87433 13.9412 3.87433C18.9627 3.87433 23.1257 8.11166 23.1257 13.4546Z"
              fill="#9F9F9F"
              stroke="#ECECEC"
              strokeWidth="3"
            />
          </svg>{' '}
          Deactivated
        </button>
      )}
      <button className="admin-btn-reset">Reset password</button>
    </div>
  );
};

export default AdminListCard;
