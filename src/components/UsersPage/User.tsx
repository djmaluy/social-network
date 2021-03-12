import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";
import { UsersType } from "../../types/types";

type PropsType = {
  user: UsersType
  unfollowUser: (userId: number) => void
  followUser: (userId: number) => void
  followingStart: Array<number>
}

export const User: FC<PropsType> = ({ user, unfollowUser, followUser, followingStart }) => {
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.status}</p>
      <NavLink to={"/profile/" + user.id}>
        <img
          className="usersPhoto"
          src={user.photos.small || userPhoto}
          alt=""
        />
      </NavLink>
      <div>
        {user.followed ? (
          <button
            disabled={followingStart.some((id) => id === user.id)}
            onClick={() => {
              unfollowUser(user.id);
            }}
          >
            unFollow
          </button>
        ) : (
          <button
            disabled={followingStart.some((id) => id === user.id)}
            onClick={() => {
              followUser(user.id);
            }}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};
