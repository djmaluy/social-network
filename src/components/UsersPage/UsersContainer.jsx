import { connect } from "react-redux";
import React, { Component } from "react";
import userPhoto from "../../assets/images/userPhoto.png";
import ReactPaginate from "react-paginate";
// import Users from "./Users";
import "./Users.css";
import {
  setUsers,
  follow,
  unfollow,
  toggleIsFetching,
} from "../../redux/usersReducer";
import axios from "axios";
import Preloader from "../../common/Preloader/Preloader";

class UsersContainer extends Component {
  state = {
    usersData: [],
    // pageSize: 15,
    // currentPage: 1,
  };
  receivedData() {
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((res) => {
        this.props.toggleIsFetching(false);
        const users = res.data.items;

        const usersData = users.map((u) => (
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
            <p>{u.status}</p>
          </div>
        ));

        this.setState({
          pageCount: Math.ceil(res.data.totalCount / this.props.pageSize),
          usersData,
        });
      });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected + 1;

    this.setState(
      {
        currentPage: selectedPage,
      },
      () => {
        this.receivedData();
      }
    );
  };

  componentDidMount() {
    this.receivedData();
  }
  render() {
    return (
      <>
        {" "}
        {this.props.isFetching ? <Preloader /> : null}
        <div className="usersWrapper">
          <ReactPaginate
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
          {this.state.usersData}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    pageCount: state.usersPage.pageCount,
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  toggleIsFetching,
})(UsersContainer);
