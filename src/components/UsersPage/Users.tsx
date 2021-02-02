import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import userPhoto from "../../assets/images/userPhoto.png";
import { FilterType, getUsers} from "../../redux/usersReducer";
import UsersSearchForm from "./UsersSearchForm";
import { useSelector, useDispatch } from 'react-redux';
import {
  getUsersFilter,
  getAllUsers,
  getCurrentPage,
  getTotalUsersCount,
  getPageSize,
 } from "../../redux/users-selectors";
 import ReactPaginate from "react-paginate";

type UserProps = {};
  
export const Users: React.FC <UserProps> = (props) => {

  const totalUsersCount = useSelector(getTotalUsersCount)
  const users = useSelector(getAllUsers)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const filter = useSelector(getUsersFilter)
  
  const dispatch = useDispatch()
  const history = useHistory()

  const unfollow = (UserId: number) => {
    dispatch(unfollow(UserId))
  }
  const follow = (UserId: number) => {
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
            <button onClick={() => { unfollow(u.id)}} >
                unFollow
              </button>
            ) : (
              <button
                onClick={() => { follow(u.id) }} >
                Follow
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
