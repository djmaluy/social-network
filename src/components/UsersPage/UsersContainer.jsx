import { connect } from "react-redux";
import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./Users.css";
import {
  follow,
  unfollow,
  setCurrentPage,
  getUsers,
} from "../../redux/usersReducer";
import Preloader from "../../common/Preloader/Preloader";
import { User } from "./User";
import { compose } from "redux";
import {
  getAllUsers,
  getCurrentPage,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
} from "../../redux/users-selectors";

class UsersContainer extends Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  handlePageClick = (e) => {
    const currentPage = e.selected + 1;
    this.props.getUsers(currentPage, this.props.pageSize);
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
          <User
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
    users: getAllUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
  })
)(UsersContainer);
