import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";

export const Users = (props) => {
  return (
    <div>
      {props.users.map((u) => (
        <div key={u.id}>
          <p>{u.name}</p>
          <NavLink to={"/profile/" + u.id}>
            <img
              className="usersPhoto"
              src={u.photos.small || userPhoto}
              alt=""
            />
          </NavLink>

          <div>
            {u.followed ? (
              <button
                onClick={() => {
                  axios
                    .delete(
                      `https://social-network.samuraijs.com/api/1.0/follow/` +
                        u.id,
                      {
                        withCredentials: true,
                        headers: {
                          "API-KEY": "0a588f3a-4500-45fa-a13f-2d763f85a42b",
                        },
                      }
                    )
                    .then((res) => {
                      if (res.data.resultCode === 0) {
                        props.unfollow(u.id);
                      }
                    });
                }}
              >
                unFollow
              </button>
            ) : (
              <button
                onClick={() => {
                  axios
                    .post(
                      `https://social-network.samuraijs.com/api/1.0/follow/` +
                        u.id,
                      {},
                      {
                        withCredentials: true,
                        headers: {
                          "API-KEY": "0a588f3a-4500-45fa-a13f-2d763f85a42b",
                        },
                      }
                    )
                    .then((res) => {
                      if (res.data.resultCode === 0) {
                        props.follow(u.id);
                      }
                    });
                }}
              >
                Follow
              </button>
            )}
          </div>
          <p>{u.status}</p>
        </div>
      ))}
    </div>
  );
};
