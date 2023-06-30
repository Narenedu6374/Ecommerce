import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { userUpdateActions } from "../../redux/userUpdateSlice";
import { userActions } from "../../redux/UserSlice";
import axios from "axios";

const ProfileTabs = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userDetails);
  const { userDetails, loading, error } = userData;

  const userLoginData = useSelector((state) => state.user);
  const { user } = userLoginData;

  const userUpdateData = useSelector((state) => state.userUpdate);
  const { updateloading } = userUpdateData;

  const userUpdate = { userName, userEmail, userPassword };

  const toastObj = {
    draggable: false,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  useEffect(() => {
    if (userDetails) {
      setUserName(userDetails.name);
      setUserEmail(userDetails.email);
    }
  }, [userDetails, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userPassword !== confirmPassword) {
      if (!toast.isActive(toastId.current))
        toastId.current = toast.error("Password does not match", toastObj);
    } else {
      try {
        dispatch(userUpdateActions.loading());
        const { data } = await axios.put("api/users/profile", userUpdate, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch(userUpdateActions.updateDetails(data));
        dispatch(userActions.login(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
        if (!toast.isActive(toastId.current))
          toastId.current = toast.success("Profile Updated", toastObj);
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(userActions.logout());
          localStorage.removeItem("userInfo");
        }
        dispatch(userUpdateActions.error(message));
      }
    }
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateloading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">UserName</label>
            <input
              className="form-control"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail Address</label>
            <input
              className="form-control"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">New Password</label>
            <input
              className="form-control"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
