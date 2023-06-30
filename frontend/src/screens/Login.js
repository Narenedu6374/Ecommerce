import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/UserSlice";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import axios from "axios";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);
  const { user, loading, error } = userData;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [user, history, redirect]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(userActions.loading());
      const { data } = await axios.post(
        "api/users/login",
        { email: userEmail, password: userPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(userActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const errorData =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch(userActions.error(errorData));
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
          <button type="submit">Login</button>
          <p>
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
