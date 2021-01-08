import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";
import {  UsersType } from "../../types/types";

type UserProps = {
  users: Array<UsersType>
  unfollow: (UserId: number) => void
  follow: (UserId: number) => void
  };
  
export const User: React.FC <UserProps> = ({ users, unfollow, follow }) => {
  return (
    <div>
      {users.map((u) => (
        <div key={u.id}>
          <p>{u.name}</p>
          <p>{u.status}</p>
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
                  unfollow(u.id);
                }}
              >
                unFollow
              </button>
            ) : (
              <button
                onClick={() => {
                  follow(u.id);
                }}
              >
                Follow
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
