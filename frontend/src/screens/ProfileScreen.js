import React, { useEffect } from "react";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Orders from "./../components/profileComponents/Orders";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsActions } from "../redux/userDetailsSlice";
import axios from "axios";
import moment from "moment";
import { userActions } from "../redux/UserSlice";

const ProfileScreen = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user);
  const { user } = userData;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        dispatch(userDetailsActions.loading());
        const { data } = await axios.get("api/users/profile", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        dispatch(userDetailsActions.getDetails(data));
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(userActions.logout());
          localStorage.removeItem("userInfo");
        }
        dispatch(userDetailsActions.error(message));
      }
    };
    fetchUserDetails();
  }, [dispatch, user]);
  return (
    <>
      <Header />
      <div className="container mt-lg-5 mt-3">
        <div className="row align-items-start">
          <div className="col-lg-4 p-0 shadow ">
            <div className="author-card pb-0 pb-md-3">
              <div className="author-card-cover"></div>
              <div className="author-card-profile row">
                <div className="author-card-avatar col-md-5">
                  <img src="./images/user.png" alt="userprofileimage" />
                </div>
                <div className="author-card-details col-md-7">
                  <h5 className="author-card-name mb-2">
                    <strong>{user.name}</strong>
                  </h5>
                  <span className="author-card-position">
                    <>Joined {moment(user.createdAt).format("LL")}</>
                  </span>
                </div>
              </div>
            </div>
            <div className="wizard pt-3 ">
              <div class="d-flex align-items-start">
                <div
                  class="nav align-items-start flex-column col-12 nav-pills me-3 "
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    class="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Profile Settings
                  </button>
                  <button
                    class="nav-link d-flex justify-content-between"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Orders List
                    <span className="badge2">3</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* panels */}
          <div
            class="tab-content col-lg-8 pb-5 pt-lg-0 pt-3"
            id="v-pills-tabContent"
          >
            <div
              class="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ProfileTabs token={user.token} />
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Orders />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
