import { connect } from "react-redux";
import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./Users.css";
import {
  setUsers,
  follow,
  unfollow,
  toggleIsFetching,
  setTotalUsersCount,
  setCurrentPage,
} from "../../redux/usersReducer";
import axios from "axios";
import Preloader from "../../common/Preloader/Preloader";
import { Users } from "./Users";

class UsersContainer extends Component {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((res) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(res.data.items);
        this.props.setTotalUsersCount(
          res.data.totalCount / this.props.pageSize
        );
      });
  }

  handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    this.props.setCurrentPage(currentPage);
    this.props.toggleIsFetching(true);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`
      )
      .then((res) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(res.data.items);
      });
  };

  render() {
    return (
      <>
        <div className="usersWrapper">
          <ReactPaginate
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.props.totalUsersCount}
            marginPagesDisplayed={4}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
          {this.props.isFetching ? <Preloader /> : null}
          <Users
            users={this.props.users}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
          />
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
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setUsers,
  toggleIsFetching,
  setTotalUsersCount,
  setCurrentPage,
})(UsersContainer);
