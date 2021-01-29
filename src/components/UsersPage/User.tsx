import React from "react";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";
import { FilterType } from "../../redux/usersReducer";
import {  UsersType } from "../../types/types";
import UsersSearchForm from "./UsersSearchForm";

type UserProps = {
  users: Array<UsersType>
  unfollow: (UserId: number) => void
  follow: (UserId: number) => void
  onFilterChanged: (filter: FilterType) => void
  };
  
export const User: React.FC <UserProps> = ({ users, unfollow, follow, onFilterChanged }) => {
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
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
