import React from "react";
import classes from "./Users.module.css";
// import * as axios from "axios";
import userPhoto from "../../assets/images/userPhoto.png";
import Paginator from "../Common/Pagination/Paginator";

class Users extends React.Component {
  // componentDidMount() {
  //   axios
  //     .get("https://social-network.samuraijs.com/api/1.0/users", {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       this.props.setUsers(response.data.items);
  //     });
  // }

  render() {
    // let pagesCount = Math.ceil(
    //   this.props.totalUsersCount / this.props.pageSize
    // );

    return (
      <div className={classes.usersWrapper}>
        <Paginator />
        {/* {this.props.users.map((u) => (
          <div key={u.id}>
            <span>
              <div>
                <img
                  className={classes.usersPhoto}
                  src={u.photos.small || userPhoto}
                  alt="avatar"
                />
              </div>
              <div>
                {u.followed ? (
                  <button
                    onClick={() => {
                      this.props.unfollow(u.id);
                    }}
                  >
                    unFollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
          </div>
        ))} */}
      </div>
    );
  }
}

export default Users;
