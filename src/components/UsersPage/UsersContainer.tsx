import { connect } from "react-redux";
import React from "react";
import ReactPaginate from "react-paginate";
import "./Users.css";
import {
  follow,
  unfollow,
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
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  totalUsersCount: number
  isFetching: boolean
  users: Array<UsersType>
}
type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void
  unfollow: (UserId: number) => void
  follow: (UserId: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  handlePageClick = (e: any) => {
    const currentPage = e.selected + 1;
    this.props.getUsers(currentPage, this.props.pageSize)
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getAllUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    
    };
};

export default compose(
  // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
  connect(
    mapStateToProps, {
    follow,
    unfollow,
    getUsers,
  })
)(UsersContainer);
