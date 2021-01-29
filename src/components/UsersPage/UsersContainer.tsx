import { connect } from "react-redux";
import React from "react";
import ReactPaginate from "react-paginate";
import "./Users.css";
import {
  follow,
  unfollow,
  getUsers,
  FilterType,
} from "../../redux/usersReducer";
import Preloader from "../../common/Preloader/Preloader";
import { User } from "./User";
import { compose } from "redux";
import {
  getUsersFilter,
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
  filter: FilterType
}
type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
  unfollow: (UserId: number) => void
  follow: (UserId: number) => void

}
type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const {currentPage, pageSize, filter } = this.props
    this.props.getUsers(currentPage, pageSize, filter)
  };

  handlePageClick = (e: any) => {
    const {pageSize, filter} = this.props
    const currentPage = e.selected + 1;
    this.props.getUsers(currentPage, pageSize, filter)
  };

  onFilterChanged = (filter: FilterType) => {
    const {pageSize} = this.props
    this.props.getUsers(1, pageSize, filter)
  }
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
            onFilterChanged={this.onFilterChanged}
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
    filter: getUsersFilter(state)
     
    };
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps, {
    follow,
    unfollow,
    getUsers,
  })
)(UsersContainer);
