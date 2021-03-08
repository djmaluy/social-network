import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FilterType, getUsers, unfollow, follow} from "../../redux/usersReducer";
import UsersSearchForm from "./UsersSearchForm";
import { useSelector, useDispatch } from 'react-redux';
import {
  getUsersFilter,
  getAllUsers,
  getCurrentPage,
  getTotalUsersCount,
  getPageSize,
  getFollowingStart,
 } from "../../redux/users-selectors";
 import ReactPaginate from "react-paginate";
import { User } from "./User";

type UserProps = {};
  
export const Users: React.FC <UserProps> = (props) => {

  const totalUsersCount = useSelector(getTotalUsersCount)
  const users = useSelector(getAllUsers)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const filter = useSelector(getUsersFilter)
  const followingStart = useSelector(getFollowingStart)
  
  const dispatch = useDispatch()
  const history = useHistory()

  const unfollowUser = (UserId: number) => {
    dispatch(unfollow(UserId))
  }
  const followUser= (UserId: number) => {
    dispatch(follow(UserId))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter))
  }
  const handlePageClick = (e: any) => {
    const actualPage = e.selected + 1;
    dispatch(getUsers(actualPage, pageSize, filter)) 
  };

  useEffect(() => {
    history.push({
      pathname: '/users',
      search:`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    })
  }, [filter,currentPage]);

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, filter))
  }, []);

  return (
    <div>
       <ReactPaginate
        breakLabel={"..."}
        pageCount={totalUsersCount}
        marginPagesDisplayed={4}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      {users.map((u) => (
        <User 
        user = {u} 
        key={u.id} 
        followingStart = {followingStart} 
        unfollowUser = {unfollowUser} 
        followUser = {followUser} />
      ))}
    </div>
  );
};
