import React from "react";
import userPhoto from "../../assets/images/userPhoto.png";

export const Users = (props) => {
  return (
    <div>
      <div></div>
      {props.users.map((u) => (
        <div key={u.id}>
          <p>{u.name}</p>
          <img
            className="usersPhoto"
            src={u.photos.small || userPhoto}
            alt=""
          />
          <div>
            {u.followed ? (
              <button
                onClick={() => {
                  props.unfollow(u.id);
                }}
              >
                unFollow
              </button>
            ) : (
              <button
                onClick={() => {
                  props.follow(u.id);
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
