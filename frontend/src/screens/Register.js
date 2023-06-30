import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterActions } from "../redux/UserRegisterSlice";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import axios from "axios";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const dispatch = useDispatch();

  const registeredUserData = useSelector((state) => state.userRegister);
  const { user, loading, error } = registeredUserData;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [user, history, redirect]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(userRegisterActions.loading());
      const { data } = await axios.post(
        "api/users/",
        { name: userName, email: userEmail, password: userPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(userRegisterActions.register(data));
    } catch (error) {
      const errorData =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(userRegisterActions.error(errorData));
    }
  };

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={formSubmitHandler}
        >
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />

          <button type="submit">Register</button>
          <p>
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
